---

layout: post
title:  "Mac OS使用brew安装Nginx、MySQL、PHP-FPM的LAMP开发环境"
date:   2014-05-28 16:50:00
categories: 博文
tags: [Mac,Nginx,PHP,Mysql]

---


### 准备工作

新版的 Mac OS 内置了Apache 和 PHP，我的系统版本是OS X 10.9.3，可以通过以下命令查看Apache和PHP的版本号：

	httpd -v
	
		Server version: Apache/2.2.26 (Unix)
		Server built:   Dec 10 2013 22:09:38
	
	php --version
	
		PHP 5.4.24 (cli) (built: Jan 19 2014 21:32:15)
		Copyright (c) 1997-2013 The PHP Group
		Zend Engine v2.4.0, Copyright (c) 1998-2013 Zend Technologies
	
	
因为我们要自己动手来安装 Nginx，因此首先来关闭系统自带的apache：

	sudo apachectl stop  #关闭apache，如果事先没开启过，可以忽略报错信息
	
如果你的apache已经加入了launchctl，使用下面的命令来关闭：

	sudo launchctl unload -w /System/Library/LaunchDaemons/org.apache.httpd.plist

为什么选择关闭apache？因为mac os x系统自带的apache是没有优雅的remove/uninstall 的方式的... 对于“洁癖”比较严重的童鞋，可以选择直接删除相关的文件！（千万不要手抖删错目录...）

	sudo rm /usr/sbin/apachectl
	sudo rm /usr/sbin/httpd
	sudo rm -r /etc/apache2/

删除自带的php
	
	sudo rm -r /usr/bin/php
	
如果没有安装brew，可以按照官网的步骤安装

	http://brew.sh/


### nginx的安装与配置
	
安装nginx

	brew install nginx

修改配置文件

	sudo vim /usr/local/etc/nginx/nginx.conf
		#修改默认的8080端口为80

给予管理员权限
	
	sudo chown root:wheel /usr/local/opt/nginx/bin/nginx
	sudo chmod u+s /usr/local/opt/nginx/bin/nginx

加入launchctl启动控制
	
	mkdir -p ~/Library/LaunchAgents
	cp /usr/local/opt/nginx/homebrew.mxcl.nginx.plist ~/Library/LaunchAgents/
	launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.nginx.plist

运行nginx

	sudo nginx #打开 nginx
	nginx -s reload|reopen|stop|quit  #重新加载配置|重启|停止|退出 nginx
	nginx -t   #测试配置是否有语法错误

用法详解
	
	nginx [-?hvVtq] [-s signal] [-c filename] [-p prefix] [-g directives]
 
选项列表

    -?,-h           : 打开帮助信息
    -v              : 显示版本信息并退出
    -V              : 显示版本和配置选项信息，然后退出
    -t              : 检测配置文件是否有语法错误，然后退出
    -q              : 在检测配置文件期间屏蔽非错误信息
    -s signal       : 给一个 nginx 主进程发送信号：stop（停止）, quit（退出）, reopen（重启）, reload（重新加载配置文件）
    -p prefix       : 设置前缀路径（默认是：/usr/local/Cellar/nginx/1.2.6/）
    -c filename     : 设置配置文件（默认是：/usr/local/etc/nginx/nginx.conf）
    -g directives   : 设置配置文件外的全局指令


### mysql的安装与配置

安装mysql
	
	brew install mysql
	cd /usr/local/opt/mysql/
	
修改配置文件

	sudo vim my.cnf
	#如果出现无法启动mysql，rm my.cnf 
	
加入launchctl启动控制

	mkdir -p ~/Library/LaunchAgents/
	cp /usr/local/opt/mysql/homebrew.mxcl.mysql.plist ~/Library/LaunchAgents/
	launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.mysql.plist
	#取消启动
	#launchctl unload ~/Library/LaunchAgents/homebrew.mxcl.mysql.plist
	
初始化 mysql

	./bin/mysql_install_db 
	
执行安全设置脚本,设置root账号密码

	./bin/mysql_secure_installation
	

命令行连接mysql

	mysql -uroot -p
	


### php的安装与配置

brew 默认没有 php 安装包：

	brew tap homebrew/dupes
	brew tap josegonzalez/homebrew-php

现在可以安装php了：

	brew install php54 --with-imap --with-tidy --with-debug --with-mysql --with-fpm
	
将php路径加入PATH

	sudo vim ~/.bash_profile	
		export PATH="$(brew --prefix php54)/bin:$PATH"
		
	source ~/.bash_profile
	

加入launchctl启动控制

	mkdir -p ~/Library/LaunchAgents
	cp /usr/local/opt/php54/homebrew.mxcl.php54.plist ~/Library/LaunchAgents/
	launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.php54.plist

	
配置路径

	/usr/local/etc/php/5.4/php.ini
	/usr/local/etc/php/5.4/php-fpm.conf
	

配置 Nginx 支持 PHP-FPM 

	sudo vim /usr/local/etc/nginx/nginx.conf	
		
		# 添加默认首页 php
		index  index.php index.html index.htm;
		
		# 取消以下内容的注释，并做修改
		location ~ \.php$ {
            fastcgi_intercept_errors on;
            fastcgi_pass   127.0.0.1:9000;
            fastcgi_index  index.php;
            fastcgi_param  SCRIPT_FILENAME  /usr/local/Cellar/nginx/1.6.0_1/html$fastcgi_script_name;
            include        /usr/local/etc/nginx/fastcgi_params;
        }

	
### 测试环境

	sudo vim /usr/local/Cellar/nginx/1.6.0_1/html/index.php
	
		#添加测试代码
		<?php 
			phpinfo();
		
	
	

### 结语

到目前为止，我们的Nginx、MySQL、PHP-FPM三大软件已经安装好了，针对不同的系统版本和软件版本，可能会遇到一些问题，欢迎留言探讨。
	
	
	
	
	

	
	
