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

一个磁盘可以分成一个或多个分区，每个分区有且只有一个文件系统。本节介绍传统的基于BSD的Unix文件系统（UFS）。

创建UFS文件系统时，磁盘盘片被分成自举块（引导块）、超级块以及若干个柱面组；每个柱面组包含 超级块副本、配置信息、i节点图（记录哪些i节点可用）、块位图（记录哪些块是否可用）、i节点表、数据块（逻辑块）。如下图：

![UFS文件系统结构图](/images/apue3/ufs.png)

数据块可以再细分为目录块和文件数据块；目录块中存放目录项，目录项由i节点编号和文件名构成，i节点包含文件有关的信息（类型、权限、长度和指向文件数据块的指针等），文件数据块存储文件内容数据。多个目录项可以指向同一个i节点，具体个数保存在i节点的链接计数中，链接计数减少至0时才会删除文件。目录项就是硬链接，函数目录项目的函数是unlink（解除对一个文件的链接）。同一个文件系统内重命名文件只会删除并新建目录项而不移动文件内容。

硬链接不能跨文件系统。软连接（符号链接）的文件类型是S_IFLNK，内容是指向文件的名字。

![i节点和数据块的构成](/images/apue3/inode-data-blocks.png)

创建目录testdir时会在testdir目录中自动创建指向本目录的硬链接`.`和指向上层目录的硬链接`..`，因此不包含子目录的目录链接计数至少是2，包含子目录的目录链接计数至少是3。


### 函数link、linkat、unlink、unlinkat和remove

link系列函数可以创建一个指向现有文件的硬链接。在实现支持的情况下，为了避免形成循环，只有超级用户能创建执行目录的硬链接。

只有当链接计数为0，切没有进程打开文件时，文件才会被删除。程序中处理临时文件可以open后马上unlink，这样即使进程崩溃也不会将临时文件遗留下来。

remove函数操作文件时相当于unlink，操作目录时相当于rmdir。


### 函数rename和renameat

rename系列函数可以重命名文件或目录，但不能重命名`.`和`..`。


### 符号链接

符号链接是对一个额外那就的间接指针，可以跨文件系统，也可以轻松创建针对目录的符号链接。有些函数会跟随符号链接到达他指向的文件，而有些则不会。使用符号链接也可能在系统中引入循环，但大多数查找路径名的函数能出错返回。


### 创建和读取符号链接

symlink系列函数可以创建符号链接。


### 文件的时间

每个文件维护了三个时间字段：

* 文件数据的最后访问时间（st_atim）
* 文件数据的最后修改时间（st_mtim）
* i节点状态的最后更改时间（st_ctim）

`ls -l` 或`ls -t` 默认按文件修改时间排序，`-u`指定按访问时间排序，`-c`制定按状态修改时间排序。


### 函数futimes、utimensat、utimes

utimes系列函数可以修改文件的访问和修改时间。文件的状态修改时间不能被更改（修改时会更新为当前时间）。


### 函数mkdir、mkdirat和rmdir

mkdir系列函数可以创建目录，rmdir函数可以删除目录。创建新目录时制定的权限会被进程的文件模式创建屏蔽字（umask）修改。创建目录至少要设置执行权限位以允许访问该目录中的文件名。rmdir删除空目录时会自动删除`.`和`..`。


### 读目录

对某个目录具有访问权限的任意用户都能读目录，一个目录的写权限和执行权限决定了在该目录中能否创建或删除文件，并不表示是否能写目录本身，只有内核才能写目录。


### 喊出chdir、fchdir和getcwd

chdir系列函数可以修改进程的当前工作目录，工作目录是搜索相对路径的起点。函数getcwd可以获取当前工作目录的完整绝对路径。


### 块设备特殊文件

每个文件系统所在的存储设备都由起主、次设备号表示，使用宏major
和minor来访问主、次设备号。


更多有关[《Unix环境高级编程 3》的读书笔记](http://tabalt.net/blog/advanced-programming-in-the-unix-environment-3-reading-notes/)，请关注 ：   
[http://tabalt.net/blog/advanced-programming-in-the-unix-environment-3-reading-notes/](http://tabalt.net/blog/advanced-programming-in-the-unix-environment-3-reading-notes/)


