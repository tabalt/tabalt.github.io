---

layout: post
title:  "Nginx Url Rewrite 配置"
date:   2014-06-26 00:30:00
categories: 博文

---


WEB开发中，Url Rewrite 应用非常广泛。通过Rewrite，可以方便的将网站上各种乱七八糟的URL改造成对用户和搜索引擎友好的地址，或者隐藏url中的参数以达到伪静态的目的。

nginx的 rewrite 配置指令写在 `server`配置节下的`location`配置节中。nginx 的 rewrite 是类似下面的语句：

	if (!-e $request_filename) {
    	rewrite ^/(.*)$ /index.php?$1 last;
    }



上面的语句主要有



http://blog.csdn.net/cnbird2008/article/details/4409620