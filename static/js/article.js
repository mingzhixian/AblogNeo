var converter = new showdown.Converter({tables: true});
var ArtUrl = null;
var ComUrl = null;
var Broswse = null;
var Article = null;
//服务器后台地址
const CloudUrl = GetCloud();

//从链接获取文章名
function getvl(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
}

//初始化获取Url
function getUrl() {
    var tilte = getvl("article");
    if (tilte == null) {
        tilte = "欢迎来到LJ与鸣之弦的博客";
    }
    ArtUrl = CloudUrl + tilte + "&Url=ArtUrl";
    ComUrl = CloudUrl + tilte + "&Url=ComUrl";
    Broswse = "./GetBrowse.do?ArtName=" + tilte;
    document.getElementById("Title").innerHTML = tilte;
}

//获取文章与评论
window.onload = function () {
    MoreDevices();
    getUrl();
    $.ajax({
        url: ArtUrl,
        type: "get",
        dataType: "html"
    }).done(function (output) {
        ShowDown(output, "article", 1);
    }).fail(function (xhr, status) {
        console.log(status);
    });
    if (getvl("article") == null || getvl("article") === "欢迎来到LJ与鸣之弦的博客") {
        document.getElementById("comment").style.display = "none";
    } else {
        $.ajax({
            url: ComUrl,
            type: "get",
            dataType: "html"
        }).done(function (output) {
            ShowDown(output, "Com", 0);
        }).fail(function (xhr, status) {
            console.log(status);
        });
    }
    //浏览次数
    $.ajax({
        url: Broswse,
        type: "get",
        dataType: "json"
    }).done(function (output) {
        document.getElementById("Browse").innerHTML = "浏览次数：" + output.Browse;
    }).fail(function (xhr, status) {
        console.log(status);
    });
}

//适应小屏
function MoreDevices() {
    var width = document.body.clientWidth;
    if (width < 1100) {
        document.getElementsByClassName("Body")[0].style.width = "100%";
        document.getElementById("directory").style.float = "none";
        document.getElementById("article").style.float = "none";
        document.getElementById("comment").style.float = "none";
        document.getElementById("directory").style.margin = "0 auto 40px auto";
        document.getElementById("article").style.margin = "0 auto";
        document.getElementById("comment").style.margin = "40px auto 0 auto";
        document.getElementById("directory").style.width = "90%";
        document.getElementById("article").style.width = "90%";
        document.getElementById("comment").style.width = "90%";
        document.getElementById("directory").style.position = "static";
    }
}

//解析md文件并展示
function ShowDown(output, dom, IsDir) {
    var Dom = document.getElementById(dom);
    Dom.innerHTML = converter.makeHtml(output);
    if (IsDir === 1) {
        directory();
        Article = Dom.innerHTML;
    }
}

//自动生成目录
function directory() {
    $("#article").find("h1,h2,h3,h4,h5,h6").each(function (i, item) {
        var tag = $(item).get(0).localName;
        $(item).attr("id", "p" + i);
        $("#directory").append('<p><a class = "title-' + tag + ' anchor-link" onclick="GoTo(\'#p' + i + '\')" >' + $(this).text() + '</a></p>');
    });
    $(".title-h1").css("margin-left", 0);
    $(".title-h2").css("margin-left", 10);
    $(".title-h3").css("margin-left", 20);
    $(".title-h4").css("margin-left", 30);
    $(".title-h5").css("margin-left", 40);
    $(".title-h6").css("margin-left", 50);
}

//点击目录滚动到对应位置
function GoTo(link) {
    $("html,body").animate({scrollTop: $(link).offset().top}, 400);
}

//添加评论
function AddCom() {
    var Comtext = document.getElementById("ComText").value;
    if (BadCom(Comtext)) {
        alert("包含违规评论！");
    } else {
        $.ajax({
            url: GetAddCom(),
            type: "post",
            data: {"ArtName": getvl("article"), "ComText": Comtext},
            dataType: "json"
        }).done(function () {
            $.ajax({
                url: ComUrl,
                type: "get",
                dataType: "html"
            }).done(function (output) {
                ShowDown(output, "Com", 0);
                document.getElementById("ComText").value = "";
            }).fail(function (xhr, status) {
                console.log(status);
            });
        }).fail(function (xhr, status) {
            console.log(status);
        });
    }
}

//垃圾评论检测,包含违规词语则返回true
function BadCom(ComText) {
    var BadKey = ["傻逼", "混蛋", "傻缺", "傻B", "傻b", "呆子", "操你妈", "艹", "滚蛋", "滚你妈的"];
    for (key in BadKey) {
        if (ComText.indexOf(BadKey[key]) > -1) {
            return true;
        }
    }
    return false;
}

//黑白主题切换
function DayAndNight() {
    var select = document.getElementById("SetImg");
    var head = document.getElementsByTagName("head")[0];
    var color = [];
    var NewUrl = null;
    if (select.getAttribute("alt") === "night") {
        //网页背景颜色
        color[0] = "#262622";
        //文章标题、浏览次数字体颜色
        color[1] = "darkgray";
        //文章、评论、目录栏背景颜色
        color[2] = "#22211f";
        //文章、评论栏字体颜色
        color[3] = "#e4d6bd";
        //文章、评论、目录栏边框颜色
        color[4] = "#494843";
        //目录字体颜色
        color[5] = "darkgray";
        //目录字体选中颜色
        color[6] = "cadetblue";
        //底部声明颜色
        color[7] = "#bbbbbb";
        //提交按钮背景颜色
        color[8] = "#496f70";
        //提交按钮字体颜色
        color[9] = "aliceblue";
        //评论输入框背景颜色
        color[10] = "#2a2827";

        //博客图标
        document.getElementById("AblogImg").src = "resource/img/Ablog-night.svg";

        //网页设置图标
        document.getElementById("SetImg").src = "resource/img/set-night.svg";

        select.setAttribute('alt', 'day');
        NewUrl = "resource/css/github-markdown-night.css";

    } else if (select.getAttribute("alt") === "day") {
        //网页背景颜色
        color[0] = "#f2f8f2";
        //文章标题颜色
        color[1] = "#313131";
        //文章、评论、目录栏背景颜色
        color[2] = "#ecf3ee";
        //文章、评论栏字体颜色
        color[3] = "#3a3b3c";
        //文章、评论、目录栏边框颜色
        color[4] = "#696969";
        //目录字体颜色
        color[5] = "#16181a";
        //目录字体选中颜色
        color[6] = "cadetblue";
        //底部声明颜色
        color[7] = "black";
        //提交按钮背景颜色
        color[8] = "#719596";
        //提交按钮字体颜色
        color[9] = "#16181a";
        //评论输入框背景颜色
        color[10] = "#fcfffe";

        //博客图标
        document.getElementById("AblogImg").src = "resource/img/Ablog-day.svg";

        //网页设置图标
        document.getElementById("SetImg").src = "resource/img/set-day.svg";

        select.setAttribute('alt', 'night');
        NewUrl = "resource/css/github-markdown-day.css";
    }

    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = NewUrl;
    head.removeChild(head.lastChild);
    head.appendChild(link);

    $('body').css({"background-color": color[0]});
    $('#article,#comment,#directory').css({"background-color": color[2], "color": color[3], "border-color": color[4]});
    $('#ComText').css({"background-color": color[10]});
    $('#Title,#Browse').css({"color": color[1]});
    $('#directory a').css({"color": color[5]});
    $('#directory a:hover').css({"color": color[6]});
    $('.Bottom').css({"color": color[7]});
    $('#ComSub').css({"color": color[9], "background-color": color[8]});
}