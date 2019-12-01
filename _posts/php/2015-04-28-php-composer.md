---

layout: post
title:  "PHP 依赖管理工具 Composer"
date:   2015-04-28 15:08:00
tags: [PHP]

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

在项目目录中创建 composer.json文件，填入以下内容：

	
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
	

### 配置文件composer.json

使用Composer需要在你的项目目录中添加 json格式的配置文件 composer.json，通过这个文件指定当前项目的描述元数据以及项目依赖。

常见配置项：

| 配置指令 | 说明 | 示例 |
| ------ | ------ | ------ |
| name | 可安装包的名称 | "name": "tabalt/composerdemo" |
| description | 描述 |  |
| authors | 作者 |  |
| version | 指定版本 | "version": "1.0.0" |
| require |  指定依赖的包 |  "require": { "monolog/monolog": "1.0.*"  }  |
| repositories | 申明仓库地址 | "repositories": [{ "type": "vcs", "url": "https://github.com/tabalt/composerdemo" }] |

使用`composer init`可以用向导的形式创建composer.json文件，一个较为详细的配置如下：

```
{
    "name": "tabalt/composerdemo",
    "description": "composer demo description",
    "version": "1.0.0",
    "require": {
        "monolog/monolog": "~1.13"
    },
    "authors": [
        {
            "name": "tabalt",
            "email": "tabalt@actphp.com"
        }
    ]
}

```


### Composer类自动加载

Composer的配置文件中支持autoload配置项，用于支持php类的自动加载：

```
{
    "autoload": {
        "psr-4": {
            "Monolog\\": "src/",
            "Vendor\\Namespace\\": ""
        },
        "psr-0": {
            "Monolog\\": "src/",
            "Vendor\\Namespace\\": "src/",
            "Vendor_Namespace_": "src/"
        },
        "classmap": [
        	"src/", 
        	"lib/", 
        	"Something.php"
        ],
        "files": [
        	"src/MyLibrary/functions.php"
        ]
    }
}

```

修改autoload配置后，需要`composer install` 重新生成`vendor/autoload.php`，然后在你的代码里包含这个文件。

```
# 包含autoload文件，并可设置更多命名空间
$Loader = require 'vendor/autoload.php';
$Loader->add('Tabalt\\Test\\', __DIR__);
```


### 锁文件 composer.lock

Composer 会将安装时确切的版本号列表写入 composer.lock 文件。composer install 命令执行时，如果存在锁文件，它将下载文件中指定的版本而忽略 composer.json 文件中的定义。

锁文件 composer.lock 和配置文件  composer.json 都应该提交到版本库中。


### Composer常用命令

在命令行下，我们经常需要使用`composer + 命令`的形式来完成我们的工作，常用的命令如下表：

| 命令 |  功能 |
| ------ |  ------ |
| list | 列出命令 |
| init |  以交互的方式创建composer.json配置文件 |
| install | 读取配置，处理依赖，并安装到vendor目录 |
| update | 获取依赖的最新版本，并升级 composer.lock 文件 |
| require | 增加新的依赖包到当前目录的 composer.json 文件 |
| show | 列出所有可用的软件包，指定包名称可以查看包的详细信息 |
| search | 搜索 packagist.org 上的依赖包 |
| validate | 检测 composer.json 文件是否有效 |
| depends | 查出已安装在你项目中的某个包，是否正被其它的包所依赖，并列出他们 |
| status  | 检查从自定义源安装的包的改动 |
| self-update | 将 Composer 自身升级到最新版本 |

每个命令都有不同的参数，具体可以参加官方文档


### 更多内容


更多内容可以参考Composer的官方文档：

https://getcomposer.org/doc/

英文不好的同学可以参考中文版翻译：

http://docs.phpcomposer.com/



