function BadKey(Text) {
    var BadKey = ["傻逼", "混蛋", "傻缺", "傻B", "傻b", "呆子", "操你妈", "艹", "滚蛋", "滚你妈的"];
    for (key in BadKey) {
        if (Text.indexOf(BadKey[key]) > -1) {
            return true;
        }
    }
    return false;
}