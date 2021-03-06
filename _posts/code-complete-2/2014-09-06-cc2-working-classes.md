---

layout: post
title:  "第6章：可以工作的类"
date:   2014-09-06 12:30:00
categories: 博文
tags: []

---


类是由一组数据和子程序构成的集合。这些数据和子程序共同拥有一组内聚的、明确定义的职责。类也可以只是一组子程序构成的集合，这些子程序提供一组内聚的服务。

#### 1、类的基础：抽象数据类型（ADTs）

抽象数据类型（abstract data type）是指一些数据以及对这些数据所进行的操作的集合；它能让你像现实世界中一样操作实体，而不必在底层的实现上摆弄实体。抽象数据类型构成了“类/class”概念的基础。

* 使用ADT的益处

	* 可以隐藏实现细节
	* 改动不会影响到整个程序
	* 让接口能提供更多信息
	* 更容易提高性能
	* 让程序的正确性更显而易见
	* 程序更具有自我说明性
	* 无须在程序内到处传递数据
	* 可以让你像现实世界中那样操作实体，而不必在底层实现上操作他
	

#### 2、良好的类接口

创建高质量类的第一步，也是最重要的一步，是创建一个好的接口，创建一个可以通过接口来展现的合理的抽象，并确保细节仍被隐藏在抽象背后。

* 好的抽象

	* 类的接口应该展现一致的抽象层次
	* 一定要理解类所实现的抽象是什么
	* 提供成对的服务
	* 把不相关的信息转移到其他类中
	* 尽可能让接口可编程，而不是表达语义
	* 谨防在修改是破坏接口的抽象
	* 不要添加与接口抽象不一致的公用成员
	* 同时考虑抽象性和内聚性
	
* 良好的封装

	* 尽可能地限制类和成员的可访问性
	* 不要公开爆率成员数据
	* 避免把私用的实现细节放入类的接口中
	* 不要对类的使用者做出任何假设
	* 避免使用友元类
	* 不要因为一个子程序里仅使用公用子程序，就把它归入公开接口
	* 让阅读代码比编写代码更方便
	* 要格外警惕从语义上破坏封装性
	* 留意过于紧密的耦合关系
	
		* 尽可能的限制类和成员的可访问性
		* 避免友元类，因为他们直接是紧密耦合的
		* 在积累中把数据声明为private 而不是protected，以降低派生类和积累之间耦合的程度
		* 避免在类的公开接口中暴露成员数据
		* 要对从语义上破坏封装性保持警惕
		
	
#### 3、有关设计和实现的问题

* 包含是“有一个......” 的关系

	包含表示一个类含有一个基本数据元素或对象。
	
	* 通过包含来实现“有一个/has a” 的关系
	* 在万不得已时通过private继承来实现“有一个”的关系
	* 警惕有超过约7个数据成员的类
	
* 继承是“是一个......” 的关系

	继承是说一个类是另一个类的一种特化，继承的目的在于，通过“定义能为两个或更多个派生类提供共有元素的基类”的方式写出更精简的代码。共有元素可以狮子程序接口、内部实现、数据成员或数据类型等。继承能把共有元素集中在一个基类中，避免在多处出现重复代码。
	
	* 用public来实现“是一个”的关系
	* 要么使用继承并详细说明，要么不使用它
	* 遵循Liskov替换原则
	* 确保只继承需要继承的部分
	* 不要“覆盖”一个不可覆盖的成员函数
	* 把公用的接口、数据及操作放到继承树中尽可能搞的位置
	* 只有一个实例的类是值得怀疑的
	* 只有一个派生类的基类也是值怀疑
	* 派生后覆盖了某个子程序，但在其中没做任何操作，这种情况也值得怀疑
	* 避免让继承体系过深
	* 尽量使用多态，避免大量的类型检查
	* 让所有数据都是private（而非protected）

* 成员函数和数据成员

	* 让类中的子程序的数量尽可能少
	* 禁止隐式的产生你不需要的成员函数和运算符
	* 减少类所谓的不同子程序的数量
	* 对其他类的子程序的间接调用要尽可能的少
	* 一般来说，应尽可能的减小类和类直接的相互合作的范围
	
* 构造函数

	* 如果可能，应该在所有的构造函数中来初始化所有的数据成员
	* 用私有（private）构造函数来强制实现单件属性
	* 优先采用深层复本，除非论证可行，才采用浅层复本
	
	

#### 4、创建类的原因

* 为现实世界中的对象建模
* 为抽象的对象建模
* 降低复杂度
* 隔离复杂度
* 隐藏实现细节
* 限制变动的影响范围
* 隐藏全局数据
* 让参数传递更顺畅
* 建立中心控制点
* 让代码更易于重用
* 为程序族做计划
* 把相关操作包装到一起
* 实现某种特定的重构


#### 5、应该避免的类

* 避免创建万能类
* 消除无关精要的类
* 避免用动词命名的类



更多有关[《代码大全 2》的读书笔记](http://tabalt.net/blog/code-complete-2-reading-notes/)，请关注 ：  
[http://tabalt.net/blog/code-complete-2-reading-notes/](http://tabalt.net/blog/code-complete-2-reading-notes/)



