package test

import ("fmt")

//Test模块，功能为测试主程序是否成功引入模块，调用方式test(abc)，其中参数需为string.
func test(abc) {
	fmt.Println("test"+abc)
}