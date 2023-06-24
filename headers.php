<?php

ob_start();

require "functions.php";

if(isset($_SESSION["logined"])) {

    $check = true;    

} else {

    $check = false;

}





?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Coffee shop, low price coffee menu, delicious taste, open 24 hour"> 


    <title><?php echo $title; ?></title>

    <style>

        <?php require "css/global.css"; ?>
        <?php require "css/headStyle.css"; ?>
        <?php require "css/bag.css"; ?>
        <?php require $styleCss; ?>
        <?php require "css/footer.css"; ?>

    </style>

    <!-- font awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!--  -->

    <!-- google fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400&family=Roboto+Mono&family=Roboto:wght@300;400&display=swap" rel="stylesheet">


    <!--  -->

    

</head>
<body check="<?php echo $check; ?>">
