package main

import (
	"AblogNeo/src/AppSet"
	"AblogNeo/src/GetArt"
	"AblogNeo/src/Html"
	"AblogNeo/src/SaveArt"
	"embed"
	"flag"
	"fmt"
	"net/http"
	"strconv"
)

//go:embed static
var static embed.FS

//命令行参数
var d = flag.String("d", "./AblogNeoData", "文章等数据存放地址")
var p = flag.Int("p", 8080, "服务器监听端口号")
var n = flag.String("n", "AblogNeo", "博客名字")

//启动http服务器
func start(p *int) {
	//启动服务
	err := http.ListenAndServe(":"+strconv.Itoa(*p), nil)
	if err != nil {
		fmt.Println("服务启动失败：" + err.Error())
		fmt.Println("sss")
	}
}

//主函数
func main() {
	//解析命令行参数
	flag.Parse()
	//设置数据地址
	AppSet.SetDataPath(*d)
	//设置博客名字
	AppSet.SetBlogName(*n)
	//打印信息
	fmt.Println("博客名字：" + *n)
	fmt.Println("数据地址：" + *d)
	fmt.Println("监听端口：" + strconv.Itoa(*p))
	fmt.Println("启动服务...")
	//设置监听
	staticHandle := http.FileServer(http.FS(static))
	http.Handle("/static/js/", staticHandle)
	http.Handle("/static/css/", staticHandle)
	http.Handle("/static/img/", staticHandle)
	http.Handle("/static/font/", staticHandle)
	http.HandleFunc("/", GetArt.GetArt)
	http.HandleFunc("/GetArt", GetArt.GetArt)
	http.HandleFunc("/SaveArt", SaveArt.SaveArt)
	http.HandleFunc("/Html", Html.Html)
	//启动http服务器，开始监听
	start(p)
}
