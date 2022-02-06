var blur = 0;
var SideBarWidth = 70;
//获取文章与评论
window.onload = function () {
    directory();
    MoreDevices();
}

function MoreDevices() {
    if (document.body.clientWidth > 1000) {
        SideBarWidth = 30;
        $('#SideBarBody').css({ "left": "-" + SideBarWidth + "%", "width": SideBarWidth + "%" });
        $('#ArtName').css({"font-size":"9rem"});
    }
}

function SideBar() {
    if (blur == 0) {
        $('.Body').css({ "filter": "blur(4px)" });
        $('#SideBarBody').css({ "left": "0%" });
        blur = 1;
    }
    else {
        $('.Body').css({ "filter": "none" });
        $('#SideBarBody').css({ "left": "-" + SideBarWidth + "%" });
        blur = 0;
    }
}

$(document).ready(function () {
    $('.Body').click(function () {
        if (blur == 1) {
            SideBar();
        }
    });
});

//自动生成目录
function directory() {
    $("#ArtBody").find("h1,h2,h3,h4,h5,h6").each(function (i, item) {
        var tag = $(item).get(0).tagName.substring(1);
        var prefix = "";
        for (let i = 0; i < parseInt(tag); i++) {
            prefix += "---";
        }
        $(item).attr("id", "p" + i);
        $("#ArtDir").append('|<p onclick="GoTo(\'#p' + i + '\')">' + prefix + $(this).text() + '</p>');
    });
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