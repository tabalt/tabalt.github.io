---

layout: post
title:  "Kubernetes(k8s) 快速上手学习入门教程"
date:   2020-05-25 00:30:00
excerpt: Kubernetes(k8s) 快速上手学习入门教程
tags: [Kubernetes]

keywords: Kubernetes
description: Kubernetes(k8s) 快速上手学习入门教程

---


### 什么是Kubernetes

Kubernetes是一个用于管理容器化服务的便于声明式配置和自动化的可扩展的开源平台，提供 容器的自动部署和回滚、自我修复、服务发现和负载均衡、存储编排、密钥与配置管理、内存和CPU资源限制 等功能。


### Kubernetes(k8s) 集群结构

Kubernetes(k8s) 集群由以下组件构成：

* **控制平面组件**，对集群进行全局决策（如调度）并检测和响应集群事件（如调整pod副本数量）。这些组件可在集群中任何节点运行，但为了简单通常会在一个（或多个）节点上启动所有组件，且这些节点上不运行用户容器
    * etcd：一致性和高可用性的键值数据库，保存所有集群数据，需要考虑数据的备份
    * kube-apiserver：提供 API 服务，是 Kubernetes 控制面的前端，通过部署多个可实现扩缩  
    * kube-scheduler：监视新创建的未指定运行节点的 Pod，并选择节点让 Pod 在上面运行
    * kube-controller-manager：控制器管理器，包含以下控制器：
        * 节点控制器（Node Controller）: 负责在节点出现故障时进行通知和响应
        * 副本控制器（Replication Controller）: 负责为系统中的每个副本控制器对象维护正确数量的 Pod
        * 端点控制器（Endpoints Controller）: 填充端点(Endpoints)对象(即加入 Service 与 Pod)
        * 服务帐户和令牌控制器（Service Account & Token Controllers）: 为新的命名空间创建默认帐户和 API 访问令牌
    * cloud-controller-manager：云控制器管理器，以下控制器具有云提供商依赖性：
        * 节点控制器（Node Controller）: 用于检查云提供商以确定节点是否在云中停止响应后被删除
        * 路由控制器（Route Controller）: 用于在底层云基础架构中设置路由
        * 服务控制器（Service Controller）: 用于创建、更新和删除云提供商负载均衡器
        * 数据卷控制器（Volume Controller）: 用于创建、附加和装载卷、并与云提供商进行交互以编排卷

* **节点组件**，在每个节点上运行，维护运行的 Pod 并提供 Kubernetes 运行环境

    * kubelet：接收PodSpecs，确保描述的容器处于Pod中运行且健康
    * kube-proxy：网络代理，维护节点上的网络规则，以允许从集群内部或外部的网络会话与 Pod 进行网络通信
    * Container Runtime：负责运行容器的软件，如Docker、containerd，每个节点上都运行

* **其他组件**
    
    * DNS：为 Kubernetes 服务提供DNS记录
    * Dashboard：管理集群的WEB UI
    * 容器资源监控：将容器的常见时间序列度量值保存到数据库（如Prometheus），并提供浏览数据的界面
    * 集群层面日志：将容器的日志数据保存到一个集中的日志存储，并提供搜索和浏览接口

控制平面组件和节点组件的关系结构如下图所示：

![Kubernetes(k8s) 组件结构](/images/k8s/components-of-kubernetes.png)


### Kubernetes(k8s) 常见概念

* 节点（Node）：执行工作的机器，可以是虚拟机或者物理机，每个节点都部署了所有节点组件
* 镜像与容器：和Docker中相关概念一致
* Pod： 应用程序的基本执行单元，封装了应用程序容器（单个或紧密耦合并共享资源的少量个）、存储资源、唯一网络 IP 以及控制容器应该如何运行的选项，一个应用可以有多个称为副本的Pod实例
* 对象：用来表示整个集群的期望状态的持久化实体，系统将持续工作以确保对象存在，可通过.yaml 文件描述对象的规约，包含如下信息：
    * 名称等基本信息，相同类型的对象不能重名，系统还会给每个对象生成称为UID的唯一标识字符串
    * 哪些容器化应用在运行（以及在哪个 Node 上）
    * 可以被应用使用的资源
    * 关于应用运行时表现的策略，比如重启策略、升级策略，以及容错策略
* 命名空间：在多个用户之间划分资源实现虚拟集群，资源名称需在命名空间内唯一，每个资源只能在一个命名空间中，命名空间不能嵌套
* 控制器（Controller）：通过 apiserver 监控集群的公共状态，并致力于将集群中对象的当前状态转变为期望的状态
    * RC、RS
    * Deploment
    * DaemonSet
    * Job
    * CronJob
    * StatefulSet
    * Horizontai Pod Autoscaling
* 存储
* 配置
* 安全
* 负载均衡
   
* 资源清单
    * 


### Pod的生命周期


### 资源清单 语法


### 常用命令



### 相关文章

* [Docker 快速上手学习入门教程](http://tabalt.net/blog/docker-getting-started-quikly/)
* [CentOS 7 Minimal 虚拟机环境 Kubernetes(k8s)测试集群安装](http://tabalt.net/blog/install-k8s-test-cluster-on-centos-7-vms/)


