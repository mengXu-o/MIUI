$(() => {
    /* 给标签添加鼠标划入事件 */
    $(".title li").hover(function () {
        $(this).addClass("titleColor").siblings().removeClass("titleColor")
    }, function () {
        $(this).removeClass("titleColor")
    })
    /* 给标签添加鼠标点击事件 */
    $(".title li").click(function () {
        $(this).addClass("titleColorSub").siblings().removeClass("titleColorSub");
        $(".cut").eq($(this).index()).addClass("cur").siblings().removeClass("cur");
    })

    /* 点击登录发送网络请求 */
    $(".register").click(function () {
        let phoneID = $(".logInID").val();
        let password = $(".password").val();
        $.ajax({
            type: "post",
            url: "../server/login.php",
            data: `phoneID=${phoneID}&password=${password}`,
            dataType: "json",
            success: function (response) {
                /* 登录成功 */
                if(response.status=="success"){
                    window.location.href="./MIUI_home.html"
                }else{
                    /* 登录失败 */
                    alert(response.data.msg);
                }
            }
        });
    })
})