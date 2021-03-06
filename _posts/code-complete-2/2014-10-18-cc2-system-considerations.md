---

layout: post
title:  "第6部分：系统考虑"
date:   2014-10-18 12:30:00
tags: []

---


### 第27章 程序规模对构建的影响


#### 1、交流和规模

随着项目成员数目的增加，交流路径的规模也随之增加，且二者的关系是乘性的，即交流路径的调试大致正比于人数的平方。交流路径越多，花在交流上的时间越多，因交流而出错的机会也就越大。改善交流的常用方法是采用正式的文档。


#### 2、项目规模的范围

项目规模的范围很宽，不能把任何一个钟规模视为典型。评估项目规模的方法之一是考虑项目团队的规模。大项目中的用人数量站全部程序员数量的很大比重。


#### 3、项目规模对错误的影响

项目规模既会影响错误的数量，也会影响错误的类型。随着项目规模增大，通常更大一部分错误要归咎于需求和设计。

随着项目规模的增长，错误的数量也会随之显著增长，对于大项目，需要比小项目花更多的经历，才能维持同样的错误率。


#### 4、项目规模对生产率的影响

与项目规模的关系方面，生产率的情况与软件质量很相似。对于小项目，影响生产率的最大因素是单个程序员的技巧，随着项目规模变大，组织方式对生产率的影响也随之增大。

生产率主要取决于你所从事的软件类型、人员素质、编程语言、方法论、产品复杂度、编程环境、工具支持、计算“代数行数”的方法、把非程序员的支持工作计入“每人年的代码行数”的方法，以及其他因素。


#### 5、项目规模对开发活动的影响

* 活动比例和项目规模

	小项目以构建活动为主。更大的项目需要做更多的架构、集成工作和系统测试工作才能成功。

	随着项目规模增加，下面这些活动的工作量增长超过线性：

	* 交流
	* 计划
	* 管理
	* 需求分析
	* 系统功能设计
	* 接口设计和规格说明
	* 架构
	* 集成
	* 消除缺陷
	* 系统测试
	* 文档生成

* 程序、产品、系统和系统产品

	代码行数和团队规模并不是影响项目大小的仅有因素。另一个更敏感的影响因素是最终软件的质量和复杂度。
	
	没能认识到程序、产品、系统以及系统产品在精致度和复杂度的区别，是导致估算出偏差的常见原因。
	
	
* 方法论和规模

	有些方法论是很宽松的，程序员察觉不到自己正在使用它。形式化的方法不一定总是有趣，而且如果用得不合适也可能得不偿失。
	
	放大轻量级的方法论要好于缩小重量级的方法论。最有效的办法是使用适量级的方法论。
	
	
	
### 第28章 管理构建


#### 1、鼓励良好的编码实践

* 设定标准的考虑事项
* 鼓励良好的编码实践的技术

	* 给项目的每一部分分派两个人
	* 逐行复查代码
	* 要求代码签名
	* 安排一些好的代码示例供人参考
	* 强调代码是共有财产
	* 奖励好代码
	
		* 所给与的奖励应该是程序员想要的
		* 只有非常出色的代码才应得到奖励
		
	* 一份简单的标准
	
		管理者必须能阅读并理解项目里的所有代码
		
	
#### 2、配置管理


* 什么是配置管理

	配置管理是“系统化地定义项目工件和处理变化，以使得项目一直保持其完整性”。也叫变更控制，其中的技术包括评估所能提交的更改，追踪更改，保留系统在不同时间点点的各历史版本。
	
	配置管理对程序员特别有用，软件项目中的配置管理通常称作“软件配置管理”（scm），scm关注于程序的需求、源代码、文档和测试数据。


* 需求变更和设计变更

	控制设计变更的指导原则：

	* 遵循某种系统化的变更控制手续
	* 成组地处理变更请求
	* 评估每项变更的成本
	* 提防大量的变更请求
	* 成立变更控制委员会或者类似结构
	* 警惕官僚主义，但也不要因为害怕官僚主义而排斥有效的变更控制

* 软件代码变更

	配置管理的另一项内容是源代码控制。使用能够记录源代码的各个版本的版本控制工具可以轻松的管理代码。
	
	版本控制的益处：
	
	* 别人正则修改某一文件的同时，你修改这个文件不会和他发生冲突
	* 你能方便地将你机器上的全部项目文件的复本更新到当前版本
	* 你可以回溯到任何文件的任意版本，只要它曾经被check in到版本控制系统
	* 你可以获得一份对任何文件的任意版本所做更改的清单
	* 你无须担心个人文件备份，因为版本控制软件提供了安全保障
	
* 工具版本
* 机器配置
* 备份计划


#### 3、评估构建进度表


* 评估的方法

	* 建立目标
	* 为评估留出时间，并且做出计划
	* 清楚地说明软件需求
	* 在底层细节层面进行评估
	* 使用若干不同的评估方法，并且比较其结果
	* 定期做重新评估
	
* 评估构建的工作量

	构建能给项目进度造成多大范围的影响，部分地取决于“构建”在项目中所站的比例。构建所占比例随着项目规模而变化。
	
* 对进度的影响

	对软件项目进度影响最大的是所开发的程序的规模。
	
	影响软件开发进度，但不易被量化的因素：
	
	* 需求开发者的经验和能力
	* 程序员的经验和能力
	* 团队的动力
	* 管理的质量
	* 重用的代码数量
	* 人员流动性
	* 需求变更
	* 客户关系的质量
	* 用户对需求的参与度
	* 客户对此类应用软件的经验
	* 程序员对需求开发的参与程度
	* 计算机、程序和数据的分级安全环境
	* 文档量
	* 项目目标
	
* 评估与控制
* 如果你落后了该怎么办

	* 希望自己能赶上
	* 扩充团队
	* 缩减项目范围
	

#### 4、度量


* 任何一种项目特征都是可以用某种方法来度量的，而且总会比根本不度量要好得多
* 留心度量的副作用
* 反对度量就是认为最好不要去了解项目中到底在发生什么


#### 5、把程序员当人看

* 程序员们怎么样花时间
	
	程序员不仅在编程上画时间，也要花时间去开会、培训、阅读邮件以及纯粹思考
	
* 性能差异与质量差异

	不同程序员在天分和努力程度方法的差别十分巨大。不论是个人还是团队，在软件质量和生产率上都存在着相当大的差异。
	
* 信仰问题

	* 编程语言
	* 缩进风格
	* 大括号的摆放位置
	* 所用的集成开发环境
	* 注释风格
	* 效率与可读性的取舍
	* 对方法的选择
	* 编程工具
	* 命名习惯
	* 对goto的使用
	* 对全局变量的使用
	* 量度，特别是有关生产力的量度，如每天编写的代码行数
	
	
	控制程序员的某些信仰是，需要考虑的点：

	* 要清楚的指导你是在处理一个敏感问题
	* 对这些领域要使用“建议”或者“指导原则”
	* 避免流露明显的意图
	* 让程序员们定制他们自己的标准
	
* 物理环境

物理环境对生产力有着巨大的影响。在生产力与工作场所质量直接有着很强的相关性。


#### 6、管理你的管理者

* 把你希望做什么的念头先藏起来，等着你的管理者组织一场有关你希望做什么的头脑风暴/集体讨论
* 把做事情的正确方法传授给你的管理者，并持之以恒做这项工作
* 关注你的管理者的兴趣，按照他的真正意图去做，而不要用一些不必要的实现细节来分散其注意力
* 拒绝按照你的管理者所说的去做，坚持用正确的方法做自己的事
* 换工作



### 第29章 集成


#### 1、集成方式的重要性

周到的集成能获得的好处：

* 更容易诊断缺陷
* 缺陷更少
* 脚手架更少
* 花费最少的时间获得第一个能工作的版本
* 更短的整体开发进度表
* 更好的顾客关系
* 增强士气
* 增加项目完成的机会
* 更可靠地估计进度表
* 更准确的现状报告
* 改善代码质量
* 较少的文档


#### 2、集成频率-阶段式集成还是增量集成

* 阶段式集成

	* 设计、编码、测试、调试各个类
	* 将这些类组合成一个庞大的系统
	* 测试并调试整个系统
	
	阶段式集成的一个问题是，当第一次把系统中的类放在一起时，新的问题会不可避免的大量浮现。问题的不确定性和所有问题一下子出现，会让程序员进入惊慌失措的“调试状态”而不能有条理的检测并纠正错误。
	
	
* 增量集成

	* 开发一个小的系统功能组件
	* 设计、编码、测试、调试某个类
	* 将这个新的类集成到系统骨架上
	
	增量集成有助于项目增长，也叫滚雪球式集成。
	
* 增量集成的益处

	* 易于定位错误
	* 及早在项目里取得系统级的成果
	* 改善对进度的监控
	* 改善客户关系
	* 更加充分地测试系统中的各个单元
	* 能在更短的开发进度计划内建造出整个系统
	

#### 3、增量式集成的策略


* 自顶向下集成

	首先编写并集成位于层次体系顶部的类，最后加入底部的类。
	
	自顶向下集成的优点有：能相对较早的测试系统的控制逻辑、能在项目早期就完成一个能部分工作的系统、能让你在完成底层的设计细节之前就开始编码。
	
	纯粹的自顶向下集成具有令人难以容忍的缺点：将棘手的系统接口的演练留到最后才执行，无法尽早的处理系统接口bug、性能问题。

* 自底向上集成

	首先编写位于底部的类。
	
	自顶向上的问题在于将重要的高层系统接口的集成工作留到最后进行，如果系统存在高层概念设计问题，那么再做完所有细节工作之后才能发现他，会造成很多底层工作变成需要丢弃的。

* 三明治集成

	首先集成顶层类和底层类，然后集成中间层。

* 风险导向的集成

	风险导向集成也称为困难不见有限集成法，首先要鉴别各个类对应的风险级别，确定哪些部件实现起来是最有挑战的，然后实现它。与三明治集成类似，也是试图避免纯粹的自顶向下或自底向上的问题。

* 功能导向的集成

	以一组构成一项可确认功能的类为单位进行集成，通常“但不总是”一次集成多个类。

* T-型集成

	选定某个特定的竖直块，对它尽早开发和集成。建造并集成一个直插到底的块，以验证架构的假设，然后建造并集成系统的挑大梁部件，为开发余下功能提供一个框架。
	
	
#### 4、Daily Build 与冒烟测试


每天将各个源文件编译、链接成可执行程序，然后对这个程序进行相对简单的检查，看看产品在运行时是否“冒烟”。


Daily Build 与冒烟测试的优点

* 降低了低质量的风险，这是一种与“不成功的集成”或“问题多多的集成”相关的风险
* 便于诊断缺陷
* 能提高士气
* 使一些看不见的工作浮出水面

使用Daily Build 的详情

* 每日构建
* 检查失败的build
* 每天进行冒烟测试
* 让冒烟测试与时俱进
* 将Daily Build 与冒烟测试自动化
* 成立build小组
* 仅当有意义时，才将修订加入build中
* 别等太久才将修订加入进来
* 要求开发人员在将代码加入到系统之前，进行冒烟测试
* 为即将添加到build的代码准备一块暂存区
* 惩罚破坏build的人
* 在早上发布build
* 即使有压力，也要进行Daily Build 与冒烟测试



### 第30章 编程工具


#### 1、设计工具

目前的设计工具主要是那些“能创建设计图表”的图像化工具。图形化的设计工具通常能让你使用标准的图形符号来表述你的设计，包括UML、架构方块图、集成体系图、实体关系图、类图等。

从一个角度看，这些设计工具都只不过是华丽的绘图软件包。使用简单的图形软件或者纸和笔也能回执该工具所能绘制的一切事物。但是这些工具提供了简单工具所部具备的颇有价值的功能，如删除后自动重新安排、处理各种琐事、检查设计的一致性，甚至根据设计产生源代码。


#### 2、源代码工具


* 编辑代码

	* 集成开发环境（IDE）
	
		* 在编辑器中进行编译和错误检测
		* 与源代码控制工具、build工具、测试工具、调试工具集成
		* 显示程序的扼要视图或者大纲视图
		* 跳转到类的定义、子程序定义、变量定义处
		* 跳转到使用某个类、子程序、变量的全部位置
		* 针对特定语言的格式安排
		* 针对正在编辑语言的交互式帮助
		* 花括号匹配
		* 常用语言的结构模板
		* 智能缩进
		* 自动化的代码转换或重构
		* 可以用熟悉的编程语言进行宏编程
		* 列出查找的字符串，使常用的字符串无需重新键入
		* 在查找和替换是可以使用正则
		* 同时编辑多个文件
		* 双列式diff对比
		* 多级编辑动作撤销
		
	* 针对多个文件的字符串查找和替换
	* diff工具
	* merge工具
	* 源代码美化器
	* 生成接口文档的工具
	* 模板
	* 交叉引用工具
	* 类的集成体系生成器
	
	
* 分析代码质量

	* 吹毛求疵的语法/语义检查器
	* 尺度报告器
	
* 重构源代码

	* 重构器
	* 结构改组工具
	* 代码翻译器
	
* 版本控制

	* 源代码控制
	* 依赖关系控制
	* 项目文档的版本控制
	* 将项目的工件关联到一起，发生需求变更时，能找出受影响的代码和test cases
	
* 数据字典

	数据字典是描述项目中所有重要数据的数据库。
	

#### 3、可执行码工具

* 产生目标码

	* 编译器与链接器
	* build工具
	* 程序库
	
		* 容器类
		* 信用卡交易服务
		* 跨平台的工具
		* 数据压缩工具
		* 数据结构与算法
		* 数据库操作工具和数据文件操控工具
		* 图解/图示/图标工具
		* 图像工具
		* 许可证管理器
		* 数学运算
		* 网络与互联网通信工具
		* 报表生成器与报表查询生成器
		* 安全与加密工具
		* 电子表格和数据网格工具
		* 文本与拼写工具
		* 语言、电话与传真工具
		
	* 代码生成向导
	* 安装
	* 预处理器
	
* 调试

	* 编译器的警告信息
	* 测试用的脚手架
	* diff工具
	* 执行剖测器
	* 追踪监视器
	* 交互式调试器
	

* 测试

	* 自动测试框架
	* 自动化的测试生成器
	* 测试用例的记录和回放工具
	* 覆盖率监视器
	* 符号调试器
	* 系统扰动器
	* diff工具
	* 脚手架
	* 缺陷注入工具
	* 缺陷跟踪软件
	
	
* 代码调整

	* 执行剖测器
	* 汇编代码清单和反汇编
	
	
#### 4、工具导向的环境

某些环境更适合于“工具导向”的编程。unix环境因此而得名，它又一堆彼此配合很好的小工具：grep、diff、sort、make、crypt、tar、line、ctags、sed、awk、vi等

cygwin提供了能在windows下使用“UNIX工具的等价物”。

#### 5、打造自己的编程工具

* 项目特有的工具

	大多数中型和大型的项目需要独特的项目专用工具，如生成某种特定中各类的测试数据的工具。

* 脚本

	脚本是一种能自动执行重复性杂务的工具。在某些系统中，脚本也成为“批处理文件”或“宏”。
	
	
#### 6、工具幻境

软件工业界不断的开发出新的工具，用于减少或消除编程过程中某些最单调乏味的工作的数量。这些进步都对计算机编程产生了价值可观、增量式的改进。但是没有哪项改革成功的消除了编程。

从本质而言，编程从根本上说就是困难的，即便有号的工具支援。
	




更多有关[《代码大全 2》的读书笔记](http://tabalt.net/blog/code-complete-2-reading-notes/)，请关注 ：  
[http://tabalt.net/blog/code-complete-2-reading-notes/](http://tabalt.net/blog/code-complete-2-reading-notes/)




