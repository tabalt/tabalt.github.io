---

layout: post
title:  "Mac OS上sublime text 3的安装与配置"
date:   2014-06-01 10:30:00
categories: 博文

---



sublime text 编辑器可以说是码农必备的编辑器了，它拥有优秀的使用体验，舒服的视觉效果，最重要的是不要钱（偶尔会弹个注册提示，不过间隔时间比较长，基本上可以忍受）！现在用的比较多的有两个版本：sublime text 2和 sublime text 3；对于喜欢尝鲜的码农，强烈推荐直接安装 3。


### 安装sublime text 3

直接从sublime text的官网上下载最新版并安装：
	
	http://www.sublimetext.com/3



### sublime text 3 的配置


打开 Preferences > Settings - User，修改配置为下面的内容：

	{
		"font_size": 16,
		"ignored_packages": [
			"Vintage"
		],
		"tab_size": 4,
		"translate_tabs_to_spaces": true
	}





### sublime text 3 的常用插件

* 安装`Package Control`插件

	安装`Package Control`是扩展你的sublime的第一步，可以通过Package Control很方便的安装其他插件。最简单的安装方式是按  <code>ctrl + `</code> ，然后在下方弹出的输入框中输入如下代码并回车：
	
		import urllib.request,os,hashlib; h = '7183a2d3e96f11eeadd761d777e62404' + 'e330c659d4bb41d3bdf022e94cab3cd0'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://sublime.wbond.net/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)
	
	不出意外的话，Package Control就会安装成功。如果你不知道是否安装成功，可以查看是否存在菜单 Preferences > Package Control，存在则已经正确安装；或者按`shift + command + p`。 如果你的版本不是 3，或者安装有问题，可以查看Package Control的官网上的安装教程：
	
		https://sublime.wbond.net/installation
	
* 安装`markdown preview`插件

	markdown preview是sublime下预览markdown文件的插件，按`shift + command + p`打开我们前面安装的Package Control插件的面板，输入`install`然后回车，在弹出的面板输入markdown preview再回车，即可完成安装。


* 安装`SidebarEnhancements`插件

	`SidebarEnhancements`是增强侧边栏的插件，安装方法同上。



