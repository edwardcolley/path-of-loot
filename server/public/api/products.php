<?php

header('Content-Type: application/json');
require('functions.php');

set_exception_handler('handleError');

require_once('db_connection.php');

// throw new Exception('Error');

$query = "SELECT * FROM `products`";
$result = mysqli_query($conn, $query);

if(!$result) {
  throw new Exception('error with query: '.mysqli_error($conn));
}

$data= [];
while($row = mysqli_fetch_assoc($result)) {
  $data[] = $row;
}

print(json_encode($data));
?>
