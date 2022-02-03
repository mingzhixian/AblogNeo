package AppSet

import (
	"fmt"
	"os"
)

var DataPath = "./AblogNeoData"
var BlogName = "Ablog"

//设置数据地址
func SetDataPath(path string) {
	DataPath = path
	//创建数据文件夹
	err := os.MkdirAll(DataPath+"/Art", os.ModePerm)
	if err != nil {
		fmt.Println(err)
	}
	err = os.MkdirAll(DataPath+"/Com", os.ModePerm)
	if err != nil {
		fmt.Println(err)
	}
}

//获取数据地址
func GetDataPath() string {
	return DataPath
}

//设置Blog名字
func SetBlogName(name string) {
	BlogName = name
}

//获取Blog名字
func GetBlogName() string {
	return BlogName
}
