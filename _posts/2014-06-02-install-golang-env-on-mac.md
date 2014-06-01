---

layout: post
title:  "Mac OS 下golang开发环境安装与配置"
date:   2014-06-02 11:30:00
categories: 博文

---

号称是互联网时代的c语言的go语言自诞生以来，受到了开源界的热烈追捧。golang的官方网站是：

	https://golang.org/

golang在google code 上也有个主页：

	https://code.google.com/p/go/


### 安装golang

在mac下可以直接下载pkg安装文件，也可以通过brew来安装golang。到目前为止，golang最新的稳定版是`1.2.2`，pkg文件的下载地址是：

	https://storage.googleapis.com/golang/go1.2.2.darwin-amd64-osx10.8.pkg
	
下载完成后双击运行即可安装。

通过brew 安装则使用如下命令：

	brew install golang
	
使用brew 安装完成后需要设置一下环境变量`GOROOT`：

	export GOROOT=/usr/local/opt/go/bin/
	
现在在命令行下输入 `go version`，如果看到如下输出则代表golang安装成功：

	go version go1.2.2 darwin/amd64
	
接下来我们还要设置另外两个环境变量`GOPATH`和`GOBIN`，GOPATH 是我们日常开发的根目录，GOBIN是GOPATH下的bin目录。且需要将GOBIN目录加入到PATH目录后面，生成的可执行文件就可以直接执行了。

	export GOPATH=~/study/go
	export GOBIN=$GOPATH/bin
	export PATH=$PATH:$GOBIN
	
至此，我们的go语言已经安装好了。


### 安装gocode

gocode是go语言语法提示的工具，可以集成到sublime、eclipse等编辑器和ide中，为我们的编码提供便利的提示。使用下面的命令即可自动下载安装gocode，当然前提是要安装git。

	go get github.com/nsf/gocode
	
实际上，go get 是go语言中下载、安装网络库的工具，下载的代码存放在`GOPATH`下的src目录下，编译后的可执行文件(如果有的话)放在了`GOPATH`下的bin目录下。

	
### 安装Sublime下的插件GoSublime

`GoSublime`是直接在sublime里运行go程序的插件，对于sublime插件的安装有任何疑问可以参考文章[Mac OS上sublime text 3的安装与配置](http://tabalt.net/blog/install-sublime-text-3-on-mac)。

安装好GoSublime之后，如果你的环境变量`GOPATH`、`GOPATH`等没有设置好，或者要使用一个不一样的配置，可以打开Preferences -> Package Settings -> GoSublime -> Settings - user，按照下面的格式，填写你的配置内容：

	{
    	"env": {
    		"GOROOT" : "/path/to/go/",
     		"GOBIN" : "/path/to/go/bin",
     		"GOPATH" : "/path/to/gopath",
    	}
	}


### 编写go语言版本的hello world


在`GOPATH`目录下的src目录下，建立一个hello文件夹，然后创建main.go文件，填写如下内容：

	package main

	import (
    "fmt"
	)

	func main() {
    	fmt.Println("Hello World!");
	}

在sublime中，按command + b 打开shell命令行，输入如下命令执行：

	go run main.go

正常情况下会输出：

	[ `go run main.go` | done: 180.922888ms ]
  	Hello World!


到目前为止，我们已经安装好了开发golang程序的基本环境，可以开心的享受golang这顿大餐了！







