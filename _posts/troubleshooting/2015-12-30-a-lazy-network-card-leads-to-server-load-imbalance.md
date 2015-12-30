---

layout: post
title:  "一块偷懒的网卡导致的服务器负载异常"
date:   2015-12-30 15:08:00
tags: [linux]

---

最近因服务部署https，上线了一批物理机做Proxy，上线后发现我们有个机房的其中一台机器负载比较闲，网卡流入流出也相比其他机器低一截，于是准备看看到底是什么情况。


首先对比着看了下Nginx的`/server-status`页面，问题机器的Nginx的活跃连接数要高出很多。

    curl http://127.0.0.1/server-status

    #问题机器
    Active connections: 4353 
    server accepts handled requests
     33401902 33401902 37655622 
    Reading: 0 Writing: 85 Waiting: 4231 

    #正常机器
    Active connections: 2686 
    server accepts handled requests
     14810542 14810542 8026702 
    Reading: 0 Writing: 69 Waiting: 2567


再看了下Nginx的错误日志，发现有很多用户提前主动关闭页面留下的日志，说明访问到这台机器上的用户，打开页面是非常慢了。如果大量用户的主动关闭，那这台机器上的流量是会低很多。

    tail -f /data/nginx/logs/mydomain_com_error.log

    #问题机器
    upstream prematurely closed connection while reading response header from upstream


对比了一下问题机器和正常机器上的Nginx主Conf和Vhost配置，没有任何不同。用iostat看了下磁盘IO情况，相差不大。

百思不得其解，于是跑去请教高人，高人三下五除二之后，ping了下 Upstream 的IP，发现问题机器ping的时候延时竟然达到了300ms，而正常机器则只有0.2ms左右:

    #问题机器
    64 bytes from 10.10.10.10: icmp_seq=1 ttl=61 time=299 ms
    64 bytes from 10.10.10.10: icmp_seq=2 ttl=61 time=246 ms
    64 bytes from 10.10.10.10: icmp_seq=3 ttl=61 time=349 ms
    64 bytes from 10.10.10.10: icmp_seq=4 ttl=61 time=291 ms


    #正常机器
    64 bytes from 10.10.10.10: icmp_seq=1 ttl=61 time=0.239 ms
    64 bytes from 10.10.10.10: icmp_seq=2 ttl=61 time=0.083 ms
    64 bytes from 10.10.10.10: icmp_seq=4 ttl=61 time=0.112 ms


怀疑是网络问题，于是找Ops帮忙查看。在各路Ops大神的热情帮助下，发现网卡竟然跑满了！但从我们正常机器实际流量看，高峰期单机流入也就140Mbit/s，不至于将我们的千兆网卡跑满。


再追的时候，发现了一个惊天秘密：

    sudo ethtool eth0

    #问题机器
    Settings for eth0:
        Supported ports: [ TP ]
        Supported link modes:   10baseT/Half 10baseT/Full 
                                100baseT/Half 100baseT/Full 
                                1000baseT/Full 
        Supports auto-negotiation: Yes
        Advertised link modes:  10baseT/Half 10baseT/Full 
                                100baseT/Half 100baseT/Full 
                                1000baseT/Full 
        Advertised pause frame use: No
        Advertised auto-negotiation: Yes
        Speed: 100Mb/s
        Duplex: Full
        Port: Twisted Pair
        PHYAD: 1
        Transceiver: internal
        Auto-negotiation: on
        MDI-X: Unknown
        Supports Wake-on: pumbg
        Wake-on: g
        Current message level: 0x00000003 (3)
        Link detected: yes

    #正常机器
    Settings for eth0:
        Supported ports: [ TP ]
        Supported link modes:   10baseT/Half 10baseT/Full 
                                100baseT/Half 100baseT/Full 
                                1000baseT/Full 
        Supports auto-negotiation: Yes
        Advertised link modes:  10baseT/Half 10baseT/Full 
                                100baseT/Half 100baseT/Full 
                                1000baseT/Full 
        Advertised pause frame use: No
        Advertised auto-negotiation: Yes
        Speed: 1000Mb/s
        Duplex: Full
        Port: Twisted Pair
        PHYAD: 1
        Transceiver: internal
        Auto-negotiation: on
        MDI-X: Unknown
        Supports Wake-on: pumbg
        Wake-on: g
        Current message level: 0x00000003 (3)
        Link detected: yes


说好的千兆网卡呢？在问题机器上怎么变成100Mb/s了？ 

NetOps的大神们又一次热情的帮助我们，人肉去到机房，让我们那块偷懒的网卡重新回到了工作岗位。至此，这次问题完美解决。





