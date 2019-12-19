$(() => {
    // 001-获取商品你列表传入的数据以及商品详情页的路径，转码并进行切割
    let search = decodeURI(window.location.search.slice(1));
    // 002-封装函数将查询字符串转化为对象
    function queryString2Obj(str) {
        var arr = str.split("&");
        var o = {};
        arr.forEach(function (ele) {
            var tmpArr = ele.split("=");
            var key = tmpArr[0];
            var val = tmpArr[1];
            o[key] = val;
        })
        // console.log(o);
        return o;
    }

    /* {
        id: "2"
        imgfq: "http://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/05c84c8d8ffebf7fd17c8838b5d81ee6.png"
        logo: "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1565614113.69785042.jpg"
        price1: "1399元"
        price2: ""
        src: "https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1565614113.69785042.jpg"
        title: "米家变频滚筒洗衣机1S 8kg 银色"
    } */

    // 003-将获取的参数传入函数获取对应的对象内容
    /* 将内容设置到标签上 */
    var obj = queryString2Obj(search);
    var oPic = document.querySelector(".pic").querySelector("img");
    oPic.src = obj.src;
    $(".right-title").text(obj.title);
    $(".new-price1").text(obj.price1);
    $(".old-price1").text(obj.price2);
    $(".new-price2").text(obj.price1);
    $(".new-price3").text(obj.price1);
    $(".content-title").text(obj.title);
    $(".goodsName p").text(obj.title);
    $(".goodsName2 p").text(obj.title);

    /* 吸顶效果 */
    window.onscroll = function () {
        if (window.scrollY >= 204) {
            $(".goodsName2").slideDown(300, function () {})
        }
        if (window.scrollY <= 204) {
            $(".goodsName2").slideUp(200, function () {})
        }
    }

    /* 喜欢点击事件 */
    $(".shop-like").click(function () {
        if ($(".icon-xin1").attr("value") == 1) {
            $(".icon-xin1").addClass("icon-xin").removeClass("icon-xin1");
            $(".icon-xin").attr("value", "2");
            $(".icon-xin").css("color", "red");
        } else {
            $(".icon-xin").attr("value", "1");
            $(".icon-xin").addClass("icon-xin1").removeClass("icon-xin");
            $(".icon-xin1").css("color", "");
        }
    })

    /* 给购物车添加点击事件 */
    $(".shop-car").click(function () {
        // console.log("+++");
        let goods_id = obj.id;
        console.log(goods_id);

        $.ajax({
            type: "post",
            url: "../server/shopCar.php",
            data: {
                goods_id,
            },
            dataType: "json",
            success: function (response) {

            }
        });
        window.location="./MIUI_shopcar.html"
    })

})