<?php

header('Content-Type: application/json');
require('functions.php');

set_exception_handler('handleError');
startUp();

require_once('db_connection.php');

if (empty($_GET['id'])) {
  $query = "SELECT p.id, p.name, p.price, p.shortDescription, 
            (SELECT `image` FROM `images` WHERE `product_id` = p.id LIMIT 1) AS `image`
            FROM `products` AS p";
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
  $query = "SELECT p.id, p.name, p.price, p.shortDescription, 
	              GROUP_CONCAT(i.image) AS images
	              FROM `products` AS p
	              JOIN `images` AS i 
	              ON p.id = i.product_id 
                WHERE p.id = $id 
                GROUP BY p.id";
  $result = mysqli_query($conn, $query);

  $data = mysqli_fetch_assoc($result);
  
  if ($data === null) {
    throw new Exception('Invalid ID:' . $id);
  } else {
    $data['images'] = explode(",", $data['images']);
    print(json_encode($data));
  }
}
?>