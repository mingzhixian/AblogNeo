package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"./services/AppSet"
	"./services/GetMd"
	"./services/SaveMd"
)

//命令行参数
var d = flag.String("d", "./AblogNeoData", "文章等数据存放地址")
var p = flag.int("p", "8080", "服务器监听端口号")

//启动http服务器
func start(*p int) {
	//启动服务
	err := http.ListenAndServe(":"+strconv.Itoa(*p), nil)
	if err != nil {
		log.Fatal(err)
	}
	//打印信息
	fmt.Println("服务已启动，监听" + strconv.Itoa(*p) + "端口")
}

//主函数
func main() {
	//解析命令行参数
	flag.Parse()
	//设置数据库地址
	AppSet.SetDataPath(*d)
	fmt.Println(*d)
	//设置监听
	staticHandle := http.FileServer(http.Dir("./static"))
	http.Handle("/js/", staticHandle)
	http.Handle("/css/", staticHandle)
	http.Handle("/html/", staticHandle)
	http.Handle("/img/", staticHandle)
	http.HandleFunc("/GetMd", GetMd.GetMd)
	http.HandleFunc("/SaveMd", SaveMd.SaveMd)
	//启动http服务器，开始监听
	start(*p)
}
