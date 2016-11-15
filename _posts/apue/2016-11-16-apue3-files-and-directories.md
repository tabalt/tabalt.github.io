---

layout: post
title:  "第4章：文件和目录"
date:   2016-11-16 12:30:00
categories: 博文
tags: []

---


本章内容从stat结构开始展开介绍Unix环境中文件的各个属性和文件系统的结构。


### 函数 stat、fstat、fstatat和lstat

stat系列函数返回Unix文件的信息结构（stat结构），该结构的基本形式如下：

```
struct stat {
    mode_t st_mode; /* file type & mode (permissions) */
    ino_t st_ino; /* i-node number (serial number) */
    dev_t st_dev; /* device number (file system) */
    dev_t st_rdev; /* device number for special files */
    nlink_t st_nlink; /* number of links */
    uid_t st_uid; /* user ID of owner */
    gid_t st_gid; /* group ID of owner */
    off_t st_size; /* size in bytes, for regular files */
    struct timespec st_atim; /* time of last access */
    struct timespec st_mtim; /* time of last modification */
    struct timespec st_ctim; /* time of last file status change */
    blksize_t st_blksize; /* best I/O block size */
    blkcnt_t st_blocks; /* number of disk blocks allocated */
};
```

stat结构的大多数成员都是基本系统数据类型，shell中的`ls -l`命令可以获得一个文件有关的所有信息，主要使用stat函数。


### 文件类型

Unix系统秉承一切皆文件的思想，st_mode中保存着文件的类型信息，文件类型主要有如下几种：

* 普通文件(regular file)：最常用的文件类型，内容可以是文本或二进制数据
* 目录文件(directory file)：目录文件包含了其他文件的名字以及指向这些文件的指针
* 块特殊文件(block special file)：提供对设备（如磁盘）带缓冲的访问
* 字符特殊文件(character special file)：提供对设备不带缓冲的访问
* FIFO / 命名管道(named pipe)
* 套接字(socket)：用于进程间的网络通信
* 符号链接(symbolic link)：指向另一个文件

### 设置用户ID和设置组ID

与进程相关的ID有：

* 实际用户ID、实际组ID
* 有效用户ID、有效组ID、附属组ID
* 保存的设置用户ID，保持的设置组ID


实际用户ID、实际组ID即为当前登录用户的用户ID和组ID，有效用户ID、有效组ID通常等同实际用户ID、实际组ID。

st_mode中有特殊标志st_uid和st_gid， 含义是：当执行此文件时将进程的有效用户ID和有效组ID修改成文件所有者的用户ID或组ID。


### 文件访问权限

st_mode中还包含了对文件的访问权限位，所有的文件都有访问权限。访问权限位共有9个：

* 用户（user）读、写、执行（r、w、x）
* 组（group）读、写、执行（r、w、x）
* 其他（other）读、写、执行（r、w、x）

目录的读权限允许读目录文件获取目录下的所有文件名列表，执行权限允许进入目录，在目录中创建新文件或删除已有文件需要写权限和执行权限。想要打开一个文件，需要具有文件名路径中包含的每个的执行权限，且需要具有文件本身的适当权限（取决于打开模式）。

进程每次打开、创建、删除文件时，内核会执行文件访问权限测试：

* 若进程的有效用户ID是0（root），则允许访问
* 若进程的有效用户ID等于文件的所有者ID，且所有者拥有适当的操作权限，则允许访问
* 若进程的有效组ID或附属组ID之一等于文件的组ID，且所属组拥有适当的操作权限，则允许访问
* 若其他用户拥有适当的操作权限，则允许访问


### 新文件和目录的所有权

创建新文件或目录，用户ID即为进程的有效用户ID；组ID根据实现可能有两种情况：

* 进程的有效组ID
* 所在目录的组ID


### 函数access和faccessat

open函数打开文件时，内核以进程的有效用户ID和有效组ID执行访问权限控制，如进程希望按实际用户ID和实际组ID测试访问能力，可以通过access系列函数实现。


### 函数umask

umask函数为进程设置“文件模式创建屏蔽字”，创建新文件时指定的权限位会被umask值做修改。如当前的umask值为002，制定的权限位为777，最终创建的文件权限有以下两种情况：

* 若是创建目录，则文件权限位是： 777-002 = 775
* 若是创建普通文件，则需要在目录权限的基础上去掉执行权限：775-111=664


### 函数chmod、fchmod、fchmodat

chmod系列函数可以修改现有文件的访问权限。要想改变文件的权限位，则进程的有效用户ID必须等于文件的所有者ID，或进程具有超级用户权限。


### 函数chown、fchown、fchownat

chown系列函数可以修改现有文件的用户ID和组ID。


### 文件长度

st_size字段代表文件的长度，只有普通文件、目录、符号链接的文件长度才有意义。普通文件的长度可以是0，目录的文件长度通常是一个数（16或512）的整数倍，符号链接的文件长度是链接到的文件名字长度。

st_blksize代表对文件I/O较合适的块长度，st_blocks代表分配的512字节块个数。


### 文件截断

truncate系列函数可以在文件尾端截去一些数据缩短文件，也可以填充空洞增加文件长度。


### 文件系统





更多有关[《Unix环境高级编程 3》的读书笔记](http://tabalt.net/blog/advanced-programming-in-the-unix-environment-3-reading-notes/)，请关注 ：   
[http://tabalt.net/blog/advanced-programming-in-the-unix-environment-3-reading-notes/](http://tabalt.net/blog/advanced-programming-in-the-unix-environment-3-reading-notes/)


