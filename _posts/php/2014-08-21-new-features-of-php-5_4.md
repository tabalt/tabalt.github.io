---

layout: post
title:  "PHP 5.4的新特性"
date:   2014-08-21 12:30:00
tags: [php]

---


PHP 5.4正式版发布于2012年3月，时至今日，已经越来越多的项目线上环境采用了这一版本。而在2014年8月14日，PHP官网发布了5.3的最后一个版本PHP 5.3.29，做为开发者必须得尽快拥抱PHP 5.4了。相比之前的版本，PHP 5.4带来了不少的新特性，本文尝试对这些新特性进行整理和实验。


### Traits

Traits是PHP 5.4 新增的最大的语法特性，提供类似Go语言的组合功能，横向扩展PHP类。有关Traits的详细介绍请参考：[PHP中的Traits详解](http://tabalt.net/blog/php-traits/) 

### 定义数组的短语法

在PHP5.4之前要定义一个数组，我们需要编写如下代码：

    $userList = array(
        'name' => 'someone',
        'age' => 18
    );

PHP 5.4中我们可以这样定义数组：

    $userList = [
        'name' => 'someone',
        'age' => 18
    ];

两者定义的数组结构一致：

    Array
    (
        [name] => someone
        [age] => 18
    )


### 函数中返回的数组，可以通过function_name()[key]的方式访问:

    <?php
        function getPetList() {
            return [
                'cat',
                'dog',
                'pig'
            ];
        }
        echo getPetList()[1] ."\n";

输出结果如下：

    dog

### 闭包（匿名函数） 支持 $this

在这之前，类内部定义的匿名函数是不能使用我们常用的$this关键字的，现在，下面的代码也能正确运行了：

    <?php
        class Hello {
            private $name = 'world';
            public function say(){
                $getName = function (){
                    return $this->name;
                };
                echo 'hello, ' . $getName() . "\n";
            }
        }
        $hello = new Hello();
        $hello->say();

输出结果如下：

    hello, world

而在PHP 5.3 的环境下，则会报致命错误了:

    Fatal error: Using $this when not in object context in ~/anonymous_this.php on line 6


### 不论short_open_tag是否开启，短标签<?=总是可用
    
在模板中输出内容时，可以不用关注short_open_tag，直接使用下面的代码输出内容了：

    <?="hello" ?>

当然，对于下面的代码，还是需要short_open_tag开启才生效的:

    <? echo "hello"; ?> 

### 在实例化对象时可直接访问类成员

    <?php
        class Hello {
            public function say() {
                echo "Hello World\n";
            }
        }
        $hello = new Hello();
        $hello->say();
        (new Hello())->say(); 


### 可调用的类型提示 callable typehint

这个特性是定义函数的形参时，在前面加上一个 callable的关键字，代表函数调用时，传递的实参必须是可以被调用函数名或者是类及其方法的数组。

    <?php
    function deal_str($str, callable $func) {
        var_dump($func($str));
    }
    function diy_func($str) {
       return htmlspecialchars($str);
    }
    class Filter {
        public function test($str) {
            return diy_func($str);
        }
    }
    $str = "  <strong>hello,callable</strong>''abcdefg";
    deal_str($str, "trim");
    deal_str($str, "strip_tags");
    deal_str($str, "diy_func");
    deal_str($str, array("Filter", "test"));
    deal_str($str, "not_exist_func");


输出结果如下：

    string(40) "<strong>hello,callable</strong>''abcdefg"
    string(25) "  hello,callable''abcdefg"
    string(54) "  &lt;strong&gt;hello,callable&lt;/strong&gt;''abcdefg"
    string(54) "  &lt;strong&gt;hello,callable&lt;/strong&gt;''abcdefg"
    PHP Catchable fatal error:  Argument 2 passed to deal_str() must be callable, string given, called in ~/callable_typehint.php on line 18 and defined in ~/callable_typehint.php on line 2

没错，当声明为callable的参数被传入不存在的函数或者类方法时，php就会报致命错误了。


### 直接书写二进制数

没有这个特性之前，只能通过bindec函数将二进制字符串转换成十进制：

    <?php   
        $bin  = 0b1101;
        echo "{$bin}\n";
        echo bindec('1101') . "\n";

输出结果如下：

    13
    13

### 命令行下的内置web服务器

进入到你的开发目录，执行`php -S localhost:8000`，会将当前目录作为web根目录启动http服务：

    cd ~/dev
    php -S localhost:8000
    
输出结果如下：

    PHP 5.4.26 Development Server started at Thu Aug 21 10:04:01 2014
    Listening on http://localhost:8000
    Document root is /home/tabalt/dev
    Press Ctrl-C to quit.

通过浏览器访问 http://localhost:8000，会在控制台输出日志：

    [Thu Aug 21 10:14:37 2014] 10.18.83.248:51418 [200]: /
    [Thu Aug 21 10:14:40 2014] 10.18.83.248:51420 [404]: /test.php - No such file or directory

通过指定 `-t` 参数可以指定web根目录：

    cd ~/dev
    php -S localhost:8000 -t ~/dev/test

输出结果如下：

    PHP 5.4.26 Development Server started at Thu Aug 21 10:23:41 2014
    Listening on http://localhost:8000
    Document root is /home/tabalt/dev/test
    Press Ctrl-C to quit.

可以指定一个路由文件，来对请求做处理：

    
    #路由文件 router.php
    <?php
    //对非静态文件的请求，直接拦截处理
    if (preg_match('/\.(?:png|jpg|jpeg|gif)$/', $_SERVER["REQUEST_URI"]))
        return false;    // serve the requested resource as-is.
    else { 
        echo "<p>Welcome to PHP</p>";
    }
    ?>

    #指定路由文件的用法
    php -S localhost:8000 router.php


### 废弃的特性

每个新版本的发布，都会移除掉一些过时或者不再重要的特性，了解这些被废弃的用法，有助于我们及时纠正编码习惯，写出更健壮的代码。

以下特性从 PHP 5.4.0 开始被移除：

* Register Globals
* 安全模式Safe Mode
* 魔术引号 Magic Quote
* `break 0;`、`break $num;` 和 `continue 0;`、`continue $num;` 的用法
* allow_call_time_pass_reference 配置项
* session_is_registered()、session_register() 、 session_unregister() 函数


### 扩展资料

http://php.net/releases/5_4_0.php  
http://php.net/ChangeLog-5.php#5.4.0  
http://www.infoq.com/cn/presentations/hxc-php-54-new-features-performance-optimization  
http://php.webtutor.pl/en/2011/09/27/whats-new-in-php-5-4-a-huge-list-of-major-changes/  
http://www.oschina.net/question/54100_33123


