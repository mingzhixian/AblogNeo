package GetMd

import (
"fmt"
"net/http"
)

func GetMd(response http.ResponseWriter,request *http.Request) {
	fmt.Fprintf(response,"GetMd")
}