
---

layout: post
title:  "让GitHub Pages博客支持百度搜索引擎收录"
date:   2014-05-25 00:30:56
tags: [github]

---

GitHub Pages搭建的网站，在百度搜索引擎访问的时候，经常性的会返回 `403 forbidden`，从而百度会认为网站访问不稳定，对网站降权，甚至K站。


### 安装Jekyll


* 编译安装Node.js

Jekyll是基于Ruby开发的，用到了Ruby的execjs方法来执行JavaScript代码，而这需要自己指定一个JavaScript runtime；这里我们选择安装Node.js。

```
sudo yum install libtool automake autoconf gcc-c++ openssl-devel wget

mkdir ~/soft/
cd ~/soft/

wget http://nodejs.org/dist/v0.12.4/node-v0.12.4.tar.gz
tar -zxvf node-v0.12.4.tar.gz
cd node-v0.12.4

./configure --prefix=/usr 
make && sudo make install

node -v
npm -v
```

* 安装Ruby、RubyGems

```
sudo yum install ruby ruby-devel gem
```

* 使用RubyGems安装Jekyll

```
gem install jekyll
```

### 搭建博客站点

* 克隆博客代码

```
sudo yum install git
sudo mkdir -p ~/mydomain.com/

git clone https://github.com/username/username.github.io.git ./
```

* 定时更新博客代码

配置crontab 2分钟pull一下代码：

```
crontab -e 

# 添加下面的代码：
*/2 * * * * cd ~/mydomain.com/; git pull >> /tmp/github_blog_pull_record.log 2>&1;
```

* 启动博客站点

Jekyll 2.4 版本之后，会关注文件的变动，自动重新生成静态文件。使用`--detach`参数指定在后台执行，`--port`指定端口，`--host`指定当前机器的外网ip。

```
cd ~/mydomain.com/
jekyll serve --port 80 --host 192.168.1.101 --detach
```

绑host 测试，能正常访问则搭建完成。更多Jekyll的用法可以参考文档： http://jekyllrb.com/docs/usage/。


* 使用web服务器Nginx

使用前述方式启动的http服务，会独占这台服务器的 `80` 端口，如果这台机器还需部署其他的web站点，则不得不使用其他非80的端口。

使用Nginx可以解决这个问题，配置一个Nginx的vhost，可以使用`jekyll build --watch &`生成博客的静态内容，并将站点根目录设置为 `~/mydomain.com/_site/`，这里不做具体介绍了。


### 配置智能dns






