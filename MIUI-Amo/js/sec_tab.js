$(() => {
    $.ajax({
        type: "get",
        url: "../server/tab-nav.json",
        dataType: "json",
        success: function (tabData) {
            // UI渲染
            /* title列表 */
            let secNav_title = tabData.map(function (ele) {
                return `<li>${ele.title}</li>`
            }).join("");
            let secNav_ul = `<ul>${secNav_title}</ul>`;
            $(".subnav").html(secNav_ul);
            /* 商品选项卡 */
            let secNav_goods = tabData.map(function (e) {
                let oDiv = e.arr.map(function (Ele1) {
                    let oLi = Ele1.map(function (Ele2) {
                        return `
                            <a href="">
                            <li class="clearfix">
                                <img src=${Ele2.img} alt="">
                                <span>${Ele2.txt}</span>
                            </li></a>`
                    }).join("");
                    return `<ul>${oLi}</ul>`
                }).join("");
                return `<div class="subnav_goods_box">${oDiv}</div>`
            }).join("");
            $(".subnav_goods").html(secNav_goods);

            /* 添加鼠标移入移出事件 */
            $(".all-goods").mouseenter(function () {
                $(".subnav").css("display","block");
            })
            $(".subnav_goods_box").mouseleave(function(){
                $(".all-nav").css("display","none")
            })


            $(".subnav ul li").mouseenter(function () {
                $(".subnav_goods").css("z-index", "2");
                $(".subnav_goods_box").eq($(this).index()).show().siblings().hide()
            });

            $(".all-goods ").mouseleave(function () {
                $(".subnav_goods").css("z-index", "1");
                $(".subnav_goods_box").removeClass("block");
                $(".subnav_goods_box").hide();

            });


        }
    });
})