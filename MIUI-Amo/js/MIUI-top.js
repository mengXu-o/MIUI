$(() => {
    $(".down-load").hover(function () {
        $(".ewm").stop().slideDown(200);
    }, function () {
        $(".ewm").stop().slideUp(200)
    })
    $(".shopCar").hover(function () {
        $(this).css("color", "#ff6700");
        $(this).css("background", "white")
        $(".shopBox").stop().slideDown(200)
    }, function () {
        setTimeout(() => {
            $(this).css("color", "#b0b0b0");
            $(this).css("background", "#424242")
        }, 300)
        $(".shopBox").stop().slideUp(200)
    })

    /*  二阶导航栏*/
    $.ajax({
        type: "post",
        url: "../server/top-nav-data.php",

        success: function (data) {

            let fff = JSON.parse(data);
            console.log(fff);

            nav_list(fff);
        }
    });

    function nav_list(data) {
        let html_topLi = data.map((ele) => {
            return ele.map((e) => {
                return `
                    <li class="first">
                        <div class="nav_goods_img">
                            <img src=${e.src} width="160" height="110">
                        </div>
                        <div class="title">${e.title}</div>
                        <p class="price">${e.price}</p>
                    </li>`
            }).join("");
        })
        let html_nav = `<ul class="nav_goods_ul">${html_topLi}</ul>`;
        $(".nav-goods-box-sub").html(html_nav);
    }
    /* 添加鼠标移入事件 */
    let navLi_width = 1224;
    $(".nav li").mouseenter(function () {
        $(".nav-goods").css("height", "230px");
        $(this).mouseleave(function () {
            $(".nav-goods").css("height", "0px")
        });
        $(".nav-goods").mouseenter(function () {
            $(this).css("height", "230px");
            $(this).mouseleave(function () {
                $(".nav-goods").css("height", "0px");
            })
        });
        $(".serve").mouseenter(function () {
            $(".nav-goods").css("height", "0px");
        });
        $(".community").mouseenter(function () {
            $(".nav-goods").css("height", "0px")
        })
        let index = $(this).index();
        $(".nav_goods_ul")[0].style.left = -navLi_width * index + "px";
    })
})