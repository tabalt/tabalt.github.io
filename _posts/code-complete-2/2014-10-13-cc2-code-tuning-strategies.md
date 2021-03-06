---

layout: post
title:  "第25章：代码调整策略"
date:   2014-10-13 12:30:00
categories: 博文
tags: []

---


#### 1、	性能概述

代码调整只是提高程序性能的一种方法，除此之外，你还可以找到提高性能的其他方法，这些方法能让你以更少的时间和对代码更少的负面影响来实现你的目标。

* 质量特性和性能

	性能同代码速度之间存在着很松散的联系。只关注代码的运行速度会顾此失彼。过分强调速度，程序的整体性能（表现）常常不升反降。

* 性能和代码调整

	效率的思考方面：

	* 程序需求

		在花时间处理一个性能问题之前，请确保是在处理一个确实需要解决的问题。	

	* 程序的设计

		设计架构时，有限考虑整体性能，再为单个子系统、特征和类设置要达到的资源占用模板。好处有：

		* 设置单独的资源占用目标将使得系统的最终性能可预测。
		* 把这些目标描述的越明确，越有可能来使子系统满足这些指标
		* 尽管有些目标无法直接实现高效率，但长远来看能促进效率提升
	
	* 类和子程序的设计

		选择合适的数据类型和算法将对性能产生重要影响，因为这两者通常会同时影响程序的内存占用和执行速度。
		
	* 程序同操作系统的交互

		和操作系统的低效臃肿的子程序交互，会使得程序性能不尽如人意。

	* 代码编译

		优秀的编译器能将清晰的高级语言代码转换成经过优化的机器码

	* 硬件

		有时候最有效的提示程序性能的方法就是购买新的硬件设备。		

	* 代码调整

		对正确代码进行调整，使得代码的运行更加高效。


#### 2、代码调整简介

代码调整受青睐的原因：

* 调整几行代码就能将程序运行时间大大缩短，给程序员们带来不可思议的成就感
* 掌握编写高效代码的这门艺术是称为眼熟意义上程序员所需的加冕仪式

高效的代码并不一定就是最好的代码：

* Pareto法则

	Pareto也就是众所周知的80/20法则，他讲述的是你可以用20%的努力取得80%的成效。

* 一些无稽之谈

	* 高级语言中，减少代码行数就可以提升所生成的机器代码的运行速度，或减少资源占用
	* 特定运算可能比其他的快，代码规模也较小
	* 应当随时随地的进行优化

		* 几乎不可能在程序所有功能都运转之前确定程序的性能瓶颈
		* 在极少数情况下，程序员能正确确定出程序的瓶颈
		* 最初的开发阶段，把目光集中在优化上会干扰对其他程序目标的理解和判断
		
	* 程序的运行速度同其正确性同等重要
 

* 何时调整代码

	程序员应该使用高质量的设计，把程序编写正确，使之模块化并易于修改，让后期的维护工作变得很容易。在程序已经完成并正确之后，再去检查系统的性能。

* 编译器优化

	如今的编译器的优化功能非常强大。每一种编译器都拥有和别的编译器所不同的优势和弱点。请比较不同编译器在你程序上所体现的优化性能。


#### 3、蜜糖和哥斯拉


* 常见的低效之源

	* 输入/输出操作
	* 分页（内存页面切换）
	* 系统调用

		替换系统调用的方法：
		
		* 编写自己的服务程序
		* 避免进入系统
		* 尝试同系统软件商沟通，让他们把你所需的调用修改得更快
	
	* 解释型语言
	* 错误

* 常见操作的相对效率

绝大部分常用操作所耗费的时间相差无几，成员函数调用、赋值、整形运算、浮点运算等等之间都差不多。


#### 4、性能测量

由于程序中某些一小部分常常会耗费同自己体积不成比例的运算时间，所以你应当测量代码性能，找出代码中的热点。一旦发现这样的区域并对该处代码进行了游湖啊，就再一次进行测量，看到到底有多少改进。经验对性能优化没有太大帮助。

性能测量应当精确，应该采用性能剖测工具或者使用系统时钟和函数来记录运算操作所耗费的时间。


#### 5、反复调整

一旦确定了性能瓶颈，你一定会为自己通过代码调整获得的代码性能提升吃惊不已。尽管几乎不可能从一种方法中获得10倍的性能改进，但可以将多种方法有效的结合起来，在优化时应当反复尝试，知道发现有用的方法。


#### 6、代码调整方法总结

* 用设计良好的代码来开发软件，从而使程序易于理解和修改
* 如果程序性能很差

	* a、保存代码的可运行版本
	* b、对系统进行分析测量，找出特点
	* c、判断性能拙劣是否源于设计、数据类型或算法上的缺陷，确定是否应该做代码调整，如果不是，请调回第一步
	* d、对步骤c中所确定的瓶颈代码进行调整
	* 每次调整后都对性能提升进行测量
	* 如果调整没有改进代码的性能，就恢复代码到a步骤保存的代码

* 重复上条步骤



更多有关[《代码大全 2》的读书笔记](http://tabalt.net/blog/code-complete-2-reading-notes/)，请关注 ：  
[http://tabalt.net/blog/code-complete-2-reading-notes/](http://tabalt.net/blog/code-complete-2-reading-notes/)




