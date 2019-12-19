<?php
# 通过type来区别数据库操作的类型：
# type = add  添加
# type = del  删除
# type = clear 清理
# type = update 更新
# type = get    获取

$db = mysqli_connect("127.0.0.1", "root", "", "miui");
mysqli_set_charset($db, 'utf8');

$type = $_REQUEST["type"];
if ($type == "add") {
  $n = $_REQUEST["num"];
  echo $n;
  $good_id = $_REQUEST["good_id"];

  /* 检查之前是否存在对应的数据，如果存在那么就修改num值，如果不存在那么就插入数据 */
  $sql = "SELECT * FROM cart WHERE good_id = $good_id";
  $result = mysqli_query($db, $sql);
  // echo json_encode($result);
  if (mysqli_num_rows($result) == 0) {
    /* 往数据库表中新增一条数据 */
    $sql = "INSERT INTO `cart` (`cart_id`, `good_id`, `num`) VALUES (NULL, $good_id, $n)";
  } else {
    /* 更新数据 */
    $sql = "UPDATE `cart` SET `num`= `num`+ $n WHERE `good_id`=$good_id";
  }
  $res = mysqli_query($db, $sql);
  echo json_encode(array("status" => "success"));
} elseif ($type == "get") {

  /* 查询数据库-cart表中所有的数据，并按照店铺来进行分类 */
  $resData = array("status" => "success", "data" => array());
  $sql = "SELECT cart.*,getdetails.info,getdetails.src,getdetails.price FROM cart , getdetails WHERE cart.good_id = getdetails.good_id";
  $data = mysqli_fetch_all(mysqli_query($db, $sql), MYSQLI_ASSOC);
  /* 遍历，根据数据来调整结构 */
  // print_r($data);
  # 处理店铺信息(把购物车中所有的店铺名称都保存到数组中)
  // $stores = array();
  // for ($i = 0; $i < count($data); $i++) {
  //   /* 获取当前数据的店铺名称 */
  //    $currentShopName = $data[$i]["shopName"];
  //    /* 检查数组中该店铺名称是否存在，如果不存在那么就添加到数组 */
  //    if(!in_array($currentShopName,$stores))
  //    {
  //       $stores[] = $currentShopName;
  //    }
  // }
  // # 处理JSON数据的外部结构
  // $res_data = array("status"=>"success","data"=>array());
  // // print_r($res_data);
  // for ($i = 0; $i < count($stores); $i++) {
  //   $res_data["data"][$i] = array("store" => $stores[$i], "goods" => array());
  // }

  // // # 把数据处理为指定的格式以便返回
  // for ($i = 0; $i < count($data); $i++) {
  //   /* 获取当前数据的店铺名称 */
  //   $currentShopName = $data[$i]["shopName"];
  //   for ($j = 0; $j < count($res_data["data"]); $j++) {
  //     if($res_data["data"][$j]["store"] == $currentShopName)
  //     {
  //       $res_data["data"][$j]["goods"][]= $data[$i];
  //     }
  //   }

  echo json_encode($data, true);

  // 添加
} elseif ($type == "update") {
  $sign = $_REQUEST["flag"];
  // echo $sign;
  $good_id = $_REQUEST["id"];
  if ($sign == "add") {
    $plusSql = "UPDATE `shopcar` SET `num`= `num`+ 1 WHERE `goods_id`=$good_id";
    mysqli_query($db, $plusSql);
  } elseif ($sign == "remove") {
    $reduceSql = "UPDATE `shopcar` SET `num`= `num`- 1 WHERE `goods_id`=$good_id";
    mysqli_query($db, $reduceSql);
  }
  echo json_encode(array("status" => "success"), true);
}

// 删除
elseif ($type == "del") {
  $good_id = $_REQUEST["id"];
  $delSql = "DELETE FROM `shopcar` WHERE goods_id = $good_id";
  mysqli_query($db, $delSql);
  echo json_encode(array("status" => "success"), true);
}

#   清空操作 $removeSql = "TRUNCATE table `cart`";
#   删除操作 $delSql = "DELETE FROM `cart` WHERE good_id = $good_id";
