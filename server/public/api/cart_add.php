<?php

if(!INTERNAL){
    exit("no direct access allowed");
}

$id = getBodyData();


if (intval($id) <= 0) {
    throw new Exception ("Error: id is less than or equal to zero");
};

if ($_SESSION['cartId'] === 0) {
    $cardID = $_SESSION['cartId'];
} else {
    $cartID = false;
};

$query = 'SELECT `price` FROM `products` WHERE `id` ='. $cardID;
$result = mysqli_query($conn, $query);
$data = mysqli_fetch_assoc($result);

$rows = mysqli_num_rows($result);

if ($rows === null || $rows === 0) {
    throw new Exception ("Error: data was zero or null!");
} else {
    $productData = json_encode($rows);
}

mysqli_query($conn, "START TRANSACTION");
?> 