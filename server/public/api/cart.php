<?php
header('Content-Type: application/json');
require('functions.php');
set_exception_handler('handleError');
startUp();
define('INTERNAL', true);
require_once('db_connection.php');

session_start();


if(empty($_SESSION['sessionID'])) {
  $sessionID = false;
} else {
  $sessionID = $_SESSION['sessionID'];
}

if($sessionID === false) {
$insertQuery = "INSERT INTO `cart_session` 
                SET `session` = NOW()"; 
$cart = mysqli_query($conn, $insertQuery);


if(!$cart) {
    throw new Exception('Failed to create cart: '. mysqli_error($conn));
}
$sessionID = mysqli_insert_id($conn);
$_SESSION['sessionID'] = $sessionID; 
}


$method = $_SERVER['REQUEST_METHOD'];
$item = file_get_contents('php://input');

if ($method == 'GET') {

  $query = "SELECT p.*, c.quantity, c.id as cart_id from products as p
            right join cart as c on c.product_id = p.id
            where c.sessionID = $sessionID";
  
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
                SET `quantity` = `quantity` + $itemConverted->quantity,
                    `sessionID` = $sessionID
                WHERE `product_id` = $itemConverted->id";
  
    $return_value = mysqli_query($conn, $sql);
    $itemConverted->cart_id = $cartItem["id"];
  
    print(json_encode([
        'success' => $return_value,
        'item' => $itemConverted
    ]));
  } else {
    $sql =  "INSERT INTO `cart` (product_id, quantity, sessionID)
              VALUES ($itemConverted->id, $itemConverted->quantity, $sessionID)";
  
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
      $query = "DELETE FROM `cart` 
                WHERE `product_id` = $itemConverted->product_id
                AND `sessionID` = $sessionID";
      
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
} else if ($method == 'PUT') {
  $itemConverted = json_decode($item);
  if ($itemConverted->quantity > 0) {
    $sql =  "UPDATE `cart` 
                SET `quantity` = $itemConverted->quantity 
                WHERE `product_id` = $itemConverted->id
                AND `sessionID` = $sessionID";
    
    $return_value = mysqli_query($conn, $sql);
    $cart_id = mysqli_insert_id($conn);
    
    $itemConverted->cart_id = $cart_id;
    print(json_encode([
        'success' => $return_value,
        'item' => $itemConverted
    ]));
  } else {
      $query = "DELETE FROM `cart` 
                WHERE `product_id` = $itemConverted->id
                AND `sessionID` = $sessionID";
      
    
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
?>