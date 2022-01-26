package SaveMd

import (
"fmt"
"net/http"
)

func SaveMd(response http.ResponseWriter,request *http.Request) {
	fmt.Fprintf(response,"SaveMd")
}