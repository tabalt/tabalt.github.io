---

layout: post
title:  "ElasticSearch 快速上手学习入门教程"
date:   2017-10-19 12:30:00
excerpt: 从零开始上手来体验学习最受欢迎和最有活力的全文搜索引擎系统ElasticSearch
tags: [ElasticSearch]

keywords: ElasticSearch,ElasticSearch入门,ElasticSearch教程
description: 从零开始上手来体验学习一下ElasticSearch

---



作为最受欢迎和最有活力的全文搜索引擎系统，ElasticSearch有着你无法拒绝的魅力，可以方便快速地集成到项目中储存、搜索和分析海量数据。本文我们从零开始上手来体验学习一下ElasticSearch。

### 下载&安装&启动 ElasticSearch

打开ElasticSearch官网的下载页面 https://www.elastic.co/downloads/elasticsearch/ 可以获取相应版本的下载地址，通过如下命令下载安装并启动ElasticSearch:

```
cd ~/soft/
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.6.3.zip
unzip elasticsearch-5.6.3.zip

cd elasticsearch-5.6.3
./bin/elasticsearch     # 加 -d参数可作为守护进程后台运行
```

注意，上述示例中下载的ElasticSearch 5.6.3要求Java版本为8以上，如果你机器上没有安装Java或者版本不符合要求，需要先更新再执行`./bin/elasticsearch`命令启动。此外，ElasticSearch对机器的配置要求也比较高。

在命令行使用`curl 'http://localhost:9200/?pretty'`可测试是否启动成功，正常输出如下：
```
{
  "name" : "8Low6xs",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "CAMAT2P2QS-UnI32tB53_A",
  "version" : {
    "number" : "5.6.3",
    "build_hash" : "1a2f265",
    "build_date" : "2017-10-06T20:33:39.012Z",
    "build_snapshot" : false,
    "lucene_version" : "6.6.1"
  },
  "tagline" : "You Know, for Search"
}
```

### ElasticSearch RESTful API

ElasticSearch提供Json格式的基于HTTP的RESTful API，可通过CURL命令直接请求，也能非常简便的在任何编程语言中使用，官方提供的常用语言客户端可在 https://www.elastic.co/guide/en/elasticsearch/client/index.html 查询下载。

#### 接口请求

请求格式：

```
curl -X <VERB> '<PROTOCOL>://<HOST>:<PORT>/<PATH>?<QUERY_STRING>' -d '<BODY>'
```

参数  |  说明
------|--------
VERB  |  HTTP方法 : `GET`、 `POST`、 `PUT`、 `HEAD` 或者 `DELETE`
PROTOCOL  |  http 或者 https
HOST  |  集群中任意节点的主机名
PORT  |  端口号，默认是 9200 
PATH  |  API 的终端路径
QUERY_STRING  |  任意可选的查询字符串参数
BODY  |  JSON格式的请求体 (如果需要)

请求示例：

```
curl -X GET 'http://localhost:9200/_count?pretty' -d '
{
    "query": {
        "match_all": {}
    }
}
'
```

#### 接口响应

Elasticsearch接口返回一个HTTP状态码（如：`200 OK`）和一个JSON格式的返回值（`HEAD`请求除外）。上面的CURL请求将返回一个像下面一样的 JSON 体：

```
{
  "count" : 0,
  "_shards" : {
    "total" : 0,
    "successful" : 0,
    "skipped" : 0,
    "failed" : 0
  }
}
```

如需显示状态码可以使用`curl`命令的`-i`参数。


### ElasticSearch存储结构与概念

#### 文档 Document

Elasticsearch是面向文档的，使用JSON作为序列化格式存储整个对象。user对象文档示例如下：

```
{
    "email":      "john@smith.com",
    "first_name": "John",
    "last_name":  "Smith",
    "info": {
        "bio":         "Eco-warrior and defender of the weak",
        "age":         25,
        "interests": [ "dolphins", "whales" ]
    },
    "join_date": "2014/05/01"
}
```

实际存储的文档还包含文档的元数据，元数据中的常见元素：

元素 | 说明
---- | ----
_index | 文档在哪个索引存放
_type | 文档对象类型
_id | 文档唯一标识
_version | 数据版本

注意：Type只是Index中的虚拟逻辑分组，不同的Type应该有相似的结构。6.x版只允许每个Index包含一个Type，7.x 版将会彻底移除 Type。


#### 索引 Index 

索引（Index）在ElasticSearch中是多义词：

* 1、类似数据库概念的存储文档集合的地方叫做索引（名词）
* 2、存储数据到Elasticsearch的行为也叫做索引（动词）
* 3、为了提升数据检索速度使用的倒排索引结构

ElasticSearch默认给索引(1)中每个文档的每个属性建立倒排索引(3)使之可以被快速检索。

#### 节点 Node、集群 Cluster和分片 Shards

ElasticSearch是分布式数据库，允许多台服务器协同工作，每台服务器可以运行多个实例。单个实例称为一个节点（node），一组节点构成一个集群（cluster）。分片是底层的工作单元，文档保存在分片内，分片又被分配到集群内的各个节点里，每个分片仅保存全部数据的一部分。


### ElasticSearch中增删改查基本操作

我们以wecompany公司的员工信息管理为例来学习ElasticSearch中的基本操作。

#### 索引文档

向名称为wecompany的索引中添加类型为employee的3个员工信息的文档：

```
curl -X PUT 'http://localhost:9200/wecompany/employee/1?pretty' -d '
{
    "first_name" : "John",
    "last_name" :  "Smith",
    "age" :        25,
    "about" :      "I love to go rock climbing",
    "interests": [ "sports", "music" ]
}
'
curl -X PUT 'http://localhost:9200/wecompany/employee/2?pretty' -d '
{
    "first_name" :  "Jane",
    "last_name" :   "Smith",
    "age" :         32,
    "about" :       "I like to collect rock albums",
    "interests":  [ "music" ]
}
'
curl -X PUT 'http://localhost:9200/wecompany/employee/3?pretty' -d '
{
    "first_name" :  "Douglas",
    "last_name" :   "Fir",
    "age" :         35,
    "about":        "I like to build cabinets",
    "interests":  [ "forestry" ]
}
'
```

#### 检索文档

获取ID为1的文档：

```
curl -X GET 'http://localhost:9200/wecompany/employee/1?pretty'

{
  "_index" : "wecompany",
  "_type" : "employee",
  "_id" : "1",
  "_version" : 1,
  "found" : true,
  "_source" : {
    "first_name" : "John",
    "last_name" : "Smith",
    "age" : 25,
    "about" : "I love to go rock climbing",
    "interests" : [
      "sports",
      "music"
    ]
  }
}
```

搜索姓氏为`Smith`的员工信息：

```
curl -X GET 'http://localhost:9200/wecompany/employee/_search?q=last_name:Smith&pretty'

{
  "took" : 5,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : 2,
    "max_score" : 0.2876821,
    "hits" : [
      {
        "_index" : "wecompany",
        "_type" : "employee",
        "_id" : "2",
        "_score" : 0.2876821,
        "_source" : {
          "first_name" : "Jane",
          "last_name" : "Smith",
          "age" : 32,
          "about" : "I like to collect rock albums",
          "interests" : [
            "music"
          ]
        }
      },
      {
        "_index" : "wecompany",
        "_type" : "employee",
        "_id" : "1",
        "_score" : 0.2876821,
        "_source" : {
          "first_name" : "John",
          "last_name" : "Smith",
          "age" : 25,
          "about" : "I love to go rock climbing",
          "interests" : [
            "sports",
            "music"
          ]
        }
      }
    ]
  }
}
```

使用查询表达式搜索姓氏为`Smith`的员工信息：

```
curl -X GET 'http://localhost:9200/wecompany/employee/_search?pretty' -d '
{
    "query" :  {
        "match" : {
            "last_name" : "Smith"
        }
    }
}
'

# 返回结果同上
```

姓氏为`Smith`且年龄大于30的复杂条件搜索员工信息：

```
curl -X GET 'http://localhost:9200/wecompany/employee/_search?pretty' -d '
{
    "query" :  {
        "bool" : {
            "must" : {
                "match" : {
                    "last_name" : "Smith"
                }
            },
            "filter": {
                "range" : {
                    "age" : { "gt" : 30 } 
                }
            }
        }
    }
}
'

{
  "took" : 5,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : 1,
    "max_score" : 0.2876821,
    "hits" : [
      {
        "_index" : "wecompany",
        "_type" : "employee",
        "_id" : "2",
        "_score" : 0.2876821,
        "_source" : {
          "first_name" : "Jane",
          "last_name" : "Smith",
          "age" : 32,
          "about" : "I like to collect rock albums",
          "interests" : [
            "music"
          ]
        }
      }
    ]
  }
}
```


全文搜索喜欢攀岩（rock climbing）的员工信息：

```
curl -X GET 'http://localhost:9200/wecompany/employee/_search?pretty' -d '
{
    "query" :  {
        "match" : {
            "about" : "rock climbing"
        }
    }
}
'

{
  "took" : 4,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : 2,
    "max_score" : 0.53484553,
    "hits" : [
      {
        "_index" : "wecompany",
        "_type" : "employee",
        "_id" : "1",
        "_score" : 0.53484553,
        "_source" : {
          "first_name" : "John",
          "last_name" : "Smith",
          "age" : 25,
          "about" : "I love to go rock climbing",
          "interests" : [
            "sports",
            "music"
          ]
        }
      },
      {
        "_index" : "wecompany",
        "_type" : "employee",
        "_id" : "2",
        "_score" : 0.26742277,
        "_source" : {
          "first_name" : "Jane",
          "last_name" : "Smith",
          "age" : 32,
          "about" : "I like to collect rock albums",
          "interests" : [
            "music"
          ]
        }
      }
    ]
  }
}

```

此外，将上述请求中的"match"换成"match_phrase"可以精确匹配短语"rock climbing"的结果。在"query"同级添加"highlight"参数可以在结果中用`<em></em>`标签标注匹配的关键词：

```
{
"query" :{ ... }
"highlight" : {
        "fields" : {
            "about" : {}
        }
    }
}
```

聚合分析员工的兴趣：

* 先启用相关字段的分析功能

```
curl -X PUT 'http://localhost:9200/wecompany/_mapping/employee?pretty' -d '
{
    "properties": {
        "interests": { 
            "type":     "text",
            "fielddata": true
        }
    }
}
'

{
  "acknowledged" : true
}
```

* 查询聚合结果

```
curl -X GET 'http://localhost:9200/wecompany/employee/_search?pretty' -d '
{
    "aggs": {
        "all_interests": {
            "terms": { "field": "interests" }
        }
    }
}
'

{
  "took" : 33,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : 3,
    "max_score" : 1.0,
    "hits" : [
      ...
    ]
  },
  "aggregations" : {
    "all_interests" : {
      "doc_count_error_upper_bound" : 0,
      "sum_other_doc_count" : 0,
      "buckets" : [
        {
          "key" : "music",
          "doc_count" : 2
        },
        {
          "key" : "forestry",
          "doc_count" : 1
        },
        {
          "key" : "sports",
          "doc_count" : 1
        }
      ]
    }
  }
}
```

#### 更新文档

更新ID为2的文档，只需再次PUT即可：

```
curl -X PUT 'http://localhost:9200/wecompany/employee/2?pretty' -d '
{
    "first_name" :  "Jane",
    "last_name" :   "Smith",
    "age" :         33,
    "about" :       "I like to collect rock albums",
    "interests":  [ "music" ]
}
'
```

#### 删除文档

```
curl -X DELETE 'http://localhost:9200/wecompany/employee/1?pretty'
```

### 结语

现在，你已经基本了解ElasticSearch的安装使用和简单概念了，但请不要止步于此；ElasticSearch有着深刻的内涵和丰富的功能等待着你去发现，官方文档是最新最全最好的学习材料了，打开下面这个页面即可得到它：

https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html 
