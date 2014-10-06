---

layout: post
title:  "第18章：表驱动法"
date:   2014-10-04 12:30:00
categories: 博文

---

表驱动法是一种从表里面查找信息而不使用逻辑语句（if/case）的编程模式。凡是能通过逻辑语句来选择的事物，都可以通过查表来选择。对于简单的情况，使用逻辑语句更容易和直白，但随着逻辑链的越来越复杂，查表法也越来越显得更具吸引力。




#### 1、使用表驱动法的两个问题

* 怎样从表中查询信息

	* 直接访问
	* 索引访问
	* 阶梯访问

* 应该在表里面存些什么

	* 数据
	* 描述动作的代码
	* 对实现动作的子程序的引用
	

#### 2、直接访问表

直接访问表代替了更为复杂的逻辑控制结构。无需绕圈子就能直接在表里面找到想要的信息。

构造查询键值的方法：

* 复制信息从而能够直接使用键值
* 转换键值以使其能够直接使用
* 把键值转换提取成独立子程序

#### 3、索引访问表

有点时候，只用一个简单的数学运算还无法把数据转换成表键值，这类情况的一部分可以通过使用索引访问的方法。索引表不是直接访问，而是经过居间的索引去访问。

索引访问技术的优点：

* 如果主查询表中的每一条记录都很大，那么创建一个浪费了很多空间的索引数组所用的空间，要比创建一个浪费了很多空间的主查询所有的空间要小得多
* 即使用了索引后没有节省内存空间，操作位于索引中的记录也要比操作位于主表中的记录更方便廉价
* 表查询技术在可维护性上具有的普遍优点，编写到表里面的数据比嵌入代码中的数据更容易维护


### 4、阶梯访问表

阶梯结构的基本想法是表中的记录对于不同的数据范围有效，而不是对不同的数据点有效。这种方法不像索引结构直接，但是要比索引访问节省空间。

使用阶梯技术时要注意的细节：

* 留心断点

	确认循环能在找出最高一级的区间之后恰当的终止，同时确保正确地处理了两边的边界

* 考虑使用二分法查找取代顺序查找

	阶梯访问大列表时顺序查找可能会比较耗时，可以采用二分的方法来提高效率

* 考虑用索引访问来取代阶梯技术

	阶梯方法中的查找操作可能会比较耗时，如果执行速度更重要，可以考虑使用索引访问取代阶梯访问。



更多有关[《代码大全 2》的读书笔记](http://tabalt.net/blog/code-complete-2-reading-notes/)，请关注 ：  
[http://tabalt.net/blog/code-complete-2-reading-notes/](http://tabalt.net/blog/code-complete-2-reading-notes/)



