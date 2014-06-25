---

layout: post
title:  "Nginx虚拟主机（Virtual Host）配置"
date:   2014-06-26 00:30:00
categories: 博文

---


虚拟主机（Virtual Host）可以在一台服务器上绑定多个域名，架设多个不同的网站，一般在开发机或者要部署多个小网站的服务器上需要配置虚拟主机。nginx的虚拟主机配置其实也挺简单，为了使得配置文件清晰，可以给每一个虚拟主机建立一个配置文件，然后在主配置文件（nginx.conf）里使用include语句包含所有的虚拟主机配置文件。

建立存放虚拟主机配置文件的文件夹：

	sudo mkdir /usr/local/etc/nginx/vhosts
	
建立虚拟主机配置文件：

	sudo vim /usr/local/etc/nginx/vhosts/domain1.com.conf

在配置文件中，填写如下内容（其中domain1.com 需要替换成你自己的域名）：

    server {
        listen 80;
        server_name domain1.com www.domain1.com;
        access_log /var/log/access_domain1.log main;
        location / {
        	root /var/www/domain1.com;
        	index index.php index.html index.htm;
        }
        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
        	root /usr/share/nginx/html;
        }
        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        location ~ \.php$ {
        	fastcgi_pass 127.0.0.1:9000;
        	fastcgi_index index.php;
        	fastcgi_param SCRIPT_FILENAME /var/www/domain1.com/$fastcgi_script_name;
        	include fastcgi_params;
        }
        location ~ /\.ht {
        	deny all;
        }
    }
    
在主配置文件中，include 所有的虚拟主机配置：

	sudo vim /usr/local/etc/nginx/nginx.conf
	
	#在 http 配置节的结束花括号 } 前一行加入如下语句
    include /usr/local/etc/nginx/vhosts/*;

重新加载 Nginx配置文件，完成配置

	nginx -s reload