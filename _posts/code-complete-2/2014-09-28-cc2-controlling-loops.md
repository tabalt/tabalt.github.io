---

layout: post
title:  "第16章：控制循环"
date:   2014-09-28 12:30:00
categories: 博文
tags: []

---


#### 1、选择循环的种类

* 灵活度和检查位置决定了如何对用作控制结构的循环种类进行选择：


	* 计数循环执行的次数是一定的。可能是针对每位雇员执行一次。
	* 连续求值的循环预先并不值得要执行多次，会在每次迭代时检查是否应该结束
	* 无限循环一旦启动就会一直执行下去
	* 迭代器循环对容器类里面的每个元素执行一次操作
	

* 什么时候使用while循环

	* 检测位于循环的开始
	* 检测位于循环的结尾（do-while）

* 什么时候用带退出的循环

	一个带退出循环通常由循环头、循环体（包括终止条件）和循环尾组成，使用场合：把循环条件检测放在循环开始或结束处，需要写出一个半循环。	使用while、break或者goto来实现带退出的循环。

* 何时使用for循环
	
	用for循环来执行那些不需要循环内部控制的简单操作。当循环控制就是简单的递增或者递减，就可以使用for循环。如果存在一个必须使执行从循环中跳出的条件，那就应该用while循环。不要在for循环里，通过直接修改循环下标的形式迫使它终止。

* 何时使用foreach循环

	foreach或其等价物，很适合用于对数组或者其他容器中的各项元素执行遍历操作。


#### 2、循环控制

* 循环可能出现的错误

	* 忽略或错误的对循环执行初始化
	*　忽略了对累加变量或其他与循环有关的变量执行初始化
	*　不正确的嵌套
	*　不正确的循环终止
	*　忽略或者错误地增加了循环变量的值
	*　不正确的循环下标访问数组元素

* 阻止错误发生的方法

	* 减少能影响该循环各种因数的数量
	* 把循环体执行的条件表达清楚
	* 把循环看做一个黑盒子，外围程序只知道他的控制条件，不知道内容

* 进入循环的指导原则

	* 只从一个位置进入循环
	* 把初始化代码紧放在循环前面
	* 用while(true)标示无限循环
	* 在适当的情况下多使用for循环
	* 在while循环更适合的时候，不要使用for循环

* 如何处理循环体

	* 用“{”和“}”把循环中的语句括起来
	* 避免空循环
	* 把循环内务操作要么放在循环的开始，要么放在循环的末尾
	* 一个循环只做一件事

* 退出循环如何处理循环尾

	* 设法确认循环能否终止
	* 使循环终止条件看起来很明显
	* 不要为了终止循环而胡乱改动for循环的下标
	* 避免出现依赖于循环下标最终取值的代码
	* 考虑使用安全计数器
	* 提前退出循环的处理

		* 考虑在while循环中使用break语句而不用布尔标记
		* 小心那些有很多break散布其中的循环
		* 在循环开始出使用continue进行判断
		* 如果语言支持，使用带标号break结构
		* 小心谨慎使用break和continue

* 检查端点

	一个简单循环通常要注意三种情况，开始的情况，任意选择的中间情况，最终的情况；应在脑海里运行这三种循环情况，避免出现off-by-one的错误。

* 使用循环变量的指导原则

	* 用整数或者枚举类型表示数组和循环的边界
	* 在嵌套循环中使用有意义的变量名来提高可读性
	* 用有意义的名字来避免循环下标串话
	* 把循环下标变量的作用域限制在本循环内

* 循环长度衡量的指导原则

	* 循环要尽可能的短，以便能够一目了然
	* 把嵌套限制在三层以内
	* 把长循环的内容移到子程序里


#### 3、由内而外，轻松创建循环

在编写复杂循环是如果遇到麻烦，可以采用从最简单的情况开始由内而外生成代码的简单技巧，确保循环从开始就是正确的。


#### 4、循环和数组的关系

许多情况下，循环就是用来操作数组的，而且循环计数器和数组下标一一对应。
	 



更多有关[《代码大全 2》的读书笔记](http://tabalt.net/blog/code-complete-2-reading-notes/)，请关注 ：  
[http://tabalt.net/blog/code-complete-2-reading-notes/](http://tabalt.net/blog/code-complete-2-reading-notes/)




