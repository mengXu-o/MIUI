$(() => {
    $(".phone-num").val("");
    $(".password").val("");
    $(".password_two").val("");
    // 验证手机号
    $(".phone-num").blur(function () {
        let rule1 = /^1[3-9]\d{9}/;
        if ($(this).val().trim().length == 0) {
            $(this).addClass("error");
            $(".error-box").css("display", "block")
        } else if (rule1.test($(this).val().trim()) == false) {
            $(this).addClass("error");
            $(".error-box").css("display", "block");
            $(".error-box span").text("手机号码格式错误")
        } else if (rule1.test($(this).val().trim())) {
            $(this).removeClass("error");
            $(".error-box").css("display", "none");
        }
    })
    // 验证密码
    let mima = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
    $(".password").blur(function () {
        if ($(this).val().trim() == "") {
            $(this).addClass("err");
            $(".font_zero span").text("请输入密码");
            $(".font_zero").css("display", "block");
            $(".annotation").css("display", "none");
        }
        if (mima.test($(this).val().trim())) {
            $(this).removeClass("err");
        }
    })
    $(".password_two").blur(function () {
        if ($(this).val().trim() == "") {
            $(this).addClass("err");
            $(".font_zero span").text("请输入确认密码");
            $(".font_zero").css("display", "block");
            $(".annotation").css("display", "none");
        } else if ($(".password").val().trim() == $(this).val().trim()) {
            $(this).removeClass("err");
            $(".font_zero").css("display", "none");
            $(".annotation").css("display", "block");
        } else {
            $(".font_zero span").text("密码输入不一致");
        }
    })

    /* 发送网络请求注册 */
    $(".right-now").click(function () {
        $.ajax({
            type: "post",
            url: "../server/register.php",
            data: `phone=${$(".phone-num").val()}&password=${$(".password").val()}`,
            dataType: "json",
            success: function (data) {
                console.log(data);
                /* {status:"ok",data:{msg:"注册成功"}} */
                if (data.status == "success") {
                    window.location.href = "./MIUI_login.html";
                } else {
                    alert(data.data.msg)
                }
            }
        });
    })
})