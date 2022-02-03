# AblogNeo
---------- 一个简单高效的博客网站，专注于分享
## 特色
- 使用markdown编辑，书写更流畅
- 无用户机制，专注于分享
- 极简风格，更高效的阅读体验
- 匿名评论，垃圾评论过滤，专注于问题
- 支持夜间模式，呵护夜间努力的你
- 文章浏览次数统计（待完成）
- 多平台支持（待完成）
- 下载备份所有文章以及恢复备份（待完成）
## 部署
### 手动部署
1. 安装Sqlite数据库<br/>
自行搜索安装<br/>
示例：<br/>
centos:
```shell
yum update
yum install sqlite3
```
unbuntu/debain:
```shell
apt update
apt install sqlite3
```
2. 下载软件
```shell
cd ~
wget http://150.158.81.132/apps/AblogNeo.tar.gz
tar -zxvf AblogNeo.tar.gz
```
3. 赋予运行权限
```shell
sudo chmod +x ./AblogNeo
```
4. 运行程序
```shell
./AblogNeo
```
### docker部署
1. 安装docker<br/>
自行搜索安装方式
2. 下载镜像
```
wget http://150.158.81.132/dockerimgs/AblogNeo.tar
```
3. 加载镜像
```
docker load --input AblogNeo.tar
```
4. 运行镜像
```
docker run -d -p 8060:8080 --name AblogNeo AblogNeo
```
5. 检测<br/>
防火墙打开8060端口，访问检测是否成功（可在第四步中将8060端口改为自己想要的端口）<br/>
链接：http://ip:8060
