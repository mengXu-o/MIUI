<?php
header("Content-Type:text/html;charset=utf-8");
/*链接数据库 */
$db = mysqli_connect("127.0.0.1", "root", "", "miui");
// $conn->set_charset('utf8');
/*查询数据库 */
$sql = "SELECT * FROM secKill";
$result = mysqli_query($db, $sql);

/*把数据转为JSON并返回 */
$data = mysqli_fetch_all($result, MYSQLI_ASSOC);
$num=json_encode($data,true);
echo $num;
