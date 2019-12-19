$(() => {
    $.ajax({
        type: "get",
        url: "../server/info.php",
        dataType: "json",
        success: function (data) {
            let lbt = new LBT(data);
            lbt.init();
        }
    })
})