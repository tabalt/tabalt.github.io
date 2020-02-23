---

layout: post
title:  "CentOS 7 Minimal 虚拟机环境 Kubernetes(k8s)测试集群安装"
date:   2020-02-23 12:30:00
excerpt: CentOS 7 Minimal 虚拟机环境 Kubernetes(k8s)测试集群安装
tags: [Docker]

keywords: Kubernetes
description: CentOS 7 Minimal 虚拟机环境 Kubernetes(k8s)测试集群安装

---


### 一、安装CentOS 7 Minimal 64位版 基础虚拟机

1、新建虚拟机，挂载ISO文件，启动后安装，设置root密码  
2、登录虚拟机，设置网络
```
cat /proc/net/dev | grep -v lo  #查看网络设备，如ens33
vim /etc/sysconfig/network-scripts/ifcfg-ens33  #ONBOOT=no修改为ONBOOT=yes
service network restart
ip address  #查看IP地址
```

3、测试上述IP地址是否能通过SecureCRT/XShell等工具登录  
4、安装常用工具
```
yum install -y net-tools wget vim tree git curl jq ntpdate ntp
```

5、调整时间
```
vim /etc/ntp.conf
# 注释以下内容：
server 0.centos.pool.ntp.org iburst
server 1.centos.pool.ntp.org iburst
server 2.centos.pool.ntp.org iburst
server 3.centos.pool.ntp.org iburst
# 添加以下内容：
server ntp1.aliyun.com iburst
server ntp2.aliyun.com iburst
server ntp3.aliyun.com iburst
server ntp4.aliyun.com iburst
server ntp5.aliyun.com iburst
server ntp6.aliyun.com iburst
server ntp7.aliyun.com iburst

systemctl start ntpd.service
systemctl enable ntpd.service

# 设置时区
timedatectl set-timezone Asia/Shanghai
# 将时间写入硬件时钟
timedatectl set-local-rtc 0
# 重启依赖系统时间的服务
systemctl restart rsyslog
systemctl restart crond
```

### 二、安装K8s基础环境

1、从上述基础虚拟机 创建完整克隆，命名为 k8s-base-env，启动并登录  
2、调整系统设置
```
# 关闭防火墙
systemctl stop firewalld
systemctl disable firewalld

# 关闭邮件服务
systemctl stop postfix
systemctl disable postfix

# 关闭selinux
sed -i 's/enforcing/disabled/' /etc/selinux/config 
setenforce 0

# 关闭swap
swapoff -a  #临时
sed -ri 's/.*swap.*/#&/' /etc/fstab  #永久

# 将桥接的IPv4流量传递到iptables
cat > /etc/sysctl.d/kubernetes.conf << EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward=1
net.ipv4.tcp_tw_recycle=0
vm.swappiness=0
vm.overcommit_memory=1
vm.panic_on_oom=0
fs.inotify.max_user_instances=8192
fs.inotify.max_user_watches=1048576
fs.file-max=52706963
fs.nr_open=52706963
net.ipv6.conf.all.disable_ipv6=1
net.netfilter.nf_conntrack_max=2310720
EOF
sysctl --system

# 升级内核到4.4
rpm -Uvh http://www.elrepo.org/elrepo-release-7.0-3.el7.elrepo.noarch.rpm
yum --enablerepo=elrepo-kernel install -y kernel-lt
grub2-set-default "CentOS Linux (4.4.214-1.el7.elrepo.x86_64) 7 (Core)" #根据具体版本设置
reboot
uname -r
yum update
```

3、安装基础软件
```
# 添加阿里云YUM源
cat > /etc/yum.repos.d/kubernetes.repo << EOF
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF

# 安装kubeadm、kubelet和kubectl
yum install -y kubelet kubeadm kubectl
systemctl enable kubelet

# 安装Docker
wget https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo -O /etc/yum.repos.d/docker-ce.repo
yum -y install docker-ce-18.06.1.ce-3.el7
systemctl enable docker && systemctl start docker
docker --version

# 安装iptables并清空规则
yum install -y iptables iptables-services
systemctl start iptables && systemctl enable iptables && iptables -F && service iptables save

# 安装ipvs
yum install -y conntrack ipvsadm ipset sysstat libseccomp
modprobe br_netfilter
cat > /etc/sysconfig/modules/ipvs.modules <<EOF
#!/bin/bash
modprobe -- ip_vs
modprobe -- ip_vs_rr
modprobe -- ip_vs_wrr
modprobe -- ip_vs_sh
modprobe -- nf_conntrack_ipv4
EOF
chmod 755 /etc/sysconfig/modules/ipvs.modules && bash /etc/sysconfig/modules/ipvs.modules
lsmod | grep -e ip_vs -e nf_conntrack_ipv4
```

### 三、安装K8s 集群

0、建议 电脑内存16G以上，并关闭一些耗资源较大的程序  
1、从上述 K8s基础环境虚拟机 创建3个带链接的克隆，分别命名为 k8s-master01、k8s-node01、k8s-node02  
2、将 k8s-master01的配置调整为2核2G，k8s-node01、k8s-node02的配置调整为2核4G  
3、启动以上3个虚拟机并登录，分别设置主机名和hosts
```
# 根据实际情况配置主机名
hostnamectl set-hostname k8s-master01
hostnamectl set-hostname k8s-node01
hostnamectl set-hostname k8s-node02 

# 根据实际情况添加hosts配置
vim /etc/hosts
192.168.145.144 k8s-master01
192.168.145.145 k8s-node01
192.168.145.146 k8s-node02
```

4、分别设置静态IP地址并记录
```
cat /proc/net/dev | grep -v lo  #查看网络设备，如ens33
vim /etc/sysconfig/network-scripts/ifcfg-ens33  #修改或新增以下下配置项
BOOTPROTO="static" # 默认为dhcp
ONBOOT="yes" #开机启用配置
IPADDR="192.168.145.144" #静态IP地址，根据实际情况分别设置
GATEWAY="192.168.145.2" #默认网关  
DNS1="192.168.145.2" #DNS

service network restart
ip address  #查看IP地址是否生效
```

5、部署Master节点
```
# 在k8s-master01上执行
# 生成配置文件
kubeadm init \
  --apiserver-advertise-address=192.168.145.144 \
  --image-repository registry.aliyuncs.com/google_containers \
  --kubernetes-version v1.17.0 \
  --service-cidr=10.1.0.0/16 \
  --pod-network-cidr=10.244.0.0/16

# 查看生成的配置文件  
tree /etc/kubernetes/

# 使用kubectl工具
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
kubectl get nodes

# 安装Pod网络插件
wget https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml 
kubectl apply -f kube-flannel.yml

# 上述命令需确保能够访问到quay.io仓库，如长时间未成功拉取镜像可尝试手动拉取
docker pull quay.io/coreos/flannel:v0.11.0-amd64
# 也通过镜像加速拉取后添加tag
docker pull quay.mirrors.ustc.edu.cn/coreos/flannel:v0.11.0-amd64
docker tag quay.mirrors.ustc.edu.cn/coreos/flannel:v0.11.0-amd64 quay.io/coreos/flannel:v0.11.0-amd64

# kube-proxy开启 ipvs
kubectl edit cm kube-proxy -n kube-system #修改：mode: "ipvs"
# 批量删除并自动重建kube-proxy
kubectl get pod -n kube-system | grep kube-proxy | awk '{system("kubectl delete pod "$1" -n kube-system")}'
ipvsadm -Ln #查看生成的ipvs规则
```

6 、部署 Node节点
```
# 在k8s-node01、k8s-node02上执行
# 前面 kubeadm init输出的日志中找到类似如下的命令，注意IP和token必须是日志中输出的
kubeadm join 192.168.145.144:6443 --token 42w1zg.6ffi04kj88c1kesn \
    --discovery-token-ca-cert-hash sha256:69453c78d7e1c8d1f576e4b08bff84be29fb91b5e0584c67bdf226b85ceb548d
kubectl get nodes
```

7、测试集群
```
kubectl create deployment nginx --image=nginx
kubectl expose deployment nginx --port=80 --type=NodePort
kubectl get svc | grep nginx #获取IP、对外暴露的端口
nginx        NodePort    10.1.185.226   <none>        80:31721/TCP   2d18h
curl "http://10.1.185.226" #虚拟机内可通过SVC的IP访问
curl "http://192.168.145.144:31721" #虚拟机外可通过节点IP加暴露的NodePort端口访问

# 如镜像拉取失败可通过镜像加速拉取后添加tag
docker pull dockerhub.azk8s.cn/library/nginx
docker tag dockerhub.azk8s.cn/library/nginx library/nginx
```

8、部署 Dashboard
```
wget https://raw.githubusercontent.com/kubernetes/dashboard/master/aio/deploy/recommended.yaml -O ./kubernetes-dashboard.yaml
vim ./kubernetes-dashboard.yaml # 修改kubernetes-dashboard Service部分
----------
kind: Service
apiVersion: v1
metadata:
  labels:
    k8s-app: kubernetes-dashboard
  name: kubernetes-dashboard
  namespace: kubernetes-dashboard
spec:
  type: NodePort #修改Service为NodePort类型
  ports:
    - port: 443
      targetPort: 8443
      nodePort: 30001 #指定NodePort端口
  selector:
    k8s-app: kubernetes-dashboard
----------

kubectl apply -f ./kubernetes-dashboard.yaml
kubectl get pods,svc -n kubernetes-dashboard

# 如镜像拉取失败可通过镜像加速拉取后添加tag
docker pull dockerhub.azk8s.cn/kubernetesui/metrics-scraper:v1.0.3
docker pull dockerhub.azk8s.cn/kubernetesui/dashboard:v2.0.0-rc5
docker tag dockerhub.azk8s.cn/kubernetesui/metrics-scraper:v1.0.3 kubernetesui/metrics-scraper:v1.0.3
docker tag dockerhub.azk8s.cn/kubernetesui/dashboard:v2.0.0-rc5 kubernetesui/dashboard:v2.0.0-rc5

# 创建service account并绑定默认cluster-admin管理员集群角色
kubectl create serviceaccount dashboard-admin -n kubernetes-dashboard
kubectl create clusterrolebinding dashboard-admin --clusterrole=cluster-admin --serviceaccount=kubernetes-dashboard:dashboard-admin
kubectl describe secrets -n kubernetes-dashboard $(kubectl -n kubernetes-dashboard get secret | awk '/dashboard-admin/{print $1}')

# 保存token，在虚拟机外使用火狐浏览器访问如下地址，忽略证书报错
https://192.168.145.144:30001/
```


