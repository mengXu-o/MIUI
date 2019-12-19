$(() => {
    /* UI渲染 */
    function renderBuy(response) {
        let goods_box = response.map(function (ele, index) {
            // console.log(ele);
            return `
                    <div class="goods clearfix" gata-id="${ele.goods_id}">
                    <input type="checkbox" name="" class="select${index}">
                    <div class="goodsImg">
                        <img src=${ele.src} alt="">
                    </div>
                    <div class="myGoodsId">
                        <p>${ele.title}</p>
                    </div>
                    <div class="myGoodsPrice">
                        <p>${ele.price1}元</p>
                    </div>
                    <div class="addAndRemove">
                        <p class="remove">-</p>
                        <p class="num">${ele.num}</p>
                        <p class="add">+</p>
                    </div>
                    <div class="subtotal">
                        <p>${(ele.price1).slice(0,-1)*(ele.num)}元</p>
                    </div>
                    <div class="Del">
                        <i class="iconfont icon-shanchu"></i>
                    </div>
                </div>`
        }).join("");
        $(".myGoods").html(goods_box);


    }

    /* 发送网络请求 */
    function Buy() {
        $.ajax({
            type: "get",
            url: "../server/totalCar.php",
            dataType: "json",
            success: function (response) {
                // 渲染
                renderBuy(response);
                // 全选
                var allCheck = $("#checkAll");
                var sure = $(".goods :checkbox");

                allCheck.on("click", function () {
                    sure.prop("checked", $(this).prop("checked"));
                })
                $("#checkAll").click(function () {
                    let allSure = document.querySelector("#checkAll").checked

                    /*全选总计 */
                    if (allSure == false) {
                        $(".total span").text("0")
                    } else {
                        let goods = document.querySelectorAll(".goods")
                        let inAll = 0;
                        for (var i = 0, len = goods.length; i < len; i++) {
                            let a = parseInt($(".goods").eq(i).children(".subtotal").children().text())
                            inAll = inAll + a
                        }
                        $(".total span").text(inAll)
                    }

                    /*已选择多少商品的状态变化 */
                    goods_count_02()
                })
                /* 默认总计 */
                let allConfirm = document.querySelector("#checkAll").checked;
                if (allConfirm == false) {
                    $(".total span").text("0");
                }

                /* 子复选框 */
                $(".goods input").click(function () {
                    let index = $(this).parents().index();
                    let check = document.querySelector(`.select${index}`).checked;
                    let m = parseInt($(this).siblings(".subtotal").children().text());
                    let n = parseInt($(".total span").text());
                    if (check == true) {
                        $(".total span").text(n + m);
                    } else {
                        $(".total span").text(n - m);
                    }
                    /*已选择多少商品的状态变化 */
                    goods_count_02()
                })

                /* 商品数量减*/
                $(".remove").click(function () {
                    let price = parseInt($(this).parents(".addAndRemove").siblings(".myGoodsPrice").children().text())
                    let num = $(this).siblings(".num").text();
                    if (num <= 1) {
                        return
                    } else {
                        num--
                    }
                    $(this).siblings(".num").text(num);
                    /* 小计 */
                    $(this).parents(".addAndRemove").siblings(".subtotal").children().text(price * num + "元")
                    flag = "remove";
                    id = $(this).parent().parent().attr('gata-id');
                    console.log(id);

                    $.ajax({
                        url: "../server/cart.php",
                        data: {
                            type: "update",
                            flag,
                            id
                        },
                        // dataType: "dataType",
                        success: function (response) {
                            // console.log(response);

                        }
                    });
                })
                /* 商品数量加*/
                $(".add").click(function () {
                    let price = parseInt($(this).parents(".addAndRemove").siblings(".myGoodsPrice").children().text())
                    let num = $(this).siblings(".num").text();
                    num++;
                    $(this).siblings(".num").text(num);
                    /* 小计 */
                    $(this).parents(".addAndRemove").siblings(".subtotal").children().text(price * num + "元")
                    flag = "add";
                    id = $(this).parent().parent().attr('gata-id');
                    console.log(id);

                    $.ajax({
                        url: "../server/cart.php",
                        data: {
                            type: "update",
                            flag,
                            id
                        },
                        // dataType: "dataType",
                        success: function (response) {
                            // console.log(response);

                        }
                    });
                })

                /*删除 */
                $(".Del").click(function () {
                    let id = $(this).parents(".goods").attr("gata-id")

                    $.ajax({
                        url: "../server/cart.php",
                        data: {
                            type: "del",
                            id
                        },
                        success: function (response) {

                        }
                    });
                    window.location.href = "MIUI_shopcar.html";
                })
                goods_count();
                /* 共多少件 */
                function goods_count() {
                    let goods_count = $(".goods").length
                    $(".goods_count").text(goods_count)
                }
            

                /*已选择几件商品 */
                function goods_count_02() {
                    let checkbox_gouxuan = $(".goods input[type=checkbox]:checked").length
                    $(".selected").text(checkbox_gouxuan)
                }
            }
        });
    }
    Buy();

})