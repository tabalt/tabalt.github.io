---

layout: post
title:  "第3章：基本工具"
date:   2014-11-12 12:30:00
tags: []

keywords: 基本工具,基本工具读书笔记
description: 《程序员修炼之道》第3章基本工具读书笔记

---


### 14、纯文本的威力


注重实效的程序员的基本材料是知识。搜集需求，将其变为知识，又在设计、实现、测试、文档中表达这些知识。持久的存储知识的最佳途径是纯文本。

**什么是纯文本**

纯文本由可打印字符组成，人可以直接阅读和理解其形式。纯文本并非意味着文本是无结构的，XML、SHML、HTML都是有良好定义的结构的纯文本。

纯文本可以做二进制格式所能做的每件事，与直接的二进制编码相比，纯文本所处的层面更高。纯文本可以获得自描述的、不依赖与创建它的应用的数据流。


`用纯文本保存知识`

**纯文本的缺点**

* 与压缩的二进制格式相比，存储纯文本所需空间更多
* 解释及处理纯文本文件，计算上的代价可能更昂贵


**纯文本的威力**

* 保证不过时

	人能够阅读的数据格式，以及自描述的数据，将比所有其他的数据形式和创建他们的应用都活的更长久。

* 杠杆作用

	计算机中的每一样工具，从源码管理系统到编译器环境，再到编辑器及独立的过滤器，都能够在纯文本上进行操作。

* 更易于测试

	增加、更新、修改纯文本的测试数据是一件简单的事情，无需为此创建任何特殊工具。


### 15、shell游戏


对于操纵文本文件的程序员，工作台就是命令shell，可以调用你的全套工具，并使用管道、以这些工具原来的开发者从未想过的方式把他们组合在一起。

shell能完成GUI环境受限、不支持、需要自动化处理的工作。GUI的好处是所见即所得（what you see is what you get），缺点是所见即全部所得（what you see is all you get）。

命令行更适宜快速组合一些命令，完成一次查询或某种其他任务：

* 找出修改日期比MakeFile文件更近的全部.c文件

		find . -name '*.c' -newer Makefile -print

* 构造源码的zip/tar存档文件

		zip archive.zip *.h *.c
		tar cvf archive.tar *.h *.c

* 上周哪些java文件没有改动过

		find . -name '*.java' -mtime +7 -print

* 上面的文件中，哪些使用了awt库

		find . -name '*.java' -mtime +7 -print | xargs grep 'java.awt'


`利用命令shell的力量`

熟悉shell，使自己的生产效率迅速提高。


**shell使用程序与windows**

windows命令行实用程序不如对ing的Unix使用程序，可安装使用Cygwin、Uwin等软件包改善这种情况。



### 16、强力编辑

`一种编辑器`

选一种编辑器，彻底了解他，并将其用于所有的编辑任务，让键击成为本能反应。


**编辑器的特性**

* 可配置
* 可扩展
* 可编程
* 支持特定编程语言的特性
	
	* 语法突显
	* 自动完成
	* 自动缩进
	* 初始代码或文档样板
	* 与帮助系统挂接
	* 类IDE特性（编译、调试等）
	
	
**生产率**

有的编辑器能帮助你使常用的操作流水线化，如填好的类名、模块名，你的姓名或版权说明、语言的各种构造体的骨架、自动缩进等。

选一种强大的编辑器，好好学习它，减少你需要敲击的键数，设法扩展它，并应用于更多场合，评估是否使用你羡慕的别人在用的编辑器。


### 17、源码控制


源码控制系统追踪你在源码和文档中做出的每一项改动，是一个巨大的undo键，是一个项目级的时间机器，让你能返回代码能够运行的太平日子。

源码控制系统能做的远比撤销错误要多。好的SCCS能用于bug追踪、审计、性能、质量等目的，标识软件的各次发布。

`总是使用源码控制`

即使你的团队只有你一个人，你的项目只需一周时间，即使是那些用过就扔的原型，即使你的工作对象并非源码，确保每样东西都处在源码控制之下。

将项目置于源码控制之下的一项很大的、隐蔽的好处，可以进行自动的、可重复的产品构建。

如果你的团队每样使用源码控制，这是个“布道”机会。在等待他们看到光明的同时，应该实施自己私人的源码控制。SCCS同样适用于你再工作之外所做的事情。


### 18、调试


现代计算机仍然局限于做你告诉它的事情，而不一定是你想要他做的事情。没有人能写出完美的软件，调试肯定要占用你大量的时间。


**调试心理学**

对于许多开发者，调试本身是一个敏感、感性的话题。你可能会遇到抵赖、推诿、蹩脚的借口，甚或是无动于衷。调试就是解决问题，应该专注于修正问题，而不是发出指责。

`要修正问题，而不是发出指责`

bug是你的过错还是别人的过错，并不是很有关系，它仍然是你的问题。


**调试的思维方式**

在开始调试之前，选择恰当的思维方式十分重要，你需要关闭每天用于保护自我的防卫措施，忘掉你可能面临的任何项目压力，并让自己放松下来。记住调试的第一准则：

`不要恐慌`

目睹bug或是见到bug报告时，不要第一反应是“那不可能”，不要浪费脑细胞在“但那不可能发生”起头的思路上，因为不仅可能，而且已经发生了。

调试时，小心近视，抵制只修正in看到的症状的急迫愿望，设法找出问题的根源，而不是问题的特定表现。


**从何处开始**

开始查看代码前，确保你是在能够编译成功、没有警告的代码上工作。把编译器的警告级别设置得尽可能高。

设法解决问题时，你需要搜集所有的相关数据。首先需要在观察中做到准确。观察报告bug的用户的操作，以获得足够的细节。


**测试策略**

* 使你的数据可视化

	使用支持可视化的调试器、用纸和笔、或是用外部的绘图程序来可视化数据，深入得多地获得对数据的洞察。

* 跟踪

	跟踪用于观察程序或数据结构随时间变化的状态。跟踪语句把小段消息打印到屏幕上或文件中，在诊断调试器无法诊断的一些错误种类时特别有效。

* 橡皮鸭

	找到问题的原因的一种非常简单，却特别有效的方式是像别人解释他。在想别人解释问题时，你必须明确的陈述那些你在自己检查代码时想当然的事情，可能会突然获得对问题的新洞见。

* 消除过程

	bug可能出现在OS、编译器、第三方产品中，但这不应该是你的第一想法，有大得多的可能性是bug存在于正在开发的代码中。即使问题确实应该归于第三方，在提交bug报告前，必须先消除你代码中的bug。
	
	
**造成惊讶的要素**

在发现某个bug让你吃惊时，你必须重新评估你确信不疑的“事实”。某样东西出错时，你的吃惊程度和你对正在运行的代码的信任与信心成正比。

在面对让人大吃一惊的故障时，你必须意识到你的一个或更多的假设是错的。遇到吃惊的bug时，除了修正他，还需要确定先前为什么没有找出这个故障。

`不要假定，要证明`


### 19、文本操纵


文本操纵语言对于编程的意义，就像是嚳刨机对于木工活的意义。在恰当的人手中，他们能让人难以置信的强大和用途广泛。


`学习一种文本操纵语言`

Unix开发者常常喜欢利用他们的命令shell的力量，并用像awk和sed这样的工具加以增强。偏爱更为结构化的工具的人喜欢Python的面向对象本质。有人喜欢用Perl编写短小的脚本。

文本操作语言的应用示例：

* 数据库schema维护
* java属性访问
* 测试数据生成
* 写书
* c与Object Pascal的借口
* 生成web 文档


### 20、代码生成器

作为程序员，常常发现自己需要获得同一种功能，但却是在不同的语境中。程序员可以构建代码生成器，一旦构建好，在项目的生命期内都可以使用它，实际上没有任何代价。

`编写能编写代码的代码`

代码生成器的两种主要类型：


* 被动代码生成器

	本质是参数化模板，根据一组输入生成给定的输出形式，结果一经产生，就成了项目中又充分资格的源文件，像任何其他文件一样被编辑、编译、置于源码控制之下，其来源将被忘记。
	用途：
	
	* 创建新的源文件，生成目标、源码控制指示，版权说明及项目中每个新文件的标准注释块。
	* 在编程语言之间进行一次性转换
	* 生成查找表及其他在运行时计算很昂贵的资源

* 主动代码生成器

	通过主动代码生成器，可以取某项知识的一种表现形式，将其转换为你的应用需要的所有形式。当你发现自己在设法让两种完全不同的环境一起工作，应该考虑使用主动代码生成器。
	
	用途：
	
	* 读取schema，自动生成结构源码
	* 不同语言通信时，生成数据结构、消息格式、字段名等公共信息


代码生成器是复杂的东西，但他们不一定要很复杂，最复杂的部分通常是负责分析输入文件的解析器，让输入格式保持简单，代码生成器就会变得简单。

代码生成器不一定要生成代码，你可以生成任何可能成为你的项目中别处输入的文本，如HTML、XML、纯文本。



更多有关[《程序员修炼之道》的读书笔记](http://tabalt.net/blog/the-pragmatic-programmer-reading-notes/)，请关注 ：  
[http://tabalt.net/blog/the-pragmatic-programmer-reading-notes/](http://tabalt.net/blog/the-pragmatic-programmer-reading-notes/)