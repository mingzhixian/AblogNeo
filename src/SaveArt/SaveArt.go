package SaveArt

import (
	"AblogNeo/src/SaveMd"
	"AblogNeo/src/ScanMd"
	"fmt"
	"net/http"
)

func SaveArt(response http.ResponseWriter, request *http.Request) {
	request.ParseForm()
	SaveMd.SaveMd(request.Form.Get("ArtName"), request.Form.Get("ArtBody"), "Art", "cover")
	SaveMd.SaveMd(request.Form.Get("ArtName"), "- 欢迎来皮！\n", "Com", "cover")
	ScanMd.ScanMd()
	fmt.Fprintf(response, "done")
}
