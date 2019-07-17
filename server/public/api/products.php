<?php

header('Content-Type: application/json');
require('functions.php');

set_exception_handler('handleError');
startUp();

require_once('db_connection.php');

if (empty($_GET['id'])) {
  $query = "SELECT * FROM `products`";
  $result = mysqli_query($conn, $query);
  
  if(!$result) {
    throw new Exception('error with query: ' . msqli_connect_error($conn));
  }
  
  $data= [];
  while($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
  }
  
  print(json_encode($data));
  
} else if (!is_numeric($_GET['id'])) {
  throw new Exception('id needs to be a number');

} else {
  $id = $_GET['id'];
  $query = "SELECT * FROM `products` WHERE `id`= " . $id;
  $result = mysqli_query($conn, $query);
  $info = mysqli_fetch_assoc($result);
  
  if ($info === null) {
    throw new Exception('Invalid ID:' . $id);
  } else {
    print(json_encode($info));
  }
}
?>