---

layout: post
title:  "第20章：软件质量概述"
date:   2014-10-06 12:30:00
categories: 博文
tags: []

---


#### 1、	 软件质量的特性

软件同时拥有外在的和内在的质量特性，外在特性指的是该产品的用户所能够感受到的部分，包括下列内容：

* 正确性
* 可用性
* 效率
* 可靠性
* 完整性
* 适应性
* 精确性
* 健壮性

程序员除了关注软件质量的外在特性外，还需要关注它的内在特性：

* 可维护性
* 灵活性
* 可移植性
* 可重用性
* 可读性
* 可测试性
* 可理解性

外在特性和内在特性并不能完全割裂开来，因为在某些层次上，内在特性会影响某些外在特性。要让所有的特性都表现得尽善尽美是不可能的，需要根据一组互相竞争的目标寻找出一套优化的解决方案。


#### 2、改善软件质量的技术

软件质量中的要素：

* 软件质量目标
* 明确定义质量保证工作
* 测试策略
* 软件工程指南
* 非正式技术复查
* 正式技术复查
* 外部审查


有质量保证的开发流程：

* 对变更进行控制的过程
* 结果的量化
* 制作原型

设置目标

明确设置质量目标是开发高质量软件的一个简单而清晰的步骤。


#### 3、不同质量保障技术的相对效能

* 缺陷检测率 

	某些方法在检测缺陷方面比其他方法更有效。不同方法能找出不同类型的缺陷。测定所找到的缺陷占该项目当时所有存在缺陷的百分比是评估各种缺陷检测方法的一种途径。采用多种缺陷检测方法联合作战，效果比某种方法单打独斗要好。

* 找出缺陷的成本

	某些缺陷检测方法的成本要比其他的方法高，最经济的方法是找出缺陷的成本最低，而在其他方面同别的方法并无二致。

* 修正缺陷的成本

	一个缺陷存在的时间越长，消除它的代价越高昂，因此能够尽早发现错误的检测方法可以降低修正缺陷的成本。
	
	
#### 4、什么时候进行质量保证工作

错误越早引入到软件中，问题就越复杂，修复代价也越高。尽早捕捉错误才能有效地节省成本。缺陷可能在任何阶段渗透到软件中，因此，需要在早期阶段就开始强调质量保证工作，并且将其贯彻到项目的余下部分。



#### 5、软件质量的普遍原理


提高生产效率和改善质量的最佳途径是减少花在代码返工上的时间，无论返工是由需求、设计改变还是调试引起的。

软件领域的质量保证是面向过程的，软件开发与传统制造业不一样，这里不存在会影响最终产品的重复阶段，因此最终产品的质量受到开发软件所用的过程的控制。



更多有关[《代码大全 2》的读书笔记](http://tabalt.net/blog/code-complete-2-reading-notes/)，请关注 ：  
[http://tabalt.net/blog/code-complete-2-reading-notes/](http://tabalt.net/blog/code-complete-2-reading-notes/)




