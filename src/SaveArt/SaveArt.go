package SaveArt

import (
	"fmt"
	"net/http"
)

func SaveArt(response http.ResponseWriter, request *http.Request) {
	fmt.Fprintf(response, "SaveMd")
}
