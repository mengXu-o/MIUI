$(() => {
    /* 商品列表发送网络请求 */
    let typeVal = 'default';

    function netWork(a) {
        $.ajax({
            type: "post",
            url: "../server/sort_data.php",
            data: `typeVal=${a}`,
            success: function (data) {
                let dataLi = JSON.parse(data);
                // console.log(dataLi);
                renderUI(dataLi)
            }
        });

    }
    netWork(typeVal);
    /* 默认排序 */
    $(".sort-left").on("click", ".default", function () {
        typeVal = 'default';
        netWork(typeVal);
    })
    /* 价格升序 */
    $(".sort-left").on("click", ".rule", function () {
        typeVal = 'asc';
        netWork(typeVal);
    })

    /* 渲染UI */
    function renderUI(data) {
        // console.log(data);
        let index=1;
        let html = data.map((ele) => {
            return `
                <li class="list-goods" data-id="${index++}">
                <a class="big-pic">
                    <img src=${ele.src} alt="">
                </a>
                <p><a href="">${ele.title}</a></p>
                <div>
                    <span>${ele.price1} </span>
                    <s>${ele.price2}</s>
                </div>
                <i class="small-pic">
                    <img src=${ele.logo} alt="">
                </i>
                <img src=${ele.imgfq} alt="" class="fenqi">
            </li>`
        }).join("");
        $(".list-ul").html(html)
        /* 列表页跳转详情页的数据传递 */
        /* 遍历数组给每一个li添加点击事件 */
        // console.log($(".list-goods"));
        let oLis = $(".list-goods");
        for (let i = 0, len = oLis.length; i < len; i++) {
            let ele = oLis[i];
            ele.index = i;
            /* 添加点击事件 */
            $(ele).click(function () {
                let item = data[this.index];
                window.location.href = "./MIUI_detail.html?"+obj2QueryString(item);
                // console.log(item);
                
            })
        }
        /* 封装函数将被点击的对象的内容转换为查询字符串 */
        function obj2QueryString(o) {
            let arr = [];
            for (let key in o) {
                arr.push(`${key}=${o[key]}`)
            }
            return arr.join("&");
        }

    }

    /* 猜你喜欢 */
    $.ajax({
        type: "get",
        url: "../server/list_bottom.json",
        dataType: "json",
        success: function (response) {
            let like = response.map((ele) => {
                return `
                    <li>
                        <img src=${ele.src} alt="">
                        <p class="like_title">${ele.title}</p>
                        <p class="like_price">${ele.price1}</p>
                        <p class="like_good">${ele.pushgwc ? ele.pushgwc : ""}</p>
                        <p>加入购物车</p>
                    </li>`
            }).join("");
            $(".like_goods").html(`<ul class="like_goods_ul">${like}</ul>`)

            /* 选项卡切换 */
            $(".tog li").click(function () {
                $(this).children().addClass("tog_color");
                $(this).siblings().children().removeClass("tog_color");

                $(".like_goods_ul")[0].style.left = -1226 * $(this).index() + "px";
            })
        }
    });
})