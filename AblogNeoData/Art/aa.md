# MySql的安装
**请注意本篇文章于2022年1月19日编写，请注意信息是否过期**
## docker安装环境
- 系统ubuntu或debain
- 防火墙以开启3306端口
## 服务器本机安装环境（直接从安装mysql步开始）
- 系统centos
- 防火墙开启3306端口
## 准备工作
- 更新软件包
```
sudo apt update
```
- 安装服务器docker软件
```
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```
- 拉取centos镜像
```
docker pull centos
//此处未直接拉取官方的mysql镜像，一是为了亲自安装方便学习，而是因为官方镜像精简太多，不方便后期管理
```
- 实例化centos
```
docker run -itd --name mysql -p 3306:3306 --privileged=true centos /sbin/init
```
- 进入centos
```
docker exec -it mysql /bin/bash
```
## 安装mysql（不使用docker的朋友可以直接从此处开始）
- 更新软件包
```
yum update
//如果更新时提示系统更新，输入n回车即可，无需进行系统更新
```
- 安装mysql
```
yum install mysql
```
- 授权
```
chown -R mysql:mysql /var/lib/mysql
```
- mysql初始化
```
mysqld --initialize
```
- 启动mysql
```
systemctl start mysqld
```
- 查看mysql运行状态
```
systemctl status mysqld
//正常启动会看到一个绿色的小圆点
```
- 查看初始密码
```
cat /var/log/mysql/mysqld.log
//在前几行会有随机密码，例如A temporary password is generated for root@localhost: Q<*<ZigfY5T5
```
- 登录mysql
```
mysql -u root -p
//mysql会提示输入密码，输入随机密码即可
```
- 修改密码
```
//修改密码
alter user 'root'@'localhost' identified by 'youpassword';
//刷新权限
flush privileges;
```
- 允许远程访问
```
//进入mysql数据库
use mysql;
//查看权限
select host,user from user;
//修改权限
update user set host ='%' where user = 'root';
//查看权限
select host,user from user;
//刷新权限
flush privileges;
```
- 重启mysql
```
systemctl restart mysqld;
```
## 验证mysql
- 退出docker
```
exit
```
- 检测
```
//远程访问服务器ip:3306/数据库名（需先在终端建立数据库），检测是否成功
```