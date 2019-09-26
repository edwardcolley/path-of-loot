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
  $query = "SELECT p.*, c.quantity, c.id as cart_id from products as p
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
  $query = "SELECT * FROM `cart` WHERE product_id = $itemConverted->id";
  $queryReturn = mysqli_query($conn, $query);
  $cartItem = mysqli_fetch_assoc($queryReturn);
  
  if ($cartItem !== null){
    $sql =  "UPDATE `cart` 
                SET `quantity` = `quantity` + $itemConverted->quantity 
                WHERE `product_id` = $itemConverted->id";
  
    $return_value = mysqli_query($conn, $sql);
    // $cart_id = mysqli_insert_id($conn);
  
    $itemConverted->cart_id = $cartItem["id"];
  
    print(json_encode([
        'success' => $return_value,
        'item' => $itemConverted
    ]));
  } else {
    $sql =  "INSERT INTO `cart` (product_id, quantity)
              VALUES ($itemConverted->id, $itemConverted->quantity)";
  
    $return_value = mysqli_query($conn, $sql);
    $cart_id = mysqli_insert_id($conn);
  
    $itemConverted->cart_id = $cart_id;
  
    print(json_encode([
        'success' => $return_value,
        'item' => $itemConverted
    ]));
    
  }
} else if ($method == 'DELETE'){
  $itemConverted = json_decode($item);
      $query = "DELETE FROM `cart` WHERE `product_id` = $itemConverted->product_id";
      
    
      $return_value = mysqli_query($conn, $query);
      $cart_id = mysqli_insert_id($conn);
    
      $itemConverted->cart_id = $cart_id;
    
      print(json_encode([
          'success' => $return_value,
          'item' => $itemConverted
      ]));
    
      if(!$return_value) {
        throw new Exception('Error: no deletion occured: '. mysqli_error($conn));
      } 
  // $itemConverted = json_decode($item);
  // $queryDelete = "SELECT `quantity` FROM `cart` WHERE product_id = $itemConverted->product_id";
  // $quantityQuery = mysqli_query($conn, $queryDelete);
  
  // $value = mysqli_fetch_array($quantityQuery);
  //   if ($value['quantity'] > 1){
  //     $sql =  "UPDATE `cart` 
  //                 SET `quantity` = `quantity` - 1 
  //                 WHERE `product_id` = $itemConverted->product_id";
    
  //     $return_value = mysqli_query($conn, $sql);
  //     $cart_id = mysqli_insert_id($conn);
    
  //     $itemConverted->cart_id = $cart_id;
    
  //     print(json_encode([
  //         'success' => $return_value,
  //         'item' => $itemConverted
  //     ]));
  //     if(!$return_value) {
  //       throw new Exception('Error: no deletion occured: '. mysqli_error($conn));
  //     } 
  //   } else {
  //     $itemConverted = json_decode($item);
  //     $query = "DELETE FROM `cart` WHERE `product_id` = $itemConverted->product_id";
      
    
  //     $return_value = mysqli_query($conn, $query);
  //     $cart_id = mysqli_insert_id($conn);
    
  //     $itemConverted->cart_id = $cart_id;
    
  //     print(json_encode([
  //         'success' => $return_value,
  //         'item' => $itemConverted
  //     ]));
    
  //     if(!$return_value) {
  //       throw new Exception('Error: no deletion occured: '. mysqli_error($conn));
  //     } 
  // }
  // if(mysqli_affected_rows($conn)>0) {
  // print(json_encode([
  //     'success' => $return_value
  // ]));
  // }
} else if ($method == 'PUT') {
  $itemConverted = json_decode($item);
  // $query = "SELECT * FROM `cart` WHERE product_id = $itemConverted->id";
  // $queryReturn = mysqli_query($conn, $query);
  // $cartItem = mysqli_fetch_assoc($queryReturn);

  if ($itemConverted->quantity > 0) {
    $sql =  "UPDATE `cart` 
                SET `quantity` = $itemConverted->quantity 
                WHERE `product_id` = $itemConverted->id";
    
    $return_value = mysqli_query($conn, $sql);
    $cart_id = mysqli_insert_id($conn);
    
    $itemConverted->cart_id = $cart_id;
    // $cart_id = mysqli_insert_id($conn);
    
    // $itemConverted->cart_id = $cartItem["id"];
    
    print(json_encode([
        'success' => $return_value,
        'item' => $itemConverted
    ]));
  } else {
      $query = "DELETE FROM `cart` WHERE `product_id` = $itemConverted->id";
      
    
      $return_value = mysqli_query($conn, $query);
      $cart_id = mysqli_insert_id($conn);
    
      $itemConverted->cart_id = $cart_id;
    
      print(json_encode([
          'success' => $return_value,
          'item' => $itemConverted
      ]));
    
      if(!$return_value) {
        throw new Exception('Error: no deletion occured: '. mysqli_error($conn));
      } 
  }

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
