---

layout: post
title:  "第15章：使用条件语句"
date:   2014-09-24 12:30:00
categories: 博文
tags: []

---



#### 1、if语句

* 简单的if-then语句

	写if语句的时候，遵循下述指导原则：

	* 首先写正常代码路径，再处理不常见情况
	* 确保对于等量的分支是正确的
	* 把正常情况的处理放在if后面而不要放在else后面
	* 让if子句后面跟随一个有意义的语句
	* 考虑else子句
	* 测试else子句的正确性
	* 检查if和else子句是不是弄反了

* if-then-else语句串

	写if-then-else语句的指导原则：

	* 利用布尔函数调用简化复杂的检测
	* 把最常见的情况放在最前面
	* 确保所有的情况都考虑到了
	* 如果语言支持，请把if-then-else语句换成其他结构


#### 2、case语句

* 为case选择最有效的排列顺序

	* 按字母顺序或数字书序排列各种情况
	* 把正常的情况放在前面
	* 按执行频率排列case子句

* 使用case语句的诀窍

	* 简化每种情况对应的操作
	* 不要为了使用case语句而可以制造一个变量
	* 把default自居只用于检查真正的默认情况
	* 利用default子句来检测错误
	* 在c++和java里，避免代码执行越过一条case子句的末尾
	* 在c++里，在case某位明确无误的标明需要穿越执行的程序流程


更多有关[《代码大全 2》的读书笔记](http://tabalt.net/blog/code-complete-2-reading-notes/)，请关注 ：  
[http://tabalt.net/blog/code-complete-2-reading-notes/](http://tabalt.net/blog/code-complete-2-reading-notes/)




