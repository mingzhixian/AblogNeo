var blur = 0;
//获取文章与评论
window.onload = function () {
    directory();
}

function SideBar() {
    $('.Body').css({ "filter": "blur(4px)" });
    $('#SideBarBody').css({"left":"0%"});
    blur = 1;
}

$(document).ready(function () {
    $('.Body').click(function () {
        if (blur == 1) {
            $('.Body').css({ "filter": "none" });
            $('#SideBarBody').css({"left":"-70%"});
            blur = 0;
        }
    });
});

//自动生成目录
function directory() {
    $("#ArtBody").find("h1,h2,h3,h4,h5,h6").each(function (i, item) {
        var tag = $(item).get(0).localName;
        $(item).attr("id", "p" + i);
        $("#ArtDir").append('<p><a class = "title-' + tag + ' anchor-link" onclick="GoTo(\'#p' + i + '\')" >' + $(this).text() + '</a></p>');
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
    $("html,body").animate({ scrollTop: $(link).offset().top }, 400);
}

//添加评论--待完成
function AddCom() {
    var Comtext = document.getElementById("ComText").value;
    if (BadCom(Comtext)) {
        alert("包含违规评论！");
    } else {
        $.ajax({
            url: "./SaveCom",
            type: "post",
            data: { "ArtName": getvl("article"), "ComText": Comtext },
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