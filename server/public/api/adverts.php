<?php
header('Content-Type: application/json');
require('functions.php');

set_exception_handler('handleError');
startUp();

require_once('db_connection.php');
$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
  $query = "SELECT `path` FROM `adverts`";
  $result = mysqli_query($conn, $query);
  
  if(!$result) {
    throw new Exception('error with query: ' . msqli_connect_error($conn));
  }
  
  $data= [];
  while($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
  }
  
  print(json_encode($data));
}
?>