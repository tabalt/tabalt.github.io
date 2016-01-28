---

layout: post
title:  "Golang开发支持平滑升级（优雅重启）的HTTP服务"
date:   2016-01-28 11:30:00
tags: [golang]

---

前段时间用Golang在做一个HTTP的接口，因编译型语言的特性，修改了代码需要重新编译可执行文件，关闭正在运行的老程序，并启动新程序。对于访问量较大的面向用户的产品，关闭、重启的过程中势必会出现无法访问的情况，从而影响用户体验。



使用Golang的系统包开发HTTP服务，是无法支持平滑升级（优雅重启）的，本文将探讨如何解决该问题。


### 一、平滑升级（优雅重启）的一般思路


一般情况下，要实现平滑升级，需要以下几个步骤：


1. 用新的可执行文件替换老的可执行文件（如只需优雅重启，可以跳过这一步）

1. 通过pid给正在运行的老进程发送 特定的信号（kill -SIGUSR2 $pid）

1. 正在运行的老进程，接收到指定的信号后，以子进程的方式启动新的可执行文件并开始处理新请求

1. 老进程不再接受新的请求，等待未完成的服务处理完毕，然后正常结束

1. 新进程在父进程退出后，会被init进程领养，并继续提供服务


### 二、Golang Socket 网络编程

Socket是程序员层面上对传输层协议TCP/IP的封装和应用。Golang中Socket相关的函数与结构体定义在net包中，我们从一个简单的例子来学习一下Golang Socket 网络编程，关键说明直接写在注释中。

#### 1、服务端程序 server.go

```
package main

import (
	"fmt"
	"log"
	"net"
	"time"
)

func main() {
	// 监听8086端口
	listener, err := net.Listen("tcp", ":8086")
	if err != nil {
		log.Fatal(err)
	}
	defer listener.Close()

	for {
		// 循环接收客户端的连接，没有连接时会阻塞，出错则跳出循环
		conn, err := listener.Accept()
		if err != nil {
			fmt.Println(err)
			break
		}

		fmt.Println("[server] accept new connection.")

		// 启动一个goroutine 处理连接
		go handler(conn)
	}
}

func handler(conn net.Conn) {
	defer conn.Close()

	for {
		// 循环从连接中 读取请求内容，没有请求时会阻塞，出错则跳出循环
		request := make([]byte, 128)
		readLength, err := conn.Read(request)

		if err != nil {
			fmt.Println(err)
			break
		}

		if readLength == 0 {
			fmt.Println(err)
			break
		}

		// 控制台输出读取到的请求内容，并在请求内容前加上hello和时间后向客户端输出
		fmt.Println("[server] request from ", string(request))
		conn.Write([]byte("hello " + string(request) + ", time: " + time.Now().Format("2006-01-02 15:04:05")))
	}
}
```

#### 2、客户端程序 client.go

```
package main

import (
	"fmt"
	"log"
	"net"
	"os"
	"time"
)

func main() {

	// 从命令行中读取第二个参数作为名字，如果不存在第二个参数则报错退出
	if len(os.Args) != 2 {
		fmt.Fprintf(os.Stderr, "Usage: %s name ", os.Args[0])
		os.Exit(1)
	}
	name := os.Args[1]

	// 连接到服务端的8086端口
	conn, err := net.Dial("tcp", "127.0.0.1:8086")
	checkError(err)

	for {
		// 循环往连接中 写入名字
		_, err = conn.Write([]byte(name))
		checkError(err)

		// 循环从连接中 读取响应内容，没有响应时会阻塞
		response := make([]byte, 256)
		readLength, err := conn.Read(response)
		checkError(err)

		// 将读取响应内容输出到控制台，并sleep一秒
		if readLength > 0 {
			fmt.Println("[client] server response:", string(response))
			time.Sleep(1 * time.Second)
		}
	}
}

func checkError(err error) {
	if err != nil {
		log.Fatal("fatal error: " + err.Error())
	}
}
```

#### 3、运行示例程序

```
# 运行服务端程序
go run server.go

# 在另一个命令行窗口运行服务端程序
go run client.go "tabalt"

```


