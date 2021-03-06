---

layout: post
title:  "PHP标准化规范PSR 0、PSR 1、PSR 2、PSR 3、PSR 4"
date:   2015-02-28 12:30:00
tags: [PHP]

---

PSR是PHP通用性框架小组 （[PHP Framework Interop Group](http://www.php-fig.org/)） 制定的PHP规范，是PHP开发的事实标准。

截止到目前（2015年2月），正式发布过的PHP规范共有5个：

* PSR 0 自动加载标准（已废弃，被PSR 4取代）
* PSR 1 基本代码规范
* PSR 2 代码风格指南
* PSR 3 日志接口
* PSR 4 改进的自动加载

那么使用、遵循PSR标准有什么必要和好处呢？

作为一名Go语言脑残粉，最开始让我怦然心动的就是那个全世界强制统一的编码规范。统一的编码风格，可以让我们轻松愉悦地阅读他人的代码，以及编写让他人轻松愉悦的代码。

就PSR规范本身来说，个人觉得是非常优秀、简洁的实践结晶。遵循这些标准，除了能使我们的代码更加可读之外，还能让我们的程序更加健壮，更能提高开发者的个人素养。


下面罗列一下PSR 1 ~ PSR 4的主要内容（已废弃的PSR 0不再介绍）：


### PSR 1 基本代码规范

* 代码中只使用长标签 `<?php ?>` 和 短输出标签`<?= ?>`
* 文件编码只使用UTF-8 无BOM 格式
* 一个源文件建议只用来做声明（类(class)，函数(function)，常量(constant)等）或者只用来做一些引起副作用的操作（例如：输出信息，修改.ini配置等）,不建议同时做这两件事
	* 应该避免的例子，既包含声明又有副作用：

			<?php
			// 副作用：修改了ini配置
			ini_set('error_reporting', E_ALL);
			
			// 副作用：载入了文件
			include "file.php";
			
			// 副作用：产生了输出
			echo "<html>\n";
			
			// 声明
			function foo()
			{
			    // 函数体
			}	

	* 提倡的例子，仅包含声明：

			<?php
			// 声明
			function foo()
			{
			    // 函数体
			}
			
			// 条件式声明不算做是副作用
			if (! function_exists('bar')) {
			    function bar()
			    {
			        // 函数体
			    }
			}

* 一个源文件中只能有一个类(class)，并且每个类(class)至少要有一级空间名（namespace）：即一个顶级的组织名(vendor name)。类名(class name) 必须使用StudlyCaps（骆驼式）写法

		<?php
		namespace Vendor\Model;
		
		class Foo
		{
		}

* 类常量必须只由大写字母和下划线(_)组成：

		<?php
		namespace Vendor\Model;
		
		class Foo
		{
		    const VERSION = '1.0';
		    const DATE_APPROVED = '2012-06-01';
		}

* 类属性命名依据喜好选择形如 $StulyCaps，$camelCase 或者 $unser_score 中的风格，并在一个合理的范围内保持一致
* 方法名必须使用camelCase(驼峰式)风格来声明。



### PSR 2 代码风格指南

* 代码使用4个空格来进行缩进，不使用制表符；使用Unix LF(换行)作为行结束符
* 一行代码的长度不建议有硬限制；软限制必须为120个字符，建议每行代码80个字符或者更少
* 在命名空间(namespace)的声明下面必须有一行空行，并且在导入(use)的声明下面也必须有一行空行
* 类(class)的左花括号必须放到其声明下面自成一行，右花括号则必须放到类主体下面自成一行
* 方法(method)的左花括号必须放到其声明下面自成一行，右花括号则必须放到方法主体的下一行
* 所有的属性(property)和方法(method) 必须有可见性声明；抽象(abstract)和终结(final)声明必须在可见性声明之前；而静态(static)声明必须在可见性声明之后
* 所有的属性(property)和方法(method) 必须有可见性声明；抽象(abstract)和终结(final)声明必须在可见性声明之前；而静态(static)声明必须在可见性声明之后
* 控制结构的左花括号必须跟其放在同一行，右花括号必须放在该控制结构代码主体的下一行
* 控制结构的左括号之后不可有空格，右括号之前也不可有空格

### PSR 3 日志接口


#### 基础

- `LoggerInterface`暴露八个接口用来记录八个等级(debug, info, notice, warning, error, critical, alert, emergency)的日志。

- 第九个方法是`log`，接受日志等级作为第一个参数。用一个日志等级常量来调用这个方法`必须`和直接调用指定等级方法的结果一致。用一个本规范中未定义且不为具体实现所知的日志等级来调用该方法`必须`抛出一个`Psr\Log\InvalidArgumentException`。`不推荐`使用自定义的日志等级，除非你非常确定当前类库对其有所支持。

[RFC 5424]: http://tools.ietf.org/html/rfc5424

#### 消息

- 每个方法都接受一个字符串，或者一个有`__toString`方法的对象作为`message`参数。`实现者` `可以`对传入的对象有特殊的处理。如果没有，`实现者` `必须`将它转换成字符串。

- `message`参数中`可能`包含一些`可以`被`context`参数的数值所替换的占位符。

  占位符名字`必须`和`context`数组类型参数的键名对应。

  占位符名字`必须`使用一对花括号来作为分隔符。在占位符和分隔符之间`不能`有任何空格。

  占位符名字`应该`只能由`A-Z`，`a-z`，`0-9`，下划线`_`和句号`.`组成。其它的字符作为以后占位符规范的保留字。

  `实现者` `可以`使用占位符来实现不同的转义和翻译日志成文。因为`用户`并不知道上下文数据会是什么，所以`不推荐`提前转义占位符。


#### 上下文

- 每个方法接受一个数组作为`context`参数，用来存储不适合在字符串中填充的信息。数组可以包括任何东西。`实现者` `必须`确保他们尽可能包容的对`context`参数进行处理。一个`context`参数的给定值`不可`导致抛出异常，也`不可`产生任何PHP错误，警告或者提醒。

- 如果在`context`参数中传入了一个`异常`对象，它必须以`exception`作为键名。记录异常轨迹是通用的模式，并且可以在日志系统支持的情况下从异常中提取出整个调用栈。`实现者`在将`exception`当做`异常`对象来使用之前`必须`去验证它是不是一个`异常`对象，因为它`可能`包含着任何东西。

#### 助手类和接口

- `Psr\Log\AbstractLogger`类可以让你通过继承它并实现通用的`log`方法来方便的实现`LoggerInterface`接口。而其他八个方法将会把消息和上下文转发给`log`方法。

- 类似的，使用`Psr\Log\LoggerTrait`只需要你实现通用的`log`方法。注意特性是不能用来实现接口的，所以你依然需要在你的类中`implement LoggerInterface`。

- `Psr\Log\NullLogger`是和接口一起提供的。它在没有可用的日志记录器时，`可以`为使用日志接口的`用户`们提供一个后备的“黑洞”。但是，当`context`参数的构建非常耗时的时候，直接判断是否需要记录日志可能是个更好的选择。

- `Psr\Log\LoggerAwareInterface`只有一个`setLogger(LoggerInterface $logger)`方法，它可以在框架中用来随意设置一个日志记录器。

- `Psr\Log\LoggerAwareTrait`特性可以被用来在各个类中轻松实现相同的接口。通过它可以访问到`$this->logger`。

- `Psr\Log\LogLevel`类拥有八个日志等级的常量。


### PSR 4 改进的自动加载

* 术语「类」是一个泛称；它包含类，接口，traits 以及其他类似的结构；

* 完全限定类名应该类似如下范例：

    `\<NamespaceName>(\<SubNamespaceNames>)*\<ClassName>`

    * 完全限定类名必须有一个顶级命名空间（Vendor Name）；
    * 完全限定类名可以有多个子命名空间；
    * 完全限定类名应该有一个终止类名；
    * 下划线在完全限定类名中是没有特殊含义的；
    * 字母在完全限定类名中可以是任何大小写的组合；
    * 所有类名必须以大小写敏感的方式引用；

* 当从完全限定类名载入文件时：

    * 在完全限定类名中，连续的一个或几个子命名空间构成的命名空间前缀（不包括顶级命名空间的分隔符），至少对应着至少一个基础目录。
    * 在「命名空间前缀」后的连续子命名空间名称对应一个「基础目录」下的子目录，其中的命名
空间分隔符表示目录分隔符。子目录名称必须和子命名空间名大小写匹配；
    * 终止类名对应一个以 `.php` 结尾的文件。文件名必须和终止类名大小写匹配；

* 自动载入器的实现不可抛出任何异常，不可引发任何等级的错误；也不应返回值；



有一篇之前博文的内容和这份规范非常契合:[一份PHP编码规范](http://tabalt.net/blog/a-php-coding-standards/)。



