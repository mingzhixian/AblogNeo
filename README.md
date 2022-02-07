# AblogNeo
---------- 一个简单高效的博客网站，专注于分享
## 特色
- 基于markdown
- 无用户机制，专注于分享
- 极简风格，更高效的阅读体验
- 匿名评论，垃圾评论过滤，专注于问题
- 根据时间自动显示夜间与白天主题
- 多平台支持
## 部署
1. 下载软件<br/>
从[下载页面下载软件](https://github.com/mingzhixian/AblogNeo/releases)<br/>
2. 赋予运行权限
```shell
sudo chmod +x ./AblogNeo
```
3. 运行程序
```shell
./AblogNeo -d {文章数据地址-默认当前文件夹} -p {监听端口-默认8080} -n {博客网站名字-默认AblogNeo} 
#例如： ./AblogNeo -d ./AblogNeoData -p 8080 -n AblogNeo
```
4. 上传文章地址：ip:8080/Html?Get=push
