package Test

import (
"fmt"
"net/http"
)

func a(abc string) string {
	return "你好"+abc
}
//Test模块，功能为测试主程序是否成功引入模块，调用方式test(abc)，其中参数需为string.函数首字母需大写，外部才可以调用，因此主函数首字母必须大写，其他函数首字母可以小写
func Test(response http.ResponseWriter,request *http.Request) {
	fmt.Fprintf(response,a("访客"))
}