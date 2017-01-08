---

layout: post
title:  "Nginx日志归档logrotate配置失效不执行的问题排查记录"
date:   2017-01-07 15:08:00
tags: []

---

某天晚上刚躺好准备去和周公欢谈，报警短信伴随着”悦耳“的铃声来到了。打开手机一看，竟然是某台Web服务器的磁盘使用率超过90%了，只好爬起来打开电脑、上线VPN、登录机器，开始处理问题。

首先看看是哪个分区有问题：
```
[tabalt@localhost ~]$ df -lh
Filesystem            Size  Used Avail Use% Mounted on
/dev/mapper/VolGroup00-LogVol03
                       20G  3.7G   16G  20% /
tmpfs                  32G     0   32G   0% /dev/shm
/dev/sda1              97M   54M   39M  59% /boot
/dev/mapper/VolGroup00-LogVol01
                     1008M   34M  924M   4% /tmp
/dev/mapper/VolGroup00-LogVol02
                      4.0G  371M  3.4G  10% /var
/dev/mapper/VolGroup00-data
                      493G  449G   44G  91% /data
```

很明显是数据卷（/data目录）快被塞满了，于是进去看看是各个目录的大小：

```
[tabalt@localhost ~]$ cd /data/; sudo du -sh *
16K     lost+found
392G    nginx
4.2M    php
...

[tabalt@localhost ~]$ sudo du -sh nginx/logs/
392G     nginx/logs/
```

主要大小都集中在nginx目录下的logs目录，这个目录主要存放Nginx的访问日志和错误日志，来看看目录下文件的大小：

```
[tabalt@localhost ~]$ cd nginx/logs/; ls -lh
-rw-r--r-- 1 nobody root 196G Jan  8 03:44 allweb.log
-rw-r--r-- 1 nobody root    0 Jan  7 23:55 www_domain_com_error.log
-rw-r--r-- 1 nobody root  49G Jan  8 03:44 www_domain_com.log
...
```

访问日志文件都比较大，使用`head allweb.log`看了下是好几天前的日志内容，我们对Nginx的日志是配置了logrotate每天做日志归档的，难道是配置有问题了？ logrotate之前是由ops同学安装配置的，先来找一下配置文件在哪：

```
[tabalt@localhost ~] locate logrotate.conf
/etc/logrotate.conf
/usr/local/nginx/conf/logrotate.conf
/usr/local/php/etc/logrotate.conf
/usr/share/man/man5/logrotate.conf.5.gz
```

可能相关的配置文件是前两个，先看一下主配置文件：

```
[tabalt@localhost ~] cat /etc/logrotate.conf
# see "man logrotate" for details
# rotate log files weekly
weekly

# keep 4 weeks worth of backlogs
rotate 4

# create new (empty) log files after rotating old ones
create

# use date as a suffix of the rotated file
dateext

# uncomment this if you want your log files compressed
#compress

# RPM packages drop log rotation information into this directory
include /etc/logrotate.d

# no packages own wtmp and btmp -- we'll rotate them here
/var/log/wtmp {
    monthly
    create 0664 root utmp
        minsize 1M
    rotate 1
}

/var/log/btmp {
    missingok
    monthly
    create 0600 root utmp
    rotate 1
}

# system-specific logs may be also be configured here.

[tabalt@localhost ~] ll /etc/logrotate.d/
total 24
-rw-r--r--. 1 root root 103 Dec  8  2011 dracut
-rw-r--r--. 1 root root 135 Nov 11  2010 iptraf
-rw-r--r--. 1 root root 329 Aug 24  2010 psacct
-rw-r--r--. 1 root root  68 Aug 23  2010 sa-update
-rw-r--r--. 1 root root 210 Aug  3  2011 syslog
-rw-r--r--. 1 root root 100 Dec  9  2011 yum
```

主配置里没有Nginx日志目录相关的配置，再来看Nginx配置目录下的logrotate配置文件：

```
[tabalt@localhost ~] cat /usr/local/nginx/conf/logrotate.conf   
/data/nginx/logs/* {
    dateext
    dateformat -%Y%m%d-%s
    rotate 120
    maxage 7
    olddir archive
    missingok
    nocreate
    sharedscripts
    postrotate
        test ! -f /var/run/nginx.pid || kill -USR1 `cat /var/run/nginx.pid`
    endscript
}

include /usr/local/nginx/conf/logrotate.d
```

这里面配置了归档/data/nginx/logs/，就是我们要找的。从配置内容看应该都是正常的，难道是logrotate程序没有正常运行？来看下logrotate归档的记录：

```
[tabalt@localhost ~] cat /var/lib/logrotate.status | grep '/data/nginx/logs/allweb.log'
"/data/nginx/logs/allweb.log" 2016-12-29
```

从输出看果然是只有几天前的做过归档，为啥后面几天归档没有执行呢？logrotate是由crontab定时执行的，经过摸索找到了2个crontab的配置：

```
[tabalt@localhost ~] sudo cat /etc/cron.daily/logrotate
#!/bin/sh

/usr/sbin/logrotate /etc/logrotate.conf
EXITVALUE=$?
if [ $EXITVALUE != 0 ]; then
    /usr/bin/logger -t logrotate "ALERT exited abnormally with [$EXITVALUE]"
fi
exit 0

[tabalt@localhost ~] cat /etc/cron.d/nginx 
55 23 * * * root sleep `perl -e "print int(rand(120))"` && /usr/sbin/logrotate -v -f /usr/local/nginx/conf/logrotate.conf
```

看来可以忽略主配置而只关注Nginx相关的配置了。来手动执行一下看看（多了个-d参数代表只执行预演调试而不实际执行归档操作）：

```
[tabalt@localhost ~] sudo /usr/sbin/logrotate -v -f -d /usr/local/nginx/conf/logrotate.conf
reading config file /usr/local/nginx/conf/logrotate.conf
reading config info for /data/nginx/logs/* 
olddir is now archive
including /usr/local/nginx/conf/logrotate.d
reading config file www_domain_com.conf
reading config info for /data/app/src/www_domain_com/logs/* 
olddir is now archive
error: www_domain_com.conf:12 error verifying olddir path /data/app/src/www_domain_com/logs/archive: No such file or directory
error: found error in file www_domain_com.conf, skipping
removing last 1 log configs
removing last 2 log configs
```

竟然报错了！！！ 从输出信息看是因为某种原因导致一个配置目录里的归档目录archive不存在了。于是赶紧创建了这个目录，再测试发现报错消失了，问题解决！

总结一下，因为对ops同学配置的logrotate不熟，所以在排查过程中耗费的时间比较多，好在磁盘空间报警并不是很严重的问题，手动删除某个较大的文件就有充足的时间来找问题了。对于日志目录下archive目录无故消失的问题比较奇怪，猜测是有同学误操作了。线上部署所需要的目录或文件也可以做一些监控，更主动的发现一些问题。

