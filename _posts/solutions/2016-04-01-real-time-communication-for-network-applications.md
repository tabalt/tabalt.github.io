---

layout: post
title:  "网络应用程序的实时通信技术概念介绍"
date:   2016-04-01 12:30:00
tags: []

keywords: 实时通信概念,WEB实时通信解决方案
description: 介绍网络应用程序的实时通信技术概念，探讨WEB实时通信的解决方案
excerpt: 网络应用程序的实时通信简单理解是指 基于网络的应用程序的客户端和服务端，或者客户端和客户端之间及时、畅快的进行数据交换，本文介绍网络应用程序的实时通信技术概念，探讨WEB实时通信的解决方案

---


### 什么是实时通信？

网络应用程序的实时通信简单理解是指 基于网络的应用程序的客户端和服务端，或者客户端和客户端之间及时、畅快的进行数据交换。


### 实时通信的应用场景

* 聊天服务 IM 

    * 聊天室
    * 群组
    * 私聊
    * 在线客服

* 消息推送 Push

    * Web 动态通知
    * PC或移动客户端
    * 公众号平台


### 实时通信的实现方式


* Socket

    PC或移动客户端以及服务端的应用程序，相互之间可以建立Socket连接（使用TCP或UDP协议），双方可随时向对方发送任意数据，在网络畅通的情况下能保持持久连接。但是在Web应用场景下不能使用。

* 轮询 Polling

    Web客户端定时向服务端发送Ajax请求，服务端收到请求即返回响应并关闭链接。优点是实现起来比较容易，缺点是会产生大量的无用请求，浪费带宽和服务器资源。 

* 长轮询 Long-Polling

    Web客户端向服务器发送Ajax请求，服务端接到请求后hold住连接，直到有新消息或超时才返回响应信息并关闭连接，客户端处理完响应信息后再向服务器发送新的请求。相比单纯的轮询会少很多请求，但服务端需要类似 循环语句 + Sleep 的方式不停的查询是否有新数据，比较消耗服务端资源。

* 长连接

    XmlHttpRequest在非IE的实现支持readyState为3时动态获取数据，所以非IE可以用XmlHttpRequest进行长连接，IE只支持readyState为4以后获取数据，IE下可以使用一个隐藏的iframe，将src属性设置为长连接的页面实现类似需求，服务端也使用类似 循环语句 + Sleep 的方式，不断的输出新数据。

* Flash Socket

    在Web页面中嵌入Flash，和服务端建立Socket连接，通过JavaScript可以操作Flash提供的接口，实现真正意义上的即时通信。缺点是客户端必须安装Flash插件， 并且因为不是使用HTTP协议，可能会被防火墙拦截。 

* Websocket
    
    顾名思义，Websocket是能在Web页面上使用的Socket协议，使用JavaScript向服务端发出建立WebSocket连接的请求，该连接本质上就是一个TCP连接，建立以后可以通过TCP连接直接交换数据。在数据传输稳定性和传输量大小方面，具有很大的性能优势。Websocket是HTML5提供的，缺点也很明显，那就是低版本的浏览器不支持。


### WEB实时通信解决方案

从上面各种实时通信的实现方式就能看出，基于WEB的实时通信是一件麻烦的苦差事。好在有很多优秀的开源方案，可以简化我们的开发工作。

* Pushlet

    Pushlet 是一个开源的Comet框架。Comet 是指基于HTTP长连接、无须在浏览器端安装插件的“服务器推” 技术；因此实际上Pushlet是比较老一代的基于长连接的方案，如想了解更多可以参考Pushlet的官网：[http://www.pushlets.com/](http://www.pushlets.com/) 。

* Socket.IO

    Socket.IO是支持WebSocket协议的跨平台开源实时通信解决方案，Web客户端由JavaScript实现，服务端由Node.js实现，也有第三方在Android、iOS等平台下的客户端实现。 除了支持WebSocket协议，Socket.IO还支持上面介绍过的其他方式，并封装成了通用的接口，在服务端实现了这些方式的相应代码， 在浏览器端能根据这些方式的支持情况自动选择最佳方式。

    Socket.IO 的官网是：[http://socket.io/](http://socket.io/)，GitHub地址是：[https://github.com/socketio/socket.io](https://github.com/socketio/socket.io)。


### 参考资料

* [http://www.cnblogs.com/hoojo/p/longPolling_comet_jquery_iframe_ajax.html](http://www.cnblogs.com/hoojo/p/longPolling_comet_jquery_iframe_ajax.html)
* [http://www.ibm.com/developerworks/cn/web/wa-lo-comet/](http://www.ibm.com/developerworks/cn/web/wa-lo-comet/)
* [https://www.zhihu.com/question/27498235/answer/73682175](https://www.zhihu.com/question/27498235/answer/73682175)
* [http://www.infoq.com/cn/news/2015/01/socket-io-websocket/](http://www.infoq.com/cn/news/2015/01/socket-io-websocket/)

