<?php
$goods_id = $_REQUEST["goods_id"];

/*连接数据库 */
$db = mysqli_connect("127.0.0.1", "root", "", "miui");

// print_r($arr);
/* 检查之前是否存在对应的数据，如果存在那么就修改num值，如果不存在那么就插入数据 */
$sql = "SELECT * FROM shopcar WHERE goods_id = $goods_id";
$result = mysqli_query($db, $sql);

if (mysqli_num_rows($result) == 0) {
    /* 往数据库表中新增一条数据 */
    $sql = "INSERT INTO `shopcar` (`cart_id`,`goods_id`,`num`) VALUES (null,$goods_id,1)";
} else {
    /* 更新数据 */
    $sql = "UPDATE `shopcar` SET `num`= `num`+ 1 WHERE `goods_id`=$goods_id";
};
$res = mysqli_query($db, $sql);
print_r($sql);
