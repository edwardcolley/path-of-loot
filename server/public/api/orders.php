<?php
require('functions.php');
require_once('db_connection.php');
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
$order = file_get_contents('php://input');

session_start();

$sessionID = $_SESSION['sessionID'];

if ($method != 'POST') {
  http_response_code(404);
  print(json_encode([
    'error' => 'Not Found',
    'message' => "Cannot $method /api/orders.php"
  ]));
} else {
  http_response_code(201);
  print($order);

  $query = "DELETE FROM `cart` WHERE `sessionID` = $sessionID";
  $return_value = mysqli_query($conn, $query);
  
  if(!$return_value) {
    throw new Exception('Error: no deletion occured: '. mysqli_error($conn));
  }
}
