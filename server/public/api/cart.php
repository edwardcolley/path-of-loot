<?php

header('Content-Type: application/json');
require('functions.php');

set_exception_handler('handleError');
startUp();

define('INTERNAL', true);
require_once('db_connection.php');
$method = $_SERVER['REQUEST_METHOD'];
$item = file_get_contents('php://input');

if ($method == 'GET') {
  $query = "SELECT p.*, c.id as cart_id from products as p
            right join cart as c on c.product_id = p.id";
  
  $result = mysqli_query($conn, $query);

  if(!$result) {
    throw new Exception('error with query: ' . msqli_connect_error($conn));
  }
  
  $data= [];
  while($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
  }
  print(json_encode($data));

} else if ($method == 'POST') {
  $itemConverted = json_decode($item);
  
  $sql =  "INSERT INTO `cart` (product_id)
            VALUES ($itemConverted->id)";

  $return_value = mysqli_query($conn, $sql);
  $cart_id = mysqli_insert_id($conn);

  // $cart_id = $return_value->insert_id;
  $itemConverted->cart_id = $cart_id;

  print(json_encode([
      'success' => $return_value,
      'item' => $itemConverted
  ]));
} else if ($method == 'DELETE'){
  http_response_code(204);
  $itemConverted = json_decode($item);
  $query = "DELETE FROM `cart` WHERE `id` = $itemConverted->cart_id";
  

  $return_value = mysqli_query($conn, $query);

  if(!$return_value) {
    throw new Exception('Error: no deletion occured: '. mysqli_error($conn));
  } 

  // if(mysqli_affected_rows($conn)>0) {
  // print(json_encode([
  //     'success' => $return_value
  // ]));
  // }
} else {
  http_response_code(404);
  print(json_encode([
    'error' => 'Not Found',
    'message' => "Cannot $method /api/cart.php"
  ]));
}

// require('functions.php');

// session_start();
// set_exception_handler('handleError');

// require('db_connection.php');

// switch($_SERVER) {
//   case "POST":
//     require('cart_add.php');
//     break;
//   case "GET":
//     require('cart_get.php');
//     break;
// }
?>
