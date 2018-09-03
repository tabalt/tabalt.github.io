---

layout: post
title:  "Docker 快速上手学习入门教程"
date:   2018-09-03 12:30:00
excerpt: Docker是使用Golang开发的开源应用容器引擎，可打包应用和依赖到镜像，分发到其他Linux机器上并启动容器。
tags: [Docker]

keywords: Docker,Docker入门,Docker教程
description: Docker 快速上手学习入门教程

---

Docker是一个使用Golang开发的开源应用容器引擎，让开发者可以打包应用和依赖到一个轻量级、可移植的镜像中，然后分发到任何流行的Linux机器上，并在这些机器上启动容器，容器之间隔离独立，资源消耗低。

### Docker的常见概念

* 镜像 Image

    镜像是一个分层的文件系统，集成了容器运行时所需的操作系统、应用程序、运行时环境等；镜像是只读的，构建之后内容不会被改变，可被复制和分发。

* 容器 Container

    容器是由镜像启动的运行时实例，可被启动、停止、删除，容器之间相互隔离，容器对资源的使用可以做限制。容器从镜像启动时，Docker会在镜像的上层创建一个可写层。

* 镜像仓库 Image Repository

    镜像仓库类似于代码仓库，用来集中存放镜像文件。镜像编译好后推送（push）到仓库中，在运行容器的机器上拉取（pull）下来即完成了镜像的复制和分发。

* Dockerfile

    Dockerfile是由一系列命令和参数构成的脚本，这些命令基于基础镜像，将业务需要的应用程序和依赖环境打包起来，并最终创建一个新的镜像。

* 客户端Client和守护进程Daemon
    
    Docker是C/S（客户端Client-服务器Server）架构模式，客户端是名为`docker`的命令行工具，服务器是名为`dockerd`的守护进程，用户通过客户端向服务器提供的接口发送请求和指令，守护进程执行一系列操作后返回给客户端结果。

### Docker各组件结构

![Docker各组件结构](images/docker/architecture.jpg)

### 下载&安装&启动 Docker

Docker的官方文档（https://docs.docker.com/install/ ）上提供了非常详细的安装流程，简单摘录在CentOS 7.x 上下载Docker社区版并安装的操作命令：

```
mkdir ~/soft && cd ~/soft
wget https://download.docker.com/linux/centos/7/x86_64/stable/Packages/docker-ce-18.06.1.ce-3.el7.x86_64.rpm

sudo yum install docker-ce-18.06.1.ce-3.el7.x86_64.rpm
sudo systemctl start docker
sudo docker run hello-world
```

当控制台输出`Hello from Docker!`加一大段介绍文字时，安装就大功告成了。


### 运行Docker的Hello World容器的一些细节

刚刚我们成功运行了Docker提供的`Hello World`版容器，大致的执行过程如下：

* 命令行执行的Docker客户端程序，解析出命令`run`和参数`hello-world`，并请求Docker Daemon守护进程提供的相关接口
* Docker Daemon得到要将名为`hello-world`的镜像启动为容器的请求后，尝试在本地查找名为`hello-world`的镜像
* 因为我们是刚安装的Docker，本地并没有这个镜像，Docker Daemon会尝试从官方镜像仓库拉取名为`hello-world`的镜像
* 名为`hello-world`的镜像拉取到本地后，Docker Daemon再真正执行启动容器的操作
* 容器启动起来后，执行构建镜像时指定的`/hello`程序，输出`Hello from Docker!`等介绍文字
* 介绍文字输出完毕后，`/hello`程序就退出了，Docker容器也跟着退出

上述流程中，我们的Docker Daemon程序自动拉取了`hello-world`镜像，也可以通过命令先行拉取下来：

```
sudo docker pull hello-world
```

通过下面的命令可以查看本地的镜像列表：

```
[tabalt@dev ~]$ sudo docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
hello-world         latest              2cb0d9787c4d        6 weeks ago         1.85kB
```

容器运行完退出后，其实还有残留，可通过如下命令看到：

```
[tanyanping@p10992v ~]$ sudo docker ps -a
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                         PORTS               NAMES
bb61ae864566        hello-world         "/hello"            About an hour ago   Exited (0) About an hour ago                       modest_cray
```

### Dockerfile 指令介绍

Dockerfile由一行行的命令语句组成，支持以 # 开头的注释，主要有四个部分：基础镜像信息、维护者信息、镜像操作指令、容器启动指令。 主要指令列举如下（加`*`表示常用）：

| 指令 | 作用 | 格式 | 说明 |
|:------|:------|:------|:------|
| FROM* | 指定基础镜像 | `FROM <image>`<br />`FROM <image>:<tag>` | 首条指令必须为`FROM`<br />可使用多个`FROM` 创建多个镜像 |
| MAINTAINER | 指定维护者 | `MAINTAINER <name>` |  |
| ENV* | 指定环境变量 | `ENV <key> <value>` | 后续RUN指令和容器中可用 |
| USER | 指定运行容器的用户 | `USER daemon` | 用户名或UID，对后续的RUN指令生效 |
| WORKDIR | 指定工作目录 | `WORKDIR /path/to/workdir` | 对后续RUN、CMD、ENTRYPOINT指令生效 |
| VOLUME | 创建挂载点 | `VOLUME ["/data"]` |  |
| ONBUILD | 作为基础镜像时的指令 | `ONBUILD [INSTRUCTION]` |  |
| RUN* | 执行命令 | `RUN <command>`<br />`RUN ["executable", "param1", "param2"]` | 前者为`/bin/sh -c`执行<br />后者使用 exec 执行<br />命令较长时可用`\`换行 |
| ADD* | 复制文件到容器 | `ADD <src> <dest>` | 路径或URL，tar文件自动解压 |
| COPY* | 复制文件到容器 | `COPY <src> <dest>` | 源目录为本地目录时，推荐使用 |
| ENTRYPOINT* | 容器启动后执行的命令 | `ENTRYPOINT ["executable", "param1", "param2"]`<br />`ENTRYPOINT command param1 param2` | 不可被docker run的参数覆盖<br />多条命令只有最后一条生效 |
| CMD* | 容器启动执行的命令 | `CMD ["executable","param1","param2"]`<br />`CMD command param1 param2`<br />`CMD ["param1","param2"]` | 第一种使用exec执行，推荐使用<br />第二种在/bin/sh中执行，支持交互<br />第三种是ENTRYPOINT的默认参数<br />多条CMD命令只有最后一条生效 |
| EXPOSE* | 指定暴露的端口号 | `EXPOSE <port> [<port>...]` |  |


可以通过几个知名项目中的Dockerfile文件来学习一下各个指令的应用：

* Ethereum Golang项目：https://github.com/ethereum/go-ethereum/blob/master/Dockerfile
* Nginx Dockerfiles：https://github.com/nginxinc/docker-nginx/
* CentOS Dockerfiles：https://github.com/CentOS/CentOS-Dockerfiles


### Dockerfile编译成镜像并运行

编写一个能编译运行并输出`Hello Docker!`的Dockerfile：

```
[tabalt@dev ~]$ cd ~/docker/hello-docker/
[tabalt@dev ~/docker/hello-docker]$ cat Dockerfile
FROM alpine:latest

CMD echo "Hello World!"
```

将Dockerfile编译成名为`hello-docker`的镜像：

```
[tabalt@dev ~/docker/hello-docker]$ sudo docker build -t hello-docker:latest ./
Sending build context to Docker daemon  2.048kB
Step 1/2 : FROM alpine:latest
latest: Pulling from library/alpine
8e3ba11ec2a2: Already exists 
Digest: sha256:7043076348bf5040220df6ad703798fd8593a0918d06d3ce30c6c93be117e430
Status: Downloaded newer image for alpine:latest
 ---> 11cd0b38bc3c
Step 2/2 : CMD echo "Hello World!"
 ---> Running in 28dc89adf3d5
Removing intermediate container 28dc89adf3d5
 ---> 5614b1e6b7eb
Successfully built 5614b1e6b7eb
Successfully tagged hello-docker:latest

[tabalt@dev ~/docker/hello-docker]$ sudo docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
hello-docker        latest              5614b1e6b7eb        22 seconds ago      4.41MB
alpine              latest              11cd0b38bc3c        7 weeks ago         4.41MB
```

运行名为`hello-docker`的镜像：

```
[tabalt@dev ~/docker/hello-docker]$ sudo docker run -i -t --rm --net=host hello-docker:latest
Hello World!
```


### Docker客户端常用命令

前面已经见识过Docker的一些客户端命令及用法，接下来再看看一些常用命令的详细介绍：

* docker version 

    客户端和服务端 版本信息

* docker info

    镜像数、容器数、配置等系统信息

* docker search

    从Docker Hub中搜索符合条件的镜像

    ```
    docker search [OPTIONS] TERM

    Options:
        -f, --filter filter   根据提供的条件过滤输出
        --format string   用Go模板语法格式化打印的搜索结果
        --limit int       搜索结果最大条数(默认 25)
        --no-trunc        显示完整输出

    ```

* docker pull

    从Docker Hub中拉取或者更新指定镜像

    ```
    docker pull [OPTIONS] NAME[:TAG|@DIGEST]

    Options:
    -a, --all-tags                下载仓库中所有打TAG的镜像
      --disable-content-trust   跳过镜像验证（默认开启）
      --platform string         如服务器具有多平台功能，可设置平台

    ```

* docker login

    登录Docker Hub，需要输入用户名、密码、邮箱

* docker logout

    退出登录

* docker images

    列出镜像

    ```
    docker images [OPTIONS] [REPOSITORY[:TAG]]

    Options:
        -a, --all             显示所有镜像（默认隐藏中间镜像）
            --digests         显示摘要
        -f, --filter filter   根据提供的条件过滤输出
            --format string   用Go模板语法格式化打印的搜索结果
            --no-trunc        显示完整输出
        -q, --quiet           只显示数字ID

    ```

*  docker ps

    列出容器

    ```
    docker ps [OPTIONS]

    Options:
        -a, --all             显示所有容器（默认只显示运行中的）
        -f, --filter filter   根据提供的条件过滤输出
            --format string   用Go模板语法格式化打印的搜索结果
        -n, --last int        显示最新创建的n个容器（包含所有状态）（默认为-1）
        -l, --latest          显示最新创建的容器（包含所有状态）
            --no-trunc        显示完整输出
        -q, --quiet           只显示数字ID
        -s, --size            显示文件总大小

    ```

*  docker rmi

    删除镜像

    ```
    docker rmi [OPTIONS] IMAGE [IMAGE...]

    Options:
        -f, --force      强制删除镜像
        --no-prune   不要删除未打Tag的父镜像

    ```

* docker rm
    
    删除容器

    ```
    docker rm [OPTIONS] CONTAINER [CONTAINER...]

    Options:
        -f, --force     强制删除运行中的容器（使用SIGKILL）
        -l, --link      删除指定的链接
        -v, --volumes   删除与容器关联的卷

    ```

* docker history

    查看镜像创建历史

    ```
    docker history [OPTIONS] IMAGE

    Options:
            --format string   用Go模板语法格式化打印的搜索结果
        -H, --human           以人类可读格式打印尺寸和日期（默认为true）
            --no-trunc        显示完整输出
        -q, --quiet           只显示数字ID

    ```

* docker start|stop|restart

    启动、停止和重启一个或多个指定容器


* docker kill

    杀死一个或多个指定容器

* docker events

    从服务器拉取动态

* docker save

    将指定镜像保存成 tar 归档文件

* docker load

    从 tar 镜像归档中载入镜像

* docker export

    将指定的容器保存成 tar 归档文件

* docker import

    从归档文件（支持远程文件）创建一个镜像

* docker top

    查看一个正在运行容器的进程，支持 ps 命令参数。

* docker inspect
    
    检查镜像或者容器的参数，默认返回 JSON 格式。

* docker pause

    暂停某一容器的所有进程。

* docker unpause

    恢复某一容器的所有进程。

* docker tag

    标记本地镜像，将其归入某一仓库

    ```
    docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]
    ```

* docker push

    将镜像推送至远程仓库，默认为 Docker Hub

* docker logs

    获取容器运行时的输出日志

* docker run

    启动一个容器，在其中运行指定命令。

    ```
    docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
    
    Options:
    -a      stdin 指定标准输入输出内容类型，可选 STDIN、STDOUT、STDERR 三项
    -d      后台运行容器，并返回容器ID；
    -i      以交互模式运行容器，通常与 -t 同时使用；
    -t      为容器重新分配一个伪输入终端，通常与 -i 同时使用；
    --name="nginx-lb"           为容器指定一个名称；
    --dns 8.8.8.8               指定容器使用的DNS服务器，默认和宿主一致；
    --dns-search example.com    指定容器DNS搜索域名，默认和宿主一致；
    -h "mars"                   指定容器的hostname；
    -e username="ritchie"       设置环境变量；
    --env-file=[]               从指定文件读入环境变量；
    --net="bridge"              指定容器的网络连接类型，支持 bridge、host、none
    
    # 更多参数请查看 docker help run

    ```


### 更多资料

* Docker联合文件系统：http://www.dockerinfo.net/1753.html
* Docker文档：https://docs.docker.com/ 
* Kubernetes工作原理：https://www.zhihu.com/question/26921493/answer/471384540
* 从零开始k8s：https://www.kubernetes.org.cn/doc-11
* busybox：https://busybox.net/
* alpine：https://www.alpinelinux.org/
