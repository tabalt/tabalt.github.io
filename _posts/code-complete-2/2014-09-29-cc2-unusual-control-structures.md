---

layout: post
title:  "第17章：不常见的控制结构"
date:   2014-09-28 12:30:00
categories: 博文
tags: []

---


#### 1、子程序中的多次返回

* 使用return语句的指导原则

	* 如果能增强可读性、那么就使用return
	* 用防卫子句（早返回早退出）来简化复杂的错误处理
	* 减少每个子程序中return的数量
	

#### 2、递归

在递归里，一个子程序子句复杂解决某个问题的小部分，它还把问题分解成很多的小块，然后调用自己来分别解决每一个小块。当问题的小部分很容易解决，而问题的大部分也容易分解成众多的小部分时，常常会用到递归。

* 使用递归的技巧

	* 确认递归能够停止
	* 使用安全的计数器防止出现无穷递归
	* 把递归限制在一个子程序内
	* 留心桟空间
	* 不要用递归去计算阶乘或者斐波那契数列


#### 3、goto

goto争论的现代版本仍在以各种各样的形式出现。如争论多处返回、多个循环出口、具名循环出口、错误处理及异常处理等。

* 反对goto的论点：

	* 没有使用goto的代码就是高质量的代码
	* 含有goto的代码很难安排好格式
	* 使用goto也会破坏编译器的优化特性
	* 使用goto会使运行速度更慢，代码更大
	* 实践中，使用goto会违背代码应该严格自上而下的原则

* 支持goto的观点：

	* 在特定的场合下谨慎的使用goto，不要不分青红皂白的使用
	* 如果使用恰当，goto可以减少重复的代码
	* goto在分配资源、使用资源后再释放资源的子程序里非常有用
	* 某些情况下，goto会让代码运行速度更快，体积更小
	* 编程水平高并不等于不使用goto
	* 对goto做了几十年的研究后，人们还是无法证明它们是有害的
	* 很多现代语言已经包含了goto


* 为避免使用goto，可能的重写策略：

	* 用嵌套的if重写
	* 用一个状态变量重写代码
	* 用try-finally重写


* 是否使用goto？

	用不用goto是一个信仰问题。在现代语言里，可以很容易把九成的goto替换成与之等价的顺序结构。对于这些简单情况，应该把替换goto当成习惯。对于复杂的情况，仍有九成不用goto的可能，可以采用上述的重写策略来替换goto。对于剩下的1%的情况，使用goto是合理的办法，请在使用的同时予以详细的说明。

* 使用goto的指导原则：

	* 在那些不直接支持结构化控制的语言里，用goto模拟控制接口，但不要滥用goto
	* 在语言中内置等价控制结构的情况下不要用goto
	* 如果是为了提高代码效率而使用goto，请衡量此举实际带来的性能提升
	* 除非你要模拟结构化语句，否则尽量在每个子程序内只使用一个goto标号
	* 除非你要模拟结构化语句，否则尽量让goto向前端跳转而不要向后跳转
	* 确认所有的goto标号都被用到了
	* 确认goto不会产生某些执行不到的代码
	* 对于goto用法所展开的争论并不是事关全局的
	
	
#### 4、针对不常见控制结构的观点

一些离奇、过时、危险的，但是曾经被任务是可以接受、所期望的想法：

* 不加限制的使用goto
* 能动态计算出goto的跳转目标并且执行跳转
* 用goto从一个子程序的中部跳转到另外一个子程序的中部的能力
* 根据行数或者标号调用子程序，从而允许代码从子程序中间的某个位置开始执行
* 具备让应用程序动态生成代码并执行这些代码的能力
	


更多有关[《代码大全 2》的读书笔记](http://tabalt.net/blog/code-complete-2-reading-notes/)，请关注 ：  
[http://tabalt.net/blog/code-complete-2-reading-notes/](http://tabalt.net/blog/code-complete-2-reading-notes/)




