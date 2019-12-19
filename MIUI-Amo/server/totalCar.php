<?php
/*链接数据库 */
$db = mysqli_connect("127.0.0.1", "root", "", "miui");

/*查询数据库 */
$resData = array("status" => "success", "data" => array());
$sql = "SELECT shopcar.*,list_data.src,list_data.title,list_data.price1 FROM shopcar,list_data WHERE shopcar.goods_id=list_data.id";
$data = mysqli_fetch_all(mysqli_query($db, $sql), MYSQLI_ASSOC);
// $result = mysqli_query($db, $sql);

/*把数据转为JSON并返回 */
echo json_encode($data, true);
