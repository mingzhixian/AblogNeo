var type = null;
const E = window.wangEditor;
var editor = null;
window.onload = function () {
    MoreDevices();
    Update();
    NewEditor();
    GetTypes();
}

function NewEditor() {
    editor = new E('#toolbar-container', '#text-container');
    //编辑区字体
    editor.config.fontNames = ['AblogFont', '黑体'];
    //编辑选项
    editor.config.menus = [
        'head',
        'bold',
        'fontSize',
        'fontName',
        'italic',
        'underline',
        'strikeThrough',
        'indent',
        'lineHeight',
        'foreColor',
        'link',
        'list',
        'justify',
        'quote',
        'table',
        'code',
        'splitLine',
        'undo',
        'redo'
    ]
    //是否允许全屏
    editor.config.showFullScreen = false;
    editor.create()
}

//获取type
function GetTypes() {
    $.ajax({
        url: GetType(),
        type: "get",
        dataType: "json"
    }).done(function (output) {
        var typeselect = document.getElementById("typeSelect");
        for (var i = 0; i < output.length; i++) {
            var str = "<option value='" + output[i].type + "'>" + output[i].type + "</option>";
            typeselect.innerHTML += str;
        }
        typeselect.innerHTML += "<option value=‘新增加’>新增加</option>";
        typeSelect();
    }).fail(function (xhr, status) {
        console.log(status);
    });
}

//新增加type
function typeSelect() {
    var selected = document.getElementById("typeSelect").options[document.getElementById("typeSelect").selectedIndex].text;
    if (selected == '新增加') {
        document.getElementById("type").style.display = "block";
        type = "新增加";
    } else {
        document.getElementById("type").style.display = "none";
        type = null;
    }
}

//从链接获取文章名
function getvl(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
}

//修改界面
function Update() {
    var tilte = getvl("article");
    if (tilte != null) {
        document.getElementById("title").value = tilte;
        document.getElementById("del").style.display = "block";
        $.ajax({
            url: GetCloud() + tilte + "&&Url=ArtUrl",
            type: "get",
            dataType: "html"
        }).done(function (output) {
            document.getElementById("text-container").innerHTML = output;
        }).fail(function (xhr, status) {
            console.log(status);
        });
    }
}

//提交
function sub() {
    var input = editor.txt.html();
    var title = document.getElementById("title").value;
    if (type === "新增加") {
        type = document.getElementById("type").value;
    } else {
        type = document.getElementById("typeSelect").options[document.getElementById("typeSelect").selectedIndex].text;
    }
    if (input === "" || title === "" || type === "") {
        alert("输入为空！");
    } else {
        alert(input);
        alert(title);
        alert(type);
        $.ajax({
            url: GetSub(),
            type: "post",
            data: {"ArtName": title, "ArtText": input, "Type": type},
            dataType: "json"
        }).done(function () {
            window.open(GetArt() + title);
        }).fail(function (xhr, status) {
            console.log(status);
        });
    }
}

//删除
function del() {
    if (confirm("确认删除？")) {
        $.ajax({
            url: GetDel(),
            type: "post",
            data: {"ArtName": document.getElementById("title").value},
            dataType: "json"
        }).done(function () {
            window.open(GetArt() + "AblogManager");
        }).fail(function (xhr, status) {
            console.log(status);
        });
    }
}

//适应小屏
function MoreDevices() {
    var width = document.body.clientWidth;
    if (width < 1100) {
        $('.Body').css({"width": "100%"});
        $('#article-ti,#article').css({
            "width": "90%",
            "margin": "20px auto 20px auto",
        });
    }
}
