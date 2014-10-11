---

layout: post
title:  "分布式版本控制系统git在项目开发中的使用"
date:   2014-10-11 12:30:00
categories: 博文

---

关于是用git还是svn的争论，我想不用多聊了，总的来说，git是更稳定、更强大、更现代的版本控制工具，值得大家去尝试与应用。


### 1、准备工作

* 配置个人信息

		git config --global user.name "$username"
		git config --global user.email "$email"
		git config --global push.default simple
		git config --global color.ui true

* git仓库的创建与授权

	git仓库一般由管理员创建好了，如果是github网站，直接点击右上角的“ + ”号，选择 “New repository”，填写信息并创建即可。

	git服务器普遍使用ssh公钥来授权访问。unix系列环境下，使用ssh-keygen命令创建。

		ssh-keygen
		cd ~/.ssh
		ls id_rsa.pub

	将id_rsa.pub文件发给git服务器的管理员，或复制文件中的内容在github的Settings -> SSH keys 页面中添加即可：

		https://github.com/settings/ssh

	如何创建、管理一个git仓库，是git服务器运维的问题了，这里不做过多的探讨。
	

* 初始化项目

		cd ~/dev/
		git clone git@127.0.0.1:path/to/git_test.git
		cd ~/dev/git_test
		git status

	

### 2、本地分支开发

当有一些紧急bug需要修复或者一些小功能的改动，一个人就能轻松搞定，可以使用本地分支来开发。


* 更新本地master分支为最新
    
		cd ~/dev/git_test
	    git checkout master
	    git pull

* 建立本地开发分支

		git branch -b dev1011

* 在本地开发分支上修改代码

		echo "hello git" > hello.txt
		git add hello.txt
		git commit -am 'add test file hello.txt'
		echo "test" > test.txt
		git add test.txt
		git commit -am 'add test file test.txt'

* 开发完毕后，合并代码到master

	* 他人可能在我们开发的时候提交了代码，因此先更新master分支的代码
	
			git checkout master
			git pull
	
	* 以最新的master分支代码rebase本地开发分支，如果出现冲突请看第四节：git冲突处理。
	
			git checkout dev1011
			git rebase master
		
	* 合并本地开发分支的代码到master

			git checkout master
			git merge dev1011
			git push



### 3、远程分支开发

远程分支适用于多人协同开发同一个系统或功能的场景。使用远程分支开发，可以避免在master分支上引入不稳定的代码。

远程分支名可以根据开发的独立子系统或模块名称命名，如game、user、api、admin 等等。


* 初始化远程user分支

	* 更新本地master分支为最新
    
			cd ~/dev/git_test
		    git checkout master
		    git pull

	* 以本地master分支为基准新建远程user分支

        	git push origin master:user


* 在远程user分支开发（日常开发）
        
	* 将远程user分支checkout下来

			git checkout user
			git pull

	* 在本地建立属于自己的开发分支

			git checkout -b userdev

	* 编写代码

			echo 'hello user' > user.txt

	* 提交到本地开发分支

			git add user.txt
			git commit -am 'add user.txt'

	* 其他人可能修改了代码，先合并user上变动的内容到本地自己的开发分支

			git checkout user
			git pull
			git checkout userdev
			git rebase user

	* 合并本地自己的开发分支的代码到远程user分支

			git checkout user
			git merge userdev
			git push

	* 切换到本地userdev开发分支，继续开发

			git checkout userdev
			//coding...

	可以看到，这小节的操作步骤，和使用本地分支开发时几乎完全一样，只是将基于master的操作，换成基于user的操作。


* 合并user分支到master


		git checkout master
        git pull
        git checkout user
        git rebase master

		git checkout master
	    git merge user
	    git push


* 更新远程user分支的代码

	这时，远程的master，本地的master，本地的develop保持一致；但如果master里被人修改了代码（如修改紧急bug等），远程的user分支的代码并不是最新的了。

	* 借用本地master的代码更新远程user分支：

			git push origin master:user

	* 开发完毕后，可以直接删除远程user分支

			git push origin :user

	* 开发完毕后，可以删除本地分支

			git branch -D user


### 4、git冲突处理


使用git merge 、git rebase、git pull等命令时，都有可能和别人修改的代码发生冲突。

从本质上说，都是merge 和 patch（应用补丁）时产生冲突。rebase是重新设置基准，然后应用补丁的过程，所以也会冲突。git pull会自动merge，repo sync会自动rebase，所以git pull和repo sync也会产生冲突。


* 逻辑冲突

	逻辑冲突实际上git是发现不了的。git merge 或者path成功，但是生成的代码逻辑是有问题的，需要通过完备自动化测试等方式来保障。

	可能造成逻辑冲突的情况：

	* 其他人修改了文件名，我在老文件里做改动
	* 函数参数、返回值等变化，调用方未做相应修改等  


* 树冲突

	两个用户同时修改文件名造成的冲突，称为树冲突。下面是一个用户修改a.txt为b.txt，另一个用户修改a.txt为c.txt造成冲突的情况：

		$ git status
		    added by us:    b.txt
    		both deleted:   a.txt
    		added by them:  c.txt

	如果最终确定使用b.txt，执行如下操作：

		git rm a.txt
		git rm c.txt
		git add b.txt
		git commit

	树冲突也可以用git mergetool来解决，用d 删除不要的文件，用c保留需要的文件，最后执行git commit提交。


* 内容冲突

	内容冲突是最常见的情况，两个用户修改了同一个文件的同一块区域，git会报告内容冲突。

	一般情况下，出现冲突时都会有“CONFLICT”字样，并提示哪些文件有冲突。

	当repo sync报错时，可能并不直接提示冲突，而是下面这样：

		error: project mini/sample

	可以通过rebase解决：

		git rebase remote-branch-name

	
	* merge/patch的冲突解决
		
		当某个文件有冲突产生时，git会在冲突的地方做标记。下面是一个有冲突的文件，冲突标记<<<<<<< （7个<）与=======之间的内容是我的修改，=======与>>>>>>>之间的内容是别人的修改；此外，没有任何其它垃圾文件产生。

			$ vim conflict.txt
				
				<<<<<<< HEAD
				//my changes
				=======
				//other's changes
				>>>>>>> commit log
		
		直接编辑文件中被标记的地方，将不需要的代表和冲突标记删除。并执行 add、commit操作

			git add conflict.txt
			git commit
				

	* rebase的冲突解决
	
		rebase的冲突解决过程，就是解决每个应用补丁冲突的过程。

		按照上面的操作编辑每一个冲突文件，并一一执行git add 的操作，然后执行下面的命令继续rebase操作：

			git rebase --continue
		
		有冲突继续解决，重复这这些步骤，直到rebase完成。

		如果中间遇到某个补丁不需要应用，可以用下面命令忽略：
		
			git rebase --skip
		 
		如果想回到rebase执行之前的状态，可以执行：
		
			git rebase --abort
		 
		rebase之后，不需要执行commit，也不存在新的修改需要提交，都是git自动完成。

		


