package GetMd

import (
	"bufio"
	"io"
	"net/http"
	"os"
	"strings"
)

func GetMd(response http.ResponseWriter, request *http.Request) {
	request.ParseForm()
	for k, v := range request.PostForm {
		if k == "Url" {
			ReadFile(v[0])
		}
	}
}

func ReadFile(Url string) error {
	//读取文件
	f, err := os.Open(Url)
	defer f.Close()
	if err != nil {
		return err
	}
	buf := bufio.NewReader(f)

	for {
		line, err := buf.ReadLine("\n")
		line = strings.TrimSpace(line)
		handle(line)
		if err != nil {
			if err == io.EOF {
				return nil
			}
			return err
		}
		return nil
	}
}
