---

layout: post
title:  "联盟链与Hyperledger Fabric介绍"
date:   2019-11-30 12:30:00
excerpt: 联盟链是用于多个机构之间允许授权节点加入网络并可根据权限查询或修改信息的区块链，Hyperledger Fabric是一个开源的企业级许可型分布式账本技术平台，他的差异化设计可以提供给企业直接可用的安全性、可伸缩性、机密性和高性能。
tags: [Blockchain]

keywords: 联盟链,区块链,Hyperledger Fabric
description: 联盟链是用于多个机构之间允许授权节点加入网络并可根据权限查询或修改信息的区块链，Hyperledger Fabric是一个开源的企业级许可型分布式账本技术平台，他的差异化设计可以提供给企业直接可用的安全性、可伸缩性、机密性和高性能。

---

<style type="text/css">
    .article-content img {
        border: 1px solid #eee;
    }
</style>
**联盟链与Hyperledger Fabric介绍**

tabalt  
2019.11  

![联盟链与Hyperledger Fabric介绍](/images/blockchain/cb-hf/1.jpg)


### 联盟链

![联盟链](/images/blockchain/cb-hf/2.jpg)

#### 什么是联盟链？

根据去中心化程度的不同，分化出3种不同应用场景下的区块链：

* 公有链：全网公开，广大用户可参与
* 联盟链：用于多个机构之间，允许授权的节点加入网络，可根据权限查询或修改信息
* 私有链：所有网络中的节点都掌握在一家机构手中

![什么是联盟链？](/images/blockchain/cb-hf/3.jpg)

#### 联盟链的优缺点

* 相比于公有链，联盟链在效率和灵活性上更有优势
    * 交易成本更低，交易只需被几个受信的高算力节点验证就可以，无需全网确认。
    * 节点规模小，可以很好地连接，故障可以迅速通过人工干预来修复。
    * 可以使用确定型的共识算法并缩短区块生成时间，从而更快完成交易。
    * 读写权限可以控制，从而提供更好的隐私保护。
    * 联盟链的参与者可以更容易地达成一致来更新区块链的规则、还原交易、修改余额等。
* 相比于公有链，联盟链去中心化程度不够

![联盟链的优缺点](/images/blockchain/cb-hf/4.jpg)

#### 联盟链的发展前景

* 联盟链受政策支持
    * 不依赖发币来激励用户参与，无监管问题
    * 不需要耗费大量电力资源挖矿
*   联盟链是“区块链+”的技术载体
    * 支持已有业务系统中部分数据的上链需求
    * 因联盟而产生的信任创造新的业务方向

![联盟链的发展前景](/images/blockchain/cb-hf/5.jpg)

#### 联盟链的发展现状

* 缺少杀手级应用
    * 落地的很多，叫好的很少
* 联盟建立困难
    * 将原本不相干甚至互相竞争的机构联合起来需要足够大的影响力
* 前期投入大而盈利能力弱
    * 不发币，资金来源于传统融资渠道
    * 业务形成规模之前较难盈利
* 技术瓶颈有待突破
    * 节点数量增长使得网络结构逐渐复杂，性能和稳定性降低
    * 区块链的特性导致难以支持大容量和大规模数据存储

![联盟链的发展现状](/images/blockchain/cb-hf/6.jpg)

#### 联盟链的应用探索

![联盟链的应用探索](/images/blockchain/cb-hf/7.jpg)

#### 联盟链技术平台

![联盟链技术平台](/images/blockchain/cb-hf/8.jpg)


### Hyperledger Fabric

![Hyperledger Fabric](/images/blockchain/cb-hf/9.jpg)

#### Hyperledger Fabric 简介

* Hyperledger是Linux基金会发起旨在推动区块链跨行业应用的开源项目，Fabric是其中最成功的子项目。
* 具有高度模块化和可配置的体系结构，可支持银行、金融、保险、医疗等广泛的行业用例。
* 支持以通用编程语言（如Go/Java/Node.js）而非受约束的领域特定语言（DSL）编写智能合约 。
* 支持可插拔的共识协议以适应特定的信任模型，节点的授权加入方便网络治理，且无需发行加密货币来激励记账。
* Fabric是一个开源的企业级许可型分布式账本技术平台，他的差异化设计可以提供给企业直接可用的安全性、可伸缩性、机密性和高性能。

![Hyperledger Fabric 简介](/images/blockchain/cb-hf/10.jpg)


#### 身份与成员资格 Identity and Membership

* Fabric使用X.509格式的证书作为身份，来标识区块链网络中的所有参与者，并提供用于确定许可权的一些属性，证书通过证书颁发机构（CA）来颁发。
* Fabric还提供了一个成员资格服务提供商 （MSP），用于确定哪些CA是受信任的、列出组织成员身份、识别参与者在组织内扮演的特定角色、定义网络和通道访问权限等。

![身份与成员资格 Identity and Membership](/images/blockchain/cb-hf/11.jpg)

#### 账本 Ledger

* Fabric的账本由两个不同但相关的部分组成：世界状态和区块链。 
* 世界状态(Word-Stat) 保存了账本数据的当前值，可以频繁更改，便于应用程序直接访问，本质是一个KV数据库，当前支持LevelDB和CouchDB。
* 区块链(Blockchain) 记录了导致当前世界状态的所有更改日志，写入后无法修改，便于历史追踪。

![账本 Ledger](/images/blockchain/cb-hf/12.jpg)

#### 智能合约与链码 Smart Contracts and Chaincode

* 智能合约定义了特定业务流程的交易逻辑，主要在世界状态下放置、获取、删除状态，或查询区块链交易记录，是应用程序开发的重点。
* 链码是一组用于安装和实例化智能合约的技术容器，一个链码可以包含多个智能合约。

![智能合约与链码 Smart Contracts and Chaincode](/images/blockchain/cb-hf/13.jpg)

#### 对等节点 Peer Node

* 对等节点（简称Peer）组件是Fabric区块链网络的基本元素，它托管着账本和智能合约，且可以同时托管多个账本和多个智能合约。
* 区块链网络拥有多个组织下的多个对等节点，对等方节点具有通过特定CA颁发的数字证书分配的身份。

![对等节点 Peer Node](/images/blockchain/cb-hf/14.jpg)


#### 通道 Channel

* 通道允许一组特定的对等节点和应用程序在区块链网络内相互通信，通道并不实际存在，而是由物理对等节点集合形成的逻辑结构。
* 每个通道都有一个完全独立的账本，这意味着完全独立的区块链，以及完全独立的世界状态。
* 一个组织可以加入多个通道，从而参与多个独立的区块链网络。

![通道 Channel](/images/blockchain/cb-hf/15.jpg)

#### 排序服务 Ordering Service

* Fabric 采用称为排序服务的特殊节点来执行交易的排序并生成区块，形成一种确定性的共识机制，由排序服务生成的任何块都可以保证是最终且正确的，不会产生分叉。
* 排序服务还维护着允许创建通道（Channel）的组织的列表，还对通道实施基本的访问控制，从而限制了谁可以对其进行数据读写和配置。
* 排序服务有三种实现，使得排序节点之间对严格的交易顺序达成共识：
    * Solo： 只有一个排序节点，无法容错，但可以用于开发测试环境
    * Kafka：崩溃容错（CFT）机制，选举领导者节点，跟随者复制其决策
    * Raft： 也是崩溃容错（CFT）机制，比Kafka易于配置和管理

![排序服务 Ordering Service](/images/blockchain/cb-hf/16.jpg)


#### 区块链网络的构建过程

* 组织R4 创建网络配置NC4，相关身份证书颁发自证书颁发机构CA4
* 启动排序服务O4，此时即形成了网络

![组织R4启动排序服务O4](/images/blockchain/cb-hf/17.jpg)

* 组织R4 更新网络配置NC4，允许R1也成为管理员， R1和R4在网络配置上享有同等的权利
* 网络管理员定义了一个联盟X1，该联盟包含两个成员，组织R1和R2
* R1和R2的相关身份证书分别有CA1何CA2颁发

![组织R1成为管理员，R1和R2形成联盟](/images/blockchain/cb-hf/18.jpg)

* 使用联盟定义X1为R1和R2创建了通道C1，排序服务O4和通道C1建立连接
* 通道由完全独立于网络配置的通道配置CC1控制，CC1由对C1拥有同等权利的R1和R2管理

![创建通道C1](/images/blockchain/cb-hf/19.jpg)

* 对等节点P1加入通道C1，P1托管着账本L1、安装了智能合约S5， P1和O4可通过C1互相通信
* 应用程序A1也加入通道C1， A1通过C1同时连接到P1和O4，A1可通过P1节点上的S5访问L1
* P1、A1均属于组织R1，相关身份证书由CA1颁发

![组织R1的节点P1和应用程序A1加入通道C1](/images/blockchain/cb-hf/20.jpg)

* 组织R2的对等节点P2和应用程序A2加入通道C1，相关身份证书由CA2颁发
* 节点P2 也托管了账本L1的副本、安装了智能合约S5
* 组织R1和R2可以在通过通道C1在一个区块链网络上进行交易

![组织R2的节点P2和应用程序A2加入通道C1](/images/blockchain/cb-hf/21.jpg)

* 定义了一个新联盟X2，包含组织R3和R2，R3相关身份证书由CA3颁发
* 创建了由R2和R3管理的通道配置CC2，启动了通道C2，形成了一个独立的区块链网络
* 组织R3的P3和A3加入了C2，组织R2的P2和A2也加入了C2
* 对等节点P2同时托管了账本L2，安装了智能合约S6，应用程序A2可同时访问两个区块链网络

![组织R3的节点P3和应用程序A3加入通道C2](/images/blockchain/cb-hf/22.jpg)

#### 交易的完整流程（形成共识）

**阶段1：交易建议（Proposal**
* 应用程序A1生成一个交易建议，发送给每个必须的对等节点以进行签名（ endorse ）
* 每个签名节点都使用交易建议独立执行智能合约以生成并返回建议响应，此时不会更新账本
* 应用程序A1收到足够数量的已签名建议响应，即完成阶段1

![阶段1：交易建议（Proposal）](/images/blockchain/cb-hf/23.jpg)

**阶段2：排序和打包**
* A1将包含签名的交易建议响应提交到排序服务节点O1
* O1同时接收批量提交的交易，安排到定义明确序列中，并打包成块
* O1不判断交易内容而只是机械打包，同时到达的交易顺序和块中的顺序可能也不一致

![阶段2：排序和打](/images/blockchain/cb-hf/24.jpg)

**阶段3：验证和提交**
* O1将打包好的块分发给对等节点，不在线的节点可后续通过gossip协议从其他节点同步
* 每个对等节点将独立地但以确定性的方式验证块（签名匹配、未被其他交易造成无效）
* 无效的交易仍保留在不可变块中，但对等节点会将其标记无效且不更新世界状态
* 账本更新后，对等节点可以通知连接的应用程序已经处理了交易

![阶段3：验证和提交](/images/blockchain/cb-hf/25.jpg)

#### 更多资料

* 官方文档： https://hyperledger-fabric.readthedocs.io/en/release-1.4/
* Github： https://github.com/hyperledger/fabric/


![更多资料](/images/blockchain/cb-hf/26.jpg)



