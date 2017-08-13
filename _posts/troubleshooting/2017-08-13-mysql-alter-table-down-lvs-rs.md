---

layout: post
title:  "一次Mysql改表引发LVS下RS机器全下线的问题"
date:   2017-08-13 15:08:00
excerpt: 某天下午正在和code苦战的我突然收到报警短信，们有个业务电信机房LVS下的RS机器全部下线了...
tags: []

---

某天下午，正在和code苦战的我突然收到报警短信，告警我们有个业务电信机房LVS下的RS机器全部下线了。第一时间去看机器负载情况，发现CPU IDLE在80%左右，其他各项指标也都正常；怀疑是LVS的KeepAlive程序出问题了，上管理平台点了一遍RS上线，发现服务恢复了，于是未做进一步排查，只向OPS同学反馈了一下。

然而，刚过了半个小时，同样的报警又来了，看来还得找到根本原因。挑了一台机器保留现场，并在管理平台将其他机器操作上线，以保证充分的排查时间。

先检查Nginx allweb.log中lvscheck相关的日志，发现状态码全部为499且request_time达到5s：

```
[tabalt@server01 ~]$ tail -100 /data/nginx/logs/allweb.log | grep lvscheck
10.18.42.2 92 0 5.000[s] - - [12/Jul/2017:18:29:18 +0800] "GET /status.php HTTP/1.0" 499 - "-" "KeepAliveClient" lvscheck.domain.com 10.20.12.60 - -
10.18.42.2 92 0 5.000[s] - - [12/Jul/2017:18:29:22 +0800] "GET /status.php HTTP/1.0" 499 - "-" "KeepAliveClient" lvscheck.domain.com 10.20.12.60 - -
10.18.42.2 92 0 5.000[s] - - [12/Jul/2017:18:29:24 +0800] "GET /status.php HTTP/1.0" 499 - "-" "KeepAliveClient" lvscheck.domain.com 10.20.12.60 - -
...
```

原来KeepAlive程序请求`http://lvscheck.domain.com/status.php`页面探测服务情况时，竟然过了5s都没有收到响应，于是主动断开请求并将RS下线了。但机器很闲，为什么`/status.php`会处理超过5s呢？

检查PHP-FPM的日志，发现有报错`/data/www/front/index.php`文件执行很慢：
```
[tabalt@server01 ~]$ tail /data/php/log/php-fpm.log
12-Jul-2017 18:29:18] WARNING: [pool www] child 3988, script '/data/www/front/index.php' (request: "GET /index.php") executing too slow (11.301960 sec), logging
[12-Jul-2017 18:29:22] WARNING: [pool www] child 3945, script '/data/www/front/index.php' (request: "GET /index.php") executing too slow (11.863325 sec), logging
[12-Jul-2017 18:29:24] WARNING: [pool www] child 3887, script '/data/www/front/index.php' (request: "GET /index.php") executing too slow (10.498795 sec), logging
...
```

但`/data/www/front/index.php`只是入口文件，从这个日志看不出来问题在哪里，再检查下PHP-FPM的慢日志：

```
[tabalt@server01 ~]$ tail -100 /data/php/log/www.log.slow
...
script_filename = /data/www/front/index.php
[0x00007fecbd613f90] execute() /data/www/vendor/andals/vine/src/Component/Mysql/Driver.php:218
[0x00007fecbd613ec0] doExecute() /data/www/vendor/andals/vine/src/Component/Mysql/Driver.php:66
[0x00007fecbd613df0] query() /data/www/vendor/andals/vine/src/Component/Mysql/Dao/Base.php:206
[0x00007fecbd613d80] simpleQuery() /data/www/src/app/Model/Dao/Base.php:65
[0x00007fecbd613cc0] selectByParamsForFront() /data/www/src/app/Model/Svc/SqlBase.php:211
[0x00007fecbd613c10] selectByParamsForFront() /data/www/src/app/Model/Svc/Category.php:214
...
[0x00007fecbd613580] getEsData() /data/www/src/app/Controller/Front/ListController.php:26
[0x00007fecbd613400] indexAction() /data/www/vendor/andals/vine/src/Framework/App/Web.php:107
[0x00007fecbd613380] call_user_func_array() /data/www/vendor/andals/vine/src/Framework/App/Web.php:107
[0x00007fecbd613290] runController() /data/www/vendor/andals/vine/src/Framework/App/Web.php:73
[0x00007fecbd6131b0] handleRequest() /data/www/vendor/andals/vine/src/Framework/App/Web.php:48
[0x00007fecbd6130f0] run() /data/www/src/run/front/index.php:6
```

可以看到最终是执行SQL的时候很慢，上管理平台查看发现在报警的两个时间点，MySQL从库的QPS突然降到0而主库QPS突然大幅升高，于是连忙反馈给DBA同学。

DBA同学排查后发现，当前读写量比较大，且有个新增字段的改标语句正在运行，停止后问题恢复；而主从库QPS的突变是因为从库响应慢被Proxy操作下线了。


我们梳理后发现，当前有个Task程序在批量往数据库里导数据，表里的数据较多（千万级），这种情况下改表执行得很慢，数据库响应也变慢；同时页面上有个查询没有加缓存，SQL语句执行超时设置得也有问题，最终导致PHP-FPM进程都被卡住了，没有空闲进程来处理LVS健康检查的页面，出现了LVS下RS机器全下线的问题。

事后，我们对发现的问题做了修复，并在确保没有大量访问的情况下提交了改表操作，改表顺利执行完成。



