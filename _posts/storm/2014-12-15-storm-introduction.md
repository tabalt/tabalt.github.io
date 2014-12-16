---

layout: post
title:  "分布式的实时流式计算系统storm简要介绍"
date:   2014-12-15 12:30:00
tags: [storm]

keywords: 实时计算介绍,流式计算介绍,storm简介,storm介绍
description: storm是分布式的实时流式计算系统，具有低延迟、高性能、分布式、可扩展、容错性好、不丢失消息、消息严格有序、易于开发应用等特点；本文介绍storm的集群架构、topology以及相关名称解释，并探讨storm的同步和异步应用场景。

---

计算介绍,流式计算介绍,storm简介,storm介绍
description: storm是分布式的实时流式计算系统，具有低延迟、高性能、分布式、可扩展、容错性好、不丢失消息、消息严格有序、易于开发应用等特点；本文介绍storm的集群架构、topology以及相关名称解释，并探讨storm的同步和异步应用场景。

### 一、storm介绍

#### 1、storm集群架构

storm集群架构示意图:

![storm架构总览](/images/storm/overview.jpg)

各组件的功能如下：

* nimbus: master节点，负责将storm应用（topology）的worker调度到合适的supervisor上
* supervisor: 负责启动和运行worker
* zookeeper: 负责存储nimbus和supervisor的状态


#### 2、storm应用（topology）

topology是对spout、bolt、输入输出tuple流、关联关系等的描述，是一个有向无环图（DAG）。

![storm应用topology](/images/storm/topology.jpg)

名词解释：

* spout：消息源，从外部数据源读数据并向bolt发出消息，多个spout可以并联
* bolt：消息的处理逻辑，多个bolt可以串联或并联
* tuple：spout和bolt，bolt和bolt之间传递的消息（数据单元）
* stream grouping：控制着tuple消息如何流动


topology的运行方式：

* topology的一个实例进程叫worker，由supervisor启动和运行
* 一个worker里面可以执行一个或多个线程，叫做executor
* 一个executor执行一个或多个（一般是一个）task
* task分为spout和bolt两种不同类型
* 所有的数据处理和传输都在worker中完成，nimbus和supervisor均不参与


### 二、storm的应用场景

#### 1、同步场景

storm提供了一个分布式的RPC框架：DRPC（Distributed RPC）。在同步场景下，DRPC接收客户端请求，再将数据交给storm集群处理，且DRPC会阻塞请求，直到storm集群返回处理结果才会回复客户端。DRPC提供了HTTP访问接口。

**同步场景示意图：**

    +--------+  -->  +-------------+       +-------+       +------+       +--------+
    | Client |       | DRPC Server |  -->  | Spout |  -->  | Bolt |  -->  | Return |
    +--------+  <--  +-------------+       +-------+       +------+       +--------+
                            ↖_________________________________________________/


**同步应用示例：**

* 图片缩略图生成
* 实时网页下载

#### 2、异步场景

**异步场景示意图：**

                                                                                   _________
    +--------+  -->  +----+       +-------+       +-------+       +-------+       |         |
    | Client |       | MQ |  -->  | Spout |  -->  | Bolt1 |  -->  | Bolt2 |  -->  | Storage |
    +--------+  <--  +----+       +-------+       +-------+       +-------+       |_________| 
                                                                                  

**异步应用示例：**

* 流式日志分析
* 连续计算



