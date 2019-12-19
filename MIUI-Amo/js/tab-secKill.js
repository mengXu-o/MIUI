$(() => {
    /* tab选项卡 */
    $.ajax({
        type: "get",
        url: "../server/tab-nav.json",
        // data: "data",
        dataType: "json",
        success: function (data) {
            // UI渲染
            /* title列表 */
            let secNav_title = data.map(function (ele) {
                return `<li>${ele.title}</li>`
            }).join("");
            let secNav_ul = `<ul>${secNav_title}</ul>`;
            $(".subnav").html(secNav_ul);

            /* 商品选项卡 */
            let secNav_goods = data.map(function (e) {
                let oDiv = e.arr.map(function (Ele1) {
                    let oLi = Ele1.map(function (Ele2) {
                        return `
                            <a href="./MIUI_list.html">
                            <li class="clearfix">
                                <img src=${Ele2.img} alt="">
                                <span>${Ele2.txt}</span>
                            </li></a>`
                    }).join("");
                    return `<ul>${oLi}</ul>`
                }).join("");
                return `<div class="subnav_goods_box">${oDiv}</div>`
            }).join("");
            var oDiv = document.createElement("div");
            oDiv.className = "case";
            oDiv.innerHTML = secNav_goods;
            $(".subnav_goods").html(oDiv);
            /* 添加鼠标移入移出事件 */
            $(".subnav ul li").mouseenter(function () {
                $(".subnav_goods").css("z-index", "2");
                $(".subnav_goods_box")[$(this).index()].classList.add("block");
                $(".case").show()

                let oCase = document.querySelectorAll(".subnav_goods_box");
                oCase[$(this).index()].onmouseenter = function () {
                    $(".subnav_goods").css("z-index", "2");
                    oCase[$(this).index()].classList.add("block");
                    $(".case").show()
                }
                oCase[$(this).index()].onmouseleave = function () {
                    $(".subnav_goods").css("z-index", "1");
                    oCase[$(this).index()].classList.remove("block");
                    $(".case").hide()
                }
            });
            $(".subnav ul li").mouseleave(function () {
                $(".subnav_goods").css("z-index", "1");
                $(".subnav_goods_box").removeClass("block");
                $(".case").hide()
            });

            /* 小米闪购 */
            $.ajax({
                type: "post",
                url: "../server/secKill.php",
                success: function (response) {
                    let data = JSON.parse(response);
                    // console.log(data);
                    secKill(data);
                    /* 上边框随机颜色 */
                    function randomColor() {
                        var strT = "0123456789abcdef";
                        var numT = "#";
                        for (var i = 0; i < 6; i++) {
                            numT += strT[parseInt(Math.random() * (strT.length))]
                        }
                        return numT;
                    }
                    let oLis = document.querySelectorAll(".commodity ul li");
                    for (let i = 0, len = oLis.length; i < len; i++) {
                        oLis[i].style["border-top"] = `1px solid ${randomColor()}`
                    }
                    /* 设置定时器 */
                    let timerNum = 0;
                    setInterval(function () {
                        if (timerNum >= 5) {
                            timerNum = -1
                        }
                        timerNum++;
                        let togLeft = document.querySelector(".commodity ul");
                        togLeft.style.left = -994 * timerNum + "px";
                    }, 5000);
                    /* 添加鼠标点击事件 */
                    $(".smjantou_01").on("click", function () {
                        if (timerNum <= 1) {
                            timerNum = 1;
                        }
                        timerNum--;
                        let togLeft = document.querySelector(".commodity ul");
                        togLeft.style.left = -994 * timerNum + "px";
                    })
                    $(".smjantou_02").on("click", function () {
                        if (timerNum >= 4) {
                            timerNum = 4;
                        }
                        timerNum++;
                        let togLeft = document.querySelector(".commodity ul");
                        togLeft.style.left = -994 * timerNum + "px";
                    })
                }
            });
            /* UI渲染 */
            function secKill(data) {
                let html1 = data.map((ele) => {
                    return `
                    <li>
                        <img src=${ele.src} alt="">
                        <p class="title">${ele.title}</p>
                        <p class="desc">${ele.desc}</p>
                        <p class="price1">${ele.price1}元<s class="price2">${ele.price2}</s></p>
                    </li>`
                }).join("");
                let html = `<ul>${html1}</ul>`;
                $(".commodity").html(html)
            }
        }
    });
    /* 商品秒杀效果 */
    let target_time = "17:00";
    $(".countDown p").eq(0).text(target_time + "场");
    let dateT = `2019-12-22 ${target_time+":00"}`
    /* 设置定时器 */
    setInterval(function () {
        /* 将目标时间转换为时间戳 */
        let newDate = new Date(dateT);
        /* 获取当前时间的时间戳 */
        let nowDate = new Date();
        let resTime = newDate - nowDate;
        let h, f, s;
        h = tool(Math.floor(resTime / 1000 / 60 / 60 % 24));
        f = tool(Math.floor(resTime / 1000 / 60 % 60));
        s = tool(Math.floor(resTime / 1000 % 60));
        $(".countDown li").eq(0).text(h);
        $(".countDown li").eq(2).text(f);
        $(".countDown li").eq(4).text(s)

        function tool(num) {
            return ("0000" + num).slice(-2)
        }
    }, 1000)

    /* 视频部分 */
    $.ajax({
        type: "post",
        url: "../server/video.php",
        dataType: "json",
        success: function (data) {
            // console.log(data);
            video(data);
        }
    });

    function video(data) {
        let htmlVideo = data.map((ele) => {
            return `
                <li>
                    <img src=${ele.img} alt="">
                    <p>${ele.content}</p>
                </li>`
        }).join("")
        let htmlUl = `<ul class="clearfix">${htmlVideo}</ul>`;
        $(".video").html(htmlUl);
    }
})