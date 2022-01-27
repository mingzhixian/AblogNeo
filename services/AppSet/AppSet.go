package AppSet

import (

)

var DataPath="./AblogNeoData"

//设置数据地址
func SetDataPath(path string) {
	DataPath = path
}

//获取数据地址
func GetDataPath() string {
	return DataPath
}