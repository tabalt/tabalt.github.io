---

layout: post
title:  "日志收集系统scribe的安装与测试"
date:   2014-10-20 12:30:00
tags: [scribe]

keywords: scribe,scribe日志收集,scribe安装,scribe启动,scribe测试
description: scribe是facebook开源的分布式收集，统一处理的大规模日志收集软件。本文详细介绍scribe日志收集系统的安装与启动、测试的过程。

---

scribe是facebook开源的日志收集系统。是一个分布式收集，统一处理的大规模日志收集软件。且具有可扩展、高容错的特性。


### 一、scribe的安装步骤

*该安装步骤在centos 5.9/6.4安装通过*

#### 1、检查 gcc/gcc-c++ 版本 

    gcc –v # 需要版本 > 3.3.5

#### 2、检查 python 版本

	python --version  # 需要版本 2.7	


#### 3、安装 ruby
    
    wget http://pyyaml.org/download/libyaml/yaml-0.1.4.tar.gz
    tar xzvf yaml-0.1.4.tar.gz
    cd yaml-0.1.4
    ./configure --prefix=/usr/local
    make
    make install

    # use rvm to install ruby
    rvm install ruby-1.9.3-p0

    # install ruby by source
    # maybe need sudo
    wget http://ftp.ruby-lang.org/pub/ruby/1.9/ruby-1.9.3-p0.tar.gz
    tar -zxvf ruby-1.9.3-p0.tar.gz
    cd ruby-1.9.3-p0
    ./configure
    make
    make install
    
#### 4、安装 libevent

    wget https://github.com/downloads/libevent/libevent/libevent-2.0.21-stable.tar.gz
    tar -zxvf libevent-2.0.21-stable.tar.gz
    cd libevent-2.0.21-stable
    ./configure
    make
    make install


#### 5、安装 boost

    # http://www.boost.org/users/history/version_1_45_0.html
    wget http://jaist.dl.sourceforge.net/project/boost/boost/1.45.0/boost_1_45_0.tar.gz
    tar -zxvf boost_1_45_0.tar.gz
    cd boost_1_45_0.tar.gz
    ./bootstrap.sh
    ./bjam
    ./bjam install

    # 配置环境变量
    vim /etc/profile #添加如下二行 
        export BOOST_ROOT=/usr/include/boost/
        #export LD_LIBRARY_PATH=/usr/include/boost/lib:/usr/lib:/usr/local/lib
        export LD_LIBRARY_PATH=/usr/lib64:/usr/lib:/usr/local/lib
    source /etc/profile
    ldconfig -v



#### 6、安装 thrift

    #http://www.apache.org/dyn/closer.cgi?path=/thrift/0.7.0/thrift-0.7.0.tar.gz 
    wget http://mirror.bit.edu.cn/apache/thrift/0.7.0/thrift-0.7.0.tar.gz
    tar -zxvf thrift-0.7.0.tar.gz
    cd thrift-0.7.0
    ./configure --with-boost=/usr/include/boost/ --with-php-config=/usr/bin/php-config
    make
    make install

#### 7、安装 fb303

    cd thrift-0.7.0/contrib/fb303
    ./bootstrap.sh
    ./configure  --with-boost=/usr/include/boost
    make
    make install 

#### 8、安装 scribe

    wget https://codeload.github.com/facebook/scribe/zip/master
    mv master scribe-master.zip
    unzip scribe-master.zip
    cd scribe-master
    ./bootstrap.sh
    ./configure  --with-boost=/usr/include/boost --with-boost-filesystem=boost_filesystem 
    make
    make install

### 二、测试 scribe

#### 1、单服务器配置

    /usr/local/bin/scribed ~/scribe/scribe-master/examples/example1.conf
    echo "hello world" | ./scribe_cat test
    cat /tmp/scribetest/test/test_current
    ./scribe_ctrl status
    ./scribe_ctrl counters
    ./scribe_ctrl stop
    


#### 2、 多台服务器配置

使用不同端口来模拟多台服务器

             'client'                    'central'
    ----------------------------     --------------------
    | Port 1464                 |    | Port 1463         |
    |        ----------------   |    | ----------------  |
    |     -> | scribe server |--|--->| | scribe server | |
    |        ----------------   |    | ----------------  |
    |                |          |    |    |         |    |
    |            temp file      |    |    |    temp file |
    |---------------------------     |-------------------
                                          |
                                       -------------------
                                       | /tmp/scribetest/ |
                                       -------------------

启动central服务器实例

	# port 1463	
    /usr/local/bin/scribed ~/scribe/scribe-master/examples/example2central.conf
    

启动client服务器实例

	# port 1464
    /usr/local/bin/scribed ~/scribe/scribe-master/examples/example2client.conf

写入日志

    echo "test message" | ./scribe_cat -h localhost:1464 test2
    echo "this message will be ignored" | ./scribe_cat -h localhost:1464 ignore_me
    echo "123:this message will be bucketed" | ./scribe_cat -h localhost:1464 bucket_me 

检查第一条被记录的日志

    cat /tmp/scribetest/test2/test2_current

检查第三条日志记录到了子目录

    cat /tmp/scribetest/bucket*/bucket_me_current 

检查两个实例的配置和计数

    ./scribe_ctrl status 1463
    ./scribe_ctrl status 1464
    ./scribe_ctrl counters 1463
    ./scribe_ctrl counters 1464

关闭两台实例

    ./scribe_ctrl stop 1463
    ./scribe_ctrl stop 1464  


### 三、后台启动

    nohup /usr/local/bin/scribed /etc/scribecentral.conf &
    nohup /usr/local/bin/scribed /etc/scribeclient.conf &

    ps | grep scribed
    pkill scribed


### 四、scribe 安装过程中可能遇到的错误errors

* ImportError: No module named scribe

        vim /etc/profile
            export PYTHONPATH=/usr/lib/python2.7/site-packages/
        source /etc/profile

* configure: error: Could not link against  

        configure加上 --with-boost-filesystem=boost_filesystem


