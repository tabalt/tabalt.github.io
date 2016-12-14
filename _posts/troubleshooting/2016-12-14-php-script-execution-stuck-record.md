---

layout: post
title:  "一次PHP脚本执行卡住的问题排查记录"
date:   2016-12-14 15:08:00
tags: []

---

最近从监控上发现，我们一个服务的一台机器负载比同机房的其他机器要高，而流入流出流量没有差别，进一步查看发现每个机房都有一台机器存在相同的现象，梳理后发现有问题的这些机器相比正常的机器多跑了一些PHP脚本，于是猜测是执行脚本出问题导致。

登录机器后执行`top`命令，果然发现存在一个CPU占用较高的PHP进程，然后执行下列命令，发现存在一个由crontab启动的执行了很长时间的PHP脚本：
```
ps aux | grep 'php' | grep -v 'php-fpm'
```

由于之前也遇到过PHP脚本执行卡住的类似情况，当时的怀疑是跨机房的Mysql查询在网络抖动时导致Mysql连接卡住了，于是理所当然的将所有卡住的进程都kill掉了，再从负载上看机器马上就恢复正常了，于是心满意足的跑去干别的了。

过了一段时间，刷了下监控，发现问题又出现了，注释掉crontab并kill掉进程后，手动执行问题脚本，竟然能稳定复现问题！看来是把问题想得太简单了，尝试用strace命令看下卡住的进程当前究竟在干什么：

```
[tabalt@localhost ~] sudo strace -p 13793
Process 13793 attached - interrupt to quit
```

什么输出都没有！再用netstat看下这个进程是否打开了什么端口：

```
[tabalt@localhost ~] sudo netstat -tunpa | grep 13793
tcp        0      0 192.168.1.100:38019        192.168.1.101:3306        ESTABLISHED 13793/php
tcp        0      0 192.168.1.100:47107        192.168.1.102:6379        CLOSE_WAIT  13793/php 
```

可以看到进程打开了两个端口，分别与Mysql和Redis建立了连接，并且处于连接建立（ESTABLISHED）和对方主动关闭连接（CLOSE_WAIT）的状态；初看确实像是和数据库的连接卡住了，但是因为吃过亏上过当，咱们使用`tcpdump`抓包看进程和数据库之间的交互：

```
tcpdump -i eth0 host 192.168.1.101 and port 3306 -w ~/mysql.cap
```

抓了好一会，`~/mysql.cap` 文件中却也没有任何输出，难道进程和Mysql之间已经没有任何交互了？那为什么连接建立没有关闭呢？看来只能从头追踪一下脚本的执行情况了：

* 首先为了能来得及strace到进程，在PHP脚本最开始的时候输出进程的pid并sleep 10s，代码如下:

    ```
    echo getmypid();
    sleep(10);
    ```

* 然后启动tcpdump准备抓包本机和Mysql的交互过程。

* 最后执行PHP脚本。

这下strace和tcpdump都有内容了！从strace结果看recvfrom之后不再有poll，但并没有看出来有什么不对：

```
//...
poll([{fd=4, events=POLLIN|POLLERR|POLLHUP}], 1, 1471228928) = 1 ([{fd=4, revents=POLLIN}])
recvfrom(4, "://xxx.com/\0\0\23jiadia"..., 271, MSG_DONTWAIT, NULL, NULL) = 271
poll([{fd=4, events=POLLIN|POLLERR|POLLHUP}], 1, 1471228928) = 1 ([{fd=4, revents=POLLIN}])
recvfrom(4, "_b?ie=UTF8&node=658390051\0\0008www."..., 271, MSG_DONTWAIT, NULL, NULL) = 206
```

再从抓包结果看，执行了两条SQL查询语句之后，进程没有再次发送查询请求的包，从程序记录SQL语句日志中，也发现确实只执行了两条：

```
select * from sites where type = 1 order by weight desc limit 50;
select * from sites where type = 2 order by weight desc limit 50;
```

但从这些现象中，仍然没有能看出任何端倪，只好祭出终极大法：输出调试！大概看了下代码，并在关键地方添加输出语句，于是代码看起来如下：

```
echo("start foreach\n");
foreach($types as $type)
{
    echo("foreach $type\n");
    $result[$type] = $this->getSites($type);
}
echo("end foreach\n"); 
```

执行后输出如下，查询type为2的网址时卡住了：

```
start foreach
foreach 1
foreach 2
```

开始怀疑调用的getSites()方法有问题，代码如下:

```
$sites = array();   // 省略从数据库查询的代码
$siteNum = 8;       // 省略从配置读的代码
$urlKeys = array();
for($i = 0; $i < $siteNum; $i++)
{
    do {
        $site = array_shift($sitesData);
        $urlKey = md5($site['url']);
    } while(array_key_exists($urlKey, $url_keys));

    $urlKeys[$urlKey] = 1;
    $result[] = $site;
}
return $result;
```

原来这里为了实现拿8个不重复的网址写了2个循环，如果结果中不重复的网址只有7个就会有一个空，少于7个就会有死循环！于是查了下type为2的网址个数，果然是只有6个！


总结一下，该问题从发现到解决花了大概1天时间，虽然最后证明是低级的代码BUG导致，但是整个排查过程还是挺有收获的，最开始的想当然证明是非常肤浅的，过程中tcpdump和strace的结果也已经很能说明问题了，对各个工具的应用应该要更加熟练，工具的结果也要深入分析。

