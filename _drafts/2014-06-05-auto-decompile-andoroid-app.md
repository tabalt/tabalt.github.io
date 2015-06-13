---

layout: post
title:  "android app反编译自动化"
date:   2014-06-01 00:30:56
categories: 博文

---


在博文[反编译android app的环境搭建](http://tabalt.net/blog/decompile-andoroid-app-on-mac) 中，我们已经搭建好了反编译andorid app的环境，但是使用起来还是比较麻烦，需要人工高度参与，没法满足大量反编译的需求和自动化反编译的需求，今天我们基于前面的环境，来实现一个自动化反编译工具。


### 安装环境

前面我们使用`jd-gui`这个工具来将反编译的jar文件导出成源码包，`jd-gui`只提供gui的工具和ide的插件，没有命令行下的工具，这是我们反编译自动化最大的障碍。

	https://github.com/kwart/jd-cmd

### 自动化

	

		~/study/apkkiller/soft/src/jd-cmd
	wget https://github.com/kwart/jd-cmd/archive/master.zip
	ln -s ~/study/apkkiller/soft/src/jd-cmd ~/study/apkkiller/soft/bin/dex2jar
	
	
