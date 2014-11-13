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












更多有关[《程序员修炼之道》的读书笔记](http://tabalt.net/blog/the-pragmatic-programmer-reading-notes/)，请关注 ：  
[http://tabalt.net/blog/the-pragmatic-programmer-reading-notes/](http://tabalt.net/blog/the-pragmatic-programmer-reading-notes/)