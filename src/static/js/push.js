//处理文件
function handleFiles(files) {
	if (files.length === 0) {
		alert('请选择文件！');
		return;
	}
	Reader(files, 0, files.length);
}

//读取文件
function Reader(files, i, ele) {
	var file = files[i];
	const reader = new FileReader();
	reader.readAsText(file);
	reader.onload = function () {
		//检测违规词语
		if (BadKey(reader.result) || file.name.indexOf('.md') === -1) {
			alert("检测到第" + (i + 1).toString() + "个文件违规！(请检测文件格式是否为md，且文章内容是否包括违规词语)");
		} else {
			var data = {ArtName:file.name,ArtBody:reader.result};
		}
		push(data,i);
		if (i + 1 < ele) {
			Reader(files, i + 1, ele);
		} else if (i + 1 === ele) {
			window.open("./");
		}
	}
}

//上传数据
function push(data,i) {
	$.ajax({
		url: "./SaveArt",
		type: "post",
		data: data
	}).done(function (output) {
		if (output !== "done") {
			alert("第" + (i + 1).toString() + "个文件上传失败！请稍候再试！");
		}
	}).fail(function (xhr, status) {
		console.log(status);
	});
}