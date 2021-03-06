---

layout: post
title:  "第19章：一般控制问题"
date:   2014-10-05 12:30:00
categories: 博文
tags: []

---

表驱动法是一种从表里面查找信息而不使用逻辑语句（if/case）的编程模式。凡是能通过逻辑语句来选择的事物，都可以通过查表来选择。对于简单的情况，使用逻辑语句更容易和直白，但随着逻辑链的越来越复杂，查表法也越来越显得更具吸引力。



#### 1、布尔表达式

除了最简单的、要求语句按顺序执行的控制结构外，其他的控制结构都依赖于布尔表达式的求值。

* 用true和false做布尔判断

	不要用0或者1等数值来表示布尔值，而应该使用标识符true和false，以使得布尔表达式更可读。隐式的比较布尔值与true和false，如使用if(a>b)而不使用if((a>b)==true)
	
* 简化复杂的表达式

	* 拆分复杂的判断并引入新的布尔变量
	* 把复杂的表达式做成布尔函数
	* 用决策表代替复杂的条件

* 编写肯定形式的布尔表达式 

	* 在if语句中，把判断条件从否定形式转换成肯定形式，并且互换if和else子句中的代码
	* 用狄摩根定力简化否定的布尔判断
	
* 用括号使布尔表达式更清晰
	
	对于复杂的布尔表达式，与其依赖于语言的求值顺序，不如用括号更清楚地表达意图。
	
* 理解表达式是如何求值的

	很多语言在求职布尔表达式的值的时候会使用一些隐含的控制方式。有些会计算每个项的值再把这些项组合起来求整个表达式的值。有些语言则采用短路或者惰性求值，只求出那些必须的部分。最好使用嵌套的判断语句来明确你的意图，不要依赖于求值顺序和短路求值。

* 按照数轴的顺序编写数值表达式

	应该很好地组织数值判断，使其顺序与数轴上的店排列顺序相符，以便从直观上就“判断的是什么”给读者提示
	
* 与0比较的指导原则

	* 隐式的比较逻辑变量
	* 把数和0相比较
	* 在c中显示地比较字符和零终止符（\0）
	* 把指针与NULL相比较
	

#### 2、复合语句（语句块）

复合语句或语句块是指一组被视为一条单一语句的语句，用于控制程序流。可以在一组语句的外表扩上“{”和“}”来创建复合语句。

有效使用复合语句的指导原则：

* 把括号对一起写出
* 用括号来把条件表达清楚


#### 3、空语句

使用空语句的指导原则：

* 小心使用空语句

	使用一组空的括号和独占一行的分号突出空语句
	
* 为空语句创建一个DoNothing()预处理宏或者内联函数

* 考虑如果换用一个非空的循环体，是否会让代码更清晰


#### 4、驯服危险的深层嵌套

过分深层的嵌套至今仍然是产生混乱代码的罪魁祸首之一。用于避免深层嵌套的方法：

* 通过重复检测条件中的某一部分来简化嵌套的if语句
* 用break块来简化嵌套if
* 把嵌套if换成一组if-then-else语句
* 把嵌套if换成case语句
* 把深层嵌套的代码抽取出来放进单独的子程序
* 使用一种更面向对象的方法
* 重新设计深层嵌套的代码


#### 5、结构化编程

结构化编程的核心思想是一个应用程序应该只采用一些单入单出的控制结构（单一入口、单一出口的控制结构），一个结构化的程序将按照一种有序的且有有规则的方式执行，不会做不可预知的随便跳转。


* 结构化编程的三个组成部分：

	* 顺序
	* 选择
	* 迭代
	
结构化编程的中心论点是，任何一种控制流都可以有顺序选择和迭代这三种结构生成。


#### 6、控制结构与复杂度

控制结构用的不好会增加复杂度，反之，会降低复杂度。

程序复杂度的一个衡量标准是，为了理解应用程序，你必须在同一时间记住的智力实体的数量。

与控制流相关的复杂度非常重要，因为它与不可靠的代码和频繁出现的错误息息相关。

降低复杂度的一般原则：

* 通过做一些脑力联系来提高自身的脑力游戏水平
* 降低应用程序的复杂度，以及为了了解它所需要的专心程度



更多有关[《代码大全 2》的读书笔记](http://tabalt.net/blog/code-complete-2-reading-notes/)，请关注 ：  
[http://tabalt.net/blog/code-complete-2-reading-notes/](http://tabalt.net/blog/code-complete-2-reading-notes/)




