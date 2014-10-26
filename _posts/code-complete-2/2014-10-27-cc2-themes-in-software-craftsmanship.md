---

layout: post
title:  "第34章：软件工艺的话题"
date:   2014-10-27 12:30:00

---


#### 1、征服复杂性

* 在架构层面上讲习题划分为多个子系统，以便让思绪在某段时间内能专注于系统的一小部分
* 仔细定义类接口，从而可以忽略类内部的工作机理
* 保持类接口的抽象性，从而不必记住不必要的细节
* 避免全局变量，因为他会大大增加总是需要兼顾的代码比例
* 避免深层次的集成，因为这样会耗费很大精力
* 避免深度嵌套的循环或条件判断，因为他们都能用简单的控制结构取代，后者占用更少的大脑资源
* 别用goto，因为它们引入了非顺序执行，多数人都不容易弄懂
* 小心定义错误处理的方法，不要滥用不同的错误处理技术
* 以系统的观点对待内置的异常机制，后者会成为非线性的控制结构
* 不要让类过度膨胀，以至于占据整个程序
* 子程序应保持短小
* 使用清楚、不言自明的变量名，从而大脑不必费力记住诸如“i代表账号下表，j代表顾客下标”之类的细节
* 传递给子程序的参数数目应尽可能的少
* 用规范和约定来使大脑从记忆不同代码段的随意性、偶然性差异中解脱出来
* 只要可能，一般情况下应避免偶然性困难


#### 2、精选开发过程

对于多个程序员参与的项目，组织性的重要程度超过了个人技能。人们一起工作的方式将决定其能力是珠联璧合还是相互抵消。某个成员对其他人的工作是支持还是拖后腿，取决于团队采取的开发过程。


#### 3、首先为人写程序，其次才是为机器

计算机不关心你的代码是否好读，它更善于读二进制指令，而非高级语言的代码。编写可读性好的代码，是为了便于别人看懂。可读性对程序的以下方面都有正面影响：

* 可理解性
* 容易复查
* 错误率
* 调试
* 可修改性
* 开发时间
* 外在质量

可读的代码写起来并不比含糊的代码多花时间，运行时至少不比后者慢。如果能轻松阅读自己写的代码，确保该代码能工作也会更容易。


#### 4、深入一门语言去编程，不浮于表面

不要将编程思路局限到所用语言能自动支持的范围。杰出的程序员会考虑他们要干什么，然后才是怎样用手头的工具去实现他们的目标。

在一些极端情况下，特别是新技术环境中，工具也许会原始到你不得不对所期望的编程方法有重大改变，这时所用语言可能使你难以采用自己期望的方法，但是仍然能受益于编程规范，利用它帮助你理清环境中的危险特性。


#### 5、借助规范集中注意力

规范是一套用于管理复杂度的智力工具。规范的好处有：

* 使用规范能避免各程序员随意决定导致的理解困难
* 规范能够精确地传达重要信息
* 规范可以使你免除各种风险
* 规范增加了对底层工作的可预见性
* 规范能弥补语言的不足之处


#### 6、基于问题域编程

* 将程序划分为不同层次的抽象

	* 第0层 操作系统的操作和机器指令
	* 第1层 编程语言结构和工具
	* 第2层 底层实现结构
	* 第3层 底层问题域
	* 第4层 高层问题域

* 问题域的底层技术

	* 在问题域使用类，来实现有实际意义的结构
	* 隐藏底层数据类型及其实现细节的信息
	* 使用具名常量来说明字符串和文字量的意义
	* 对中间计算结果使用中间变量
	* 用布尔函数是复杂逻辑判断更清晰
	
	
#### 7、当心落石

编程既非完全的艺术也非完全的科学，通常实践中，他是介于二者之间的“工艺”。

注意警告信息，将其作为编程的疑点，因为编程几乎是纯粹的智力活动。


#### 8、迭代，反反复复，一次又一次

在许多软件开发活动中，迭代是正常现象：开始规划系统时，要喝用户商讨若干需求方案，直到大家达成一致为止，这就是一个迭代过程。为了获取更好的灵活性，以基类方式逐步构建和交付系统，也是迭代过程，形成最终产品钱，以原型方法快速开发出集中替代解决方案，还是迭代过程。

开发时，迭代次数越多，产品的质量越好。


#### 9、汝当分离软件与信仰

* 不合适的“宗教信仰”在软件开发中的表现形式：

	* 非要坚持某种设计方法
	* 笃信特定的布局或注释风格
	* 机理避免全局数据


* 软件先知

	一些专业优秀人员往往更容易偏执。不要盲目跟风，而应使用一种混合的方法，可用激动人心的最新方法做做试验，但仍扎根于传统的可靠方法

* 折中主义

	要对编程问题找出最有效的解决方案时，盲目迷信某种方法只会缩小你的选择余地。明知几种方法中有的可能成功，有的可能失败，但只有通过实践才能知道哪些好使。必须采取折中的态度。
	
* 试验

	试验应贯穿于整个开发过程，但固执会妨碍你这么做。要想有效地试验，应能基于试验结果改变思路，否则试验只会白白浪费时间。

	

更多有关[《代码大全 2》的读书笔记](http://tabalt.net/blog/code-complete-2-reading-notes/)，请关注 ：  
[http://tabalt.net/blog/code-complete-2-reading-notes/](http://tabalt.net/blog/code-complete-2-reading-notes/)



