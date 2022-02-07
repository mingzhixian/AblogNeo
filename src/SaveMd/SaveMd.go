package SaveMd

import (
	"AblogNeo/src/AppSet"
	"bufio"
	"fmt"
	"os"
)

//写入文件,Type为cover时覆盖重写，非cover则只有无文件时才会进行
func SaveMd(ArtName string, ArtBody string, FileType string, Type string) {
	filePath := AppSet.GetDataPath() + "/" + FileType + "/" + ArtName
	var file *os.File
	var err error
	if Type == "cover" {
		file, err = os.OpenFile(filePath, os.O_WRONLY|os.O_CREATE|os.O_TRUNC|os.O_SYNC, 0666)
	} else {
		//如果后台报错xxxxx.md：file exists请不要惊慌，这是正常现象
		file, err = os.OpenFile(filePath, os.O_WRONLY|os.O_CREATE|os.O_EXCL, 0666)
	}

	if err != nil {
		fmt.Println("文件打开失败", err)
	}
	//及时关闭file句柄
	defer file.Close()
	//写入文件时，使用带缓存的 *Writer
	write := bufio.NewWriter(file)
	write.WriteString(ArtBody)
	//Flush将缓存的文件真正写入到文件中
	write.Flush()
}
