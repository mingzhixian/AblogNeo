package Html

import (
	"AblogNeo/src/AppSet"
	_ "embed"
	"net/http"
	"text/template"
	"time"
)

//加载静态资源
//go:embed 404.html
var is404 string

//go:embed editor.html
var editor string

//go:embed push.html
var push string

var amap map[string]string

//获取文章
func Html(response http.ResponseWriter, request *http.Request) {
	//静态资源字典
	amap = make(map[string]string)
	amap["editor"] = editor
	amap["push"] = push
	amap["404"] = is404
	//获取访问网页名
	request.ParseForm()
	Get := request.Form.Get("Get")
	//无指定时返回404
	if Get == "" {
		Get = "404"
	}
	//返回数据
	templateHtml(Get, response)
}

//组装并返回数据
func templateHtml(Get string, response http.ResponseWriter) {
	html := template.New(Get)
	//查询字典，指定网页错误返回404
	value, ok := amap[Get]
	if ok {
		html.Parse(value)
	} else {
		html.Parse(is404)
	}
	data := map[string]string{
		"BlogName":    AppSet.GetBlogName(),
		"DayAndNight": dayAndNight(Get),
	}
	html.Execute(response, data)
}

//设置网页主题
func dayAndNight(Get string) string {
	hour := time.Now().Hour()
	if hour > 18 || hour < 8 {
		return "<link rel=\"stylesheet\" href=\"./static/css/" + Get + "-night.css\"><link rel=\"stylesheet\" href=\"./static/css/github-markdown-night.css\">"
	} else {
		return "<link rel=\"stylesheet\" href=\"./static/css/" + Get + "-day.css\"><link rel=\"stylesheet\" href=\"./static/css/github-markdown-day.css\">"
	}
}
