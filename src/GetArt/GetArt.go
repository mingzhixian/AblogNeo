package GetArt

import (
	_ "embed"
	"io/ioutil"
	"net/http"
	"text/template"
	"time"

	blackfriday "github.com/russross/blackfriday/v2"

	"AblogNeo/src/AppSet"
)

//加载静态资源
//go:embed article.html
var article string

//获取文章
func GetArt(response http.ResponseWriter, request *http.Request) {
	//获取文章名
	request.ParseForm()
	artName := request.Form.Get("ArtName")
	//无指定文章时访问博客首页
	if artName == "" {
		artName = AppSet.GetBlogName()
	}
	//获取文章
	artHtml := readFile(artName)
	//返回数据
	templateHtml(artHtml, artName, response)
}

//获取并解析文章文件
func readFile(artName string) string {
	//读取文件
	f, err := ioutil.ReadFile(AppSet.GetDataPath() + "/Art/" + artName + ".md")
	if err != nil {
		return "<center><h1>无此文章</h1></center>"
	}
	//转换为html
	return string(blackfriday.Run(f))
}

//组装并返回数据
func templateHtml(artHtml string, artName string, response http.ResponseWriter) {
	html := template.New("article")
	html.Parse(article)
	data := map[string]string{
		"BlogName":    AppSet.GetBlogName(),
		"ArtName":     artName,
		"ArtBody":     artHtml,
		"DayAndNight": dayAndNight(),
	}
	html.Execute(response, data)
}

//设置网页主题
func dayAndNight() string {
	hour := time.Now().Hour()
	if hour >= 18 || hour <= 8 {
		return "<link rel=\"stylesheet\" href=\"./static/css/article-night.css\"><link rel=\"stylesheet\" href=\"./static/css/github-markdown-night.css\">"
	} else {
		return "<link rel=\"stylesheet\" href=\"./static/css/article-day.css\"><link rel=\"stylesheet\" href=\"./static/css/github-markdown-day.css\">"
	}
}
