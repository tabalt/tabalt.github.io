---

layout: post
title:  "PHP 依赖管理工具 Composer"
date:   2015-04-28 15:08:00
tags: [php,composer]

---

Composer是PHP的依赖管理工具，它在每个项目的基础上管理包和类库，默认情况下不会在全局安装任何东西，因此并不是一个包管理器。



### 安装Composer
	
Composer本身就是PHP开发的，打包成了一个phar文件，安装起来非常简单，执行以下命令即可：
	
	cd ~/
	curl -sS https://getcomposer.org/installer | php
	mv ~/composer.phar /usr/local/bin/composer
	

### Composer简单使用


首先，创建一个使用Composer的示例项目的目录：


	mkdir -p ~/study/composer_demo
	cd ~/study/composer_demo

在项目目录中创建Composer的json格式的配置文件 composer.json，填入以下内容：

	
	{
    	"require": {
    		"monolog/monolog": "1.0.*"
    	}
	}

然后执行以下命令：

	composer install
	

稍等片刻，终端输出如下内容，即代表成功：


	Loading composer repositories with package information
	Installing dependencies (including require-dev)
  		- Installing monolog/monolog (1.0.2)
    	  Downloading: 100%

	Writing lock file
	Generating autoload files
	

### 