package main

import (
"log"
"fmt"
"net/http"
"./services/Test"
"./services/GetMd"
"./services/SaveMd"
)

//启动http服务器
func start() {
    err := http.ListenAndServe(":8080", nil)
    if err != nil {
        log.Fatal("ListenAndServe: ", err)
    }
}

//主函数
func main() {
	//设置监听
	staticHandle :=http.FileServer(http.Dir("./static"))
	http.Handle("/js/", staticHandle)
	http.Handle("/css/", staticHandle)
	http.Handle("/html/", staticHandle)
	http.Handle("/img/", staticHandle)
	http.HandleFunc("/Test", Test.Test)
	http.HandleFunc("/GetMd", GetMd.GetMd)
	http.HandleFunc("/SaveMd", SaveMd.SaveMd)

	//打印信息
	fmt.Println("服务已启动，监听8080端口")

	//启动http服务器，开始监听
	start();
}