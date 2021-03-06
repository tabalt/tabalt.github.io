---

layout: post
title:  "第2章：重注时效的途径"
date:   2014-11-08 12:30:00
tags: []

keywords: 重注时效的途径,重注时效的途径读书笔记
description: 《程序员修炼之道》第2章重注时效的途径读书笔记

---


### 7、重复的危害

可靠的开发软件，让我们的开发更易于理解和维护的唯一途径，是遵循DRY原则：系统中的每一项只是都必须具有单一、无歧义、权威的表示。

`不要重复你自己`

DRY原则是注重实效的程序员的工具箱里最重要的工具之一。


**重复是怎么发生的？**

* 强加的重复

	项目标准可能要求建立含有重复信息的文档，或是重复代码中的信息的文档。多个目标平台各自需要自己的编程语言、库以及开发环境，使我们重复共有的定义和过程。编程语言自身要求某些重复信息的结构。

	强加重复的一些应对技术：
	
	* 信息的多种表示
	
		编写简单的过滤器或代码生成器，根据公共的元数据表示构建多种语言下的结构。
	
	* 代码中的文档
	
		糟糕的代码才需要许多注释。低级的知识放在代码中，注释保留给其他的高级说明。
		
	* 文档与代码
	
		文档和代码中都含有同一知识的表示，在工期紧张的时候，往往会推迟文档更新。
		
	* 语言问题
	
		许多语言会在源码中强加可观的重复，且往往没有简单的技术可用于克服这些重复。有些开发环境通过自动生成头文件，隐藏了对头文件的需要，部分的解决这个问题。
		

* 无意的重复

	有时重复来自错误的设计。在开发过程中，可以因为性能远远而选择违反DRY原则。

* 无耐性的重复

	每个项目都有时间压力，驱使我们中最优秀的人走捷径。“欲速则不达”，无耐性的重复是一种容易检测和处理的重复形式，但那需要你接受训练，并愿意为避免以后的痛苦而预先花一些时间。

* 开发者之间的重复

	或许最难检测和处理的重复发生在开发者之间。在高层，通过清晰的设计、强有力的项目领导以及在设计中进行得到了充分理解的责任划分，对这个问题进行处理。
	
	模块层的重复更隐蔽，鼓励开发者互相进行主动的交流、阅读他人的代码与文档。
	
	`让复用变得容易`
	
	要营造一种缓解，在其中找到并复用已有的东西，比自己编写更容易，如果不容易，大家就不会去复用。
	
	
	
### 8、正交性

**什么是正交性**

如果你想要制作易于设计、构建、测试以及扩展的系统，正交性是一个十分关键的概念。计算机技术中，正交性用于表述某种不相依耐性或是解耦性。如果两个或更多事物中的一个花生变化，不会影响其他事务，这些事物就是正交的。


**正交系统的好处**

非正交系统的改变与控制更复杂是其固有的特性。当任何系统的各组件互相高度依赖时，就不再有局部修正这样的事情。


``消除无关事物之间的影响``

我们想要设计独立、具有单一、良好定义的目的的自足组件。编写正交系统的好处：

* 提高生产率

	* 改动得以局部化，开发时间和测试时间得以降低
	* 正交的途径还能够促进复用
	* 对正交的组件进行组合，生产率会有相当微妙的提高

* 降低风险

	* 正交的途径能降低任何开发中固有的风险
	* 有问题的代码区域被隔离开来
	* 所得系统更健壮
	* 正交系统很可能能得到更好的测试
	* 你不会与特定供应商、产品或是平台绑定在一起
	

**项目团队**

有些项目团队很有效率，每个人都知道要做什么，并全力做出贡献。而另一些团队的成员却老是在争吵，而且好像无法避免互相妨碍，这常常是一个正交性问题。

如果团队的组织有许多重叠，各个成员就会对责任感到困惑。可以对项目团队的正交性进行非正式的衡量，只要看一看，在讨论每个所需改动时，需要设计多少人，人数越多，团队的正交性就越差。


**设计**

系统应该由一组互相协作的模块组成，每个模块都实现不依赖于其他模块的功能。对于正交设计，有一种坚定的测试方法，设计好组件后，问问自己，如果显著的改变某个特定功能背后的需求，有多少模块会受到影响？ 正交系统中，答案是一个。


**工具箱与库**

在引入第三方工具箱和库时，要注意保持系统的正交性，更明智地选择技术。


**编码**

每次编写代码，都有降低正交性的风险，下面是用于维持正交性的技术：

* 让你的代码保持解耦
* 避免使用全局数据
* 避免编写相似的函数


**测试**

正交地设计和实现的系统也更易于测试，因为系统个各组件建的交互是形式化和有限的，更多的系统测试可以在单个的模块级进行。

构建单元测试本身是对正交性的一项有趣的测试。修正bug也是评估整个系统的正交性的好时候。


**文档**

正交性也适用于文档，其坐标轴是内容和表现形式。真正正交的文档，你应该能显著的改变外观，而不用改变内容。


**认同正交性**

正交性与DRY原则紧密相关。运用DRY原则，你是在寻求使系统中的重复将至最小；运用正交性原则，你可以降低系统的各组件间的相互依赖。开发的系统会变得更为灵活、易于理解、调试、测试和维护。


### 9、可撤销性

要实现某种东西，总有某种不止一种方式，而且通常有不止一家供应商可以提供第三方产品。如果你参与的项目被短视的、认为只有一种实现方式的观念所牵绊，你也许就会遇到扔人不悦的意外之事。


**可撤销性**

错误在于假定决策是浇筑在石头上的，同时还在于没有为可能出现的意外事件做准备。要把决策视为卸载沙滩上的，而不要把它们刻在石头上，大浪随时可能到来，把它们抹去。

`不存在最终决策`

**灵活的架构**

设法保持代码的灵活性，考虑维持架构、部署以及供应商集成等领域的灵活性。把项目的某些部分与开发语言或者平台的变化隔离开来，把第三方产品隐藏在定义良好的抽象接口后面。


### 10、曳光弹

当你构建从未构建过的东西时，与枪手一样，设法在黑暗中击中目标。注重实效的程序员往往喜欢使用曳光弹。


**在黑暗中发光的代码**

曳光弹行之有效，是因为他们与真正的子弹在相同的环境、相同的约束下工作，它们快速飞向目标，枪手可以得到即时的反馈，从实践角度，这样的解决方案也更便宜。

为了在代码中获得同样的效果，我们要找到某种东西，让我们能快速、直观和可重复地从需求出发，满足最终系统的某个方面的要求。

`用曳光弹找到目标`

曳光弹并非用过就扔的代码，你编写它，是为了保留它，它含有任何一段产品代码都拥有的完整的错误检查、结构、文档以及自查，只不过功能不全而已。

**曳光代码方法的优点**

* 用户能够及早看到能工作的东西
* 开发者构建了一个他们能在其中工作的结构
* 你有了一个集成平台
* 你又了可用于演示的东西
* 你将更能够干净到工作进展


**曳光弹并非总能集中目标**

曳光弹告诉你击中的是什么，但那不一定总是目标于是你调整准星，直到完全集中目标为止。曳光代码也是如此，如果最初的几次尝试错过了目标，找出怎样改变已有的东西，让其更接近目标的方法，并且为你使用了一种简约的开发方法而感到高兴。


**曳光代码 vs. 原型制作**

曳光代码和原型制作有区别，原型是要探究最终系统的某些具体方面，曳光代码方法处理的是不同的问题，向用户演示实际的交互是怎么样的，同时还想要给出一个架构骨架，开发者可以在其上增加代码。

原型制作是生产用过就扔的代码，曳光弹虽然简约，但却是完整的，并且构成了最终系统的骨架的一部分。

可以把原型制作视为在第一发曳光弹反射之前的侦查和情报搜集工作。


### 11、原型与便笺

**应制作原型的事物**

* 架构
* 已有系统中的新功能
* 外部数据的结构或内容
* 第三方工具或组件
* 性能问题
* 用户界面设计


**怎样使用原型**

构建原型时，可以忽略的细节：

* 正确性
* 完整性
* 健壮性
* 风格


**制作架构原型**

* 主要组件的责任是否得到了良好定义，是否适当
* 主要组件间的协作是否得到了良好定义
* 耦合是否得以最小化
* 你能否确定重复的潜在来源
* 接口定义一和各项约束是否可接受
* 每个模块在执行过程中是否能访问到其所需的数据

**怎样不使用原型**

对于不知道那只是原型的人，原型可能会具有欺骗性的吸引力。必须非常清楚的，这些代码是用过就扔的，不完整也不可能完整。

如果你所在的环境或文化中，原型代码很有可能被误解，也许最好还是采用曳光弹方法。


### 12、领域语言

计算机语言会影响你思考问题的方法，以及你看待交流的方式。每种语言都含有一系列的特性，这些特性都在提示或遮蔽特定的解决方案。问题领域的编程语言也可能会提示出编程方案。


`靠近问题领域编程`

应考虑让你的项目更靠近问题领域，通过在更高层次上编码获得专心解决领域问题的自由，并且可以忽略琐碎的实现细节。


**实现小型语言**

在最简单的情况下，小型语言可以采用面向行的、易于解析的格式。

* 数据语言与命令语言

	数据语言产生某种形式的数据结构给应用使用。这些语言常用于表示配置信息。
	
	命令语言被实际执行，包含语句、控制结构以及类似的东西。
	
* 独立语言与嵌入式语言

	要发挥作用，小型语言无序由应用直接使用。可以使用规范语言创建各种由程序自身编译、读入或用于其他用途的制品。
	
	把高级语言直接嵌入你的应用是一种常见做法，它们会在你的代码运行时运行。通过改变应用读取的脚本，可以改变应用的行为，而不用编译，显著地简化动态的应用领域中的维护工作。
	
* 易于开发还是易于维护

	权衡要素是可扩展性与维护。解析真正的语言所需的代码可能更难编写，但它却容易被人理解得多，且扩展新特性、新功能也容易得多。
	
	

### 13、估算

通过学习估算，并将此技能发展到你对事物的数量级有直觉的程度，你就能展现出一种魔法般的能力。

`估算，以避免发生意外`


**多准确才算准确**

在某种程度上，所有的解答都是估算，只不过有一些要比其他的更准确。你使用的单位会对结果造成影响，要选择能反映你想要传达的精度的单位。

**估算来自哪里**

* 理解提问内容
* 建立系统的模型
* 把模型分解成组件
* 给每个参数指定值
* 计算答案
* 追踪你的估算能力

**估算项目进度**

* 检查需求
* 分析风险
* 设计、实现、集成
* 向用户确认

`通过代码对进度表进行迭代`


**在被要求进行估算时说什么**

“我待会回答你”

放慢估算的速度，并花一点时间仔细检查我们在这一节描述的步骤，几乎总能得到更好的结果。




更多有关[《程序员修炼之道》的读书笔记](http://tabalt.net/blog/the-pragmatic-programmer-reading-notes/)，请关注 ：  
[http://tabalt.net/blog/the-pragmatic-programmer-reading-notes/](http://tabalt.net/blog/the-pragmatic-programmer-reading-notes/)