---

layout: post
title:  "开发与运行storm应用（topology）"
date:   2014-12-17 12:30:00
tags: [storm]

keywords: storm应用开发步骤,如何开发storm应用,topology开发运行
description: 本文介绍storm应用topology的开发步骤，提供一个storm应用的示例以及讲述如何运行storm应用等。

---


#### 1、storm应用开发步骤

storm应用的开发，主要有三个步骤：

* 选择合适的spout

	storm提供的DRPCSpout用于同步请求场景，KestrelThriftSpout用于异步请求的场景，这两者已经能满足大多数需求，根据应用需要选择即可。

* 开发bolt

	bolt开发最主要的工作是实现execute()回调函数，由bolt收到数据时调用。execute函数里实现的是具体的业务逻辑，获取输入数据、进行处理、输出新的数据

* 开发topology，组合spout和bolt

	调用TopologyBuilder类的setSpout和setBolt方法，将spout和bolt组合成我们的应用。


#### 2、storm 应用代码示例 

下面是一个同步计算输入字符串的MD5值的storm应用，注释中详细介绍了各段代码的含义和用途。

	public class Md5Topology {
	   // 自定义的bolt继承BaseBasicBolt类
	   public static class Md5Bolt extends BaseBasicBolt {
	       @Override
	       public void execute(Tuple tuple, BasicOutputCollector collector) { // tuple是输入，collector用于输出
	           // 获取tuple的第一个字段
	           String input = tuple.getString(0);                                              
	
	           // 业务逻辑处理，这里就是简单的计算md5值
	           String output = Md5Util.getMD5Str(input);                               
	
	           // 调用emit接口输出，输出是2个字段，分别是输出的md5值、输入的第二个字段
	           collector.emit(new Values(output, tuple.getString(1)));              
	       }
	
	       @Override
	       public void declareOutputFields(OutputFieldsDeclarer declarer) {
	           // 声明这个bolt的输出有两个字段，字段名分别是result和return-info
	           declarer.declare(new Fields("result", "return-info"));                  
	       }
	   }
	
	   public static void main(String[] args) throws Exception {
	       TopologyBuilder builder = new TopologyBuilder();
	
	       // 1. 设置spout，3个参数分别是：spout名字，spout对象，并发数
	       builder.setSpout("DRPCSpout", new DRPCSpoutNew(args[0]), Integer.parseInt(args[1]));
	
	       // 2. 开发bolt，3个参数分别是：bolt名字，bolt对象，并发数
	       builder.setBolt("Md5Bolt", new Md5Bolt(), Integer.parseInt(args[2]))
	                      .shuffleGrouping("DRPCSpout");  //指定上游为"DRPCSpout"
	
	       // 3. 复用已有bolt，参数同上。ReturnResults是一个公共bolt，仅在同步场景中使用，负责将结果返回给drpc
	       builder.setBolt("ReturnBolt", new ReturnResults(), Integer.parseInt(args[3]))
	                      .shuffleGrouping("Md5Bolt");   //指定上游为"Md5Bolt"
	
	       Config conf = new Config();
	
	       // 4. 提交topology
	       StormSubmitter.submitTopology(args[0], conf, builder.createTopology());
	   }
	}
	
#### 3、storm应用目录结构

上述storm应用的源码结构如下：

	strom_md5/
	|-- build						# 编译工具自动生成、删除的目录
	|-- lib							# 可选，依赖的jar包存放目录
	|-- src							# 源码目录
	|   |-- java 					# java类文件目录
	|   |   |-- Md5Topology.java
	|   |   `-- Md5Util.java
	|   `-- resources				# 资源文件目录
	`-- storm_md5.jar				# 打包后的jar包


[示例源码包下载]()

#### 4、运行storm应用

storm应用的运行分为本地模式和分布式模式两种模式。本地模式用于开发和测试，分布式模式是将topology提交到storm集群上执行。

要在分布式集群上运行，将示例代码打成jar包，然后用如下命令启动和停止

* 启动topology
		
		# storm jar 【jar路径】 【拓扑包名.拓扑类名】 【拓扑名称】
		storm jar ./storm_md5.jar Md5Topology Md5Topology

* 停止topology

		#storm kill 【拓扑名称】
		storm kill Md5Topology


如需要本地模式运行，可将上述示例代码中的以下部分：

	// 4. 提交topology
	StormSubmitter.submitTopology(args[0], conf, builder.createTopology());

换成下面的代码：

	// 4. 本地模式运行topology
	conf.setDebug(true); 
	conf.setNumWorkers(2); 
	LocalCluster cluster = new LocalCluster(); 
	cluster.submitTopology(“test”, conf, builder.createTopology()); 
	Utils.sleep(10000); 
	cluster.killTopology(“test”); 
	cluster.shutdown(); 

直接运行即可。

#### 5、使用其他语言开发storm应用

storm集成了ShellBolt，用来支持使用其他语言开发storm应用。其他语言开发的bolt会被当做子进程来执行，storm通过stdin/stdout传递json格式的消息来和这些子进程通信。

更多有关ShellBolt的内容，请阅读官方文档：[Using non-JVM languages with Storm](http://storm.apache.org/documentation/Using-non-JVM-languages-with-Storm.html).



