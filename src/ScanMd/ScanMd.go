package ScanMd

import (
	"AblogNeo/src/AppSet"
	"AblogNeo/src/SaveMd"
	"io/ioutil"
	"log"
	"strings"
)

func ScanMd() {
	DataPath := AppSet.GetDataPath()
	scanArt(DataPath)
	scanCom(DataPath)
}

//扫描文件夹下的所有文件，返回文件名的集合
func scanFiles(FilePath string) []string {
	var names []string
	files, err := ioutil.ReadDir(FilePath)
	if err != nil {
		log.Fatal(err)
	}
	for _, f := range files {
		names = append(names, f.Name())
	}
	return names
}

//扫描文章文件夹，重构首页
func scanArt(DataPath string) {
	files := scanFiles(DataPath + "/Art")
	var ArtBody = ""
	for _, onefile := range files {
		onefile = onefile[0:strings.Index(onefile, ".md")]
		ArtBody += "- [" + onefile + "](" + "./?ArtName=" + onefile + ")\n"
	}
	SaveMd.SaveMd(AppSet.GetBlogName()+".md", ArtBody, "Art", "cover")
}

//根据文章文件夹内容，检测评论文件夹，新建无评论文件的文章的评论
func scanCom(DataPath string) {
	files := scanFiles(DataPath + "/Art")
	for _, file := range files {
		SaveMd.SaveMd(file, "- 欢迎来皮！\n", "Com", "uncover")
	}
}
