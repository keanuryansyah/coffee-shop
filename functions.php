<?php 

session_start();

$conn = mysqli_connect("localhost", "root", "", "coffe_shop_db");

function query($data) {

    global $conn;
    $row = mysqli_query($conn, $data);
    $arrEmpty = [];

    while( $rows = mysqli_fetch_assoc($row) ) {

        $arrEmpty[] = $rows;

    }

    return $arrEmpty;
    

}

function login($data) {
    $username = $data["username"];
    $password = $data["password"];

    if( $username == "keanu" && $password == "keanu123" ) {

        $_SESSION["logined"] = true;
        $_SESSION["user"] = $username;


        header("Location: index.php");

    } else {
        echo "LOGIN GAGAL BOY!!";
        return false;
    }

    return $_SESSION["logined"];

}


if(isset($_SESSION["user"])) {
    
    // NEW USER DB NAME
    $newDbName = $_SESSION["user"] . "Db";

    // ROOT DB
    $dbRoot = mysqli_connect("localhost", "root", "");

    // CREATE DB 
    mysqli_query($dbRoot, "CREATE DATABASE $newDbName");

    $newConn = mysqli_connect("localhost", "root", "", $newDbName);

    // create table for userDb
    mysqli_query($newConn, "CREATE TABLE usercart (id_produk INT PRIMARY KEY AUTO_INCREMENT,
    image_produk VARCHAR(250),
    name_produk VARCHAR(250),
    categories_produk VARCHAR(250), 
    many_produk VARCHAR(250), 
    price_produk VARCHAR(250),
    original_price VARCHAR(250)
    ) ");

     function createdb($objekData) {

        global $newConn;

        for($i = 0; $i < count($objekData); $i++) {

            $image_produk = $objekData[$i]->imageOfProduct;
            $name_produk = $objekData[$i]->nameOfProduct;
            $categories_produk = $objekData[$i]->categoriesOfProduct;
            $many_produk = $objekData[$i]->manyOfProduct;
            $price_produk = $objekData[$i]->priceOfProduct;
            $original_price = $objekData[$i]->originalPriceOfProduct;

            $result = mysqli_query($newConn, "SELECT name_produk FROM usercart WHERE name_produk = '$name_produk' ");

            if(mysqli_num_rows($result)) {

                mysqli_query($newConn, "UPDATE usercart SET many_produk = many_produk + $many_produk, price_produk = price_produk + $price_produk WHERE name_produk = '$name_produk' ");

                $row = mysqli_query($newConn, "SELECT * FROM usercart");
                $arrEmpty = [];
        
                while($rows = mysqli_fetch_assoc($row)) {
                    $arrEmpty[] = $rows;
                }
        
        
                $test = $arrEmpty;
        
                return $test;

                return false;


            }

            mysqli_query($newConn, "INSERT INTO usercart VALUES (NULL, '$image_produk', '$name_produk', '$categories_produk', '$many_produk', '$price_produk', '$original_price')");



        }

        $row = mysqli_query($newConn, "SELECT * FROM usercart");
        $arrEmpty = [];

        while($rows = mysqli_fetch_assoc($row)) {
            $arrEmpty[] = $rows;
        }


        $test = $arrEmpty;

        return $test;


        


    }


}

function addtobag($dataProduk) {

    $image_produk = $dataProduk->image_produk;
    $name_produk = $dataProduk->name_produk;
    $categories_produk = $dataProduk->categories_produk;
    $manyItem_produk = $dataProduk->manyItem_produk;
    $price_produk = $dataProduk->price_produk;
    $original_price = $dataProduk->original_price;

    $user = $_SESSION["user"] . "db";

    $userConn = mysqli_connect("localhost", "root", "", $user);

    $result = mysqli_query($userConn, "SELECT name_produk FROM usercart WHERE name_produk = '$name_produk' ");

    if(mysqli_num_rows($result)) {

        mysqli_query($userConn, "UPDATE usercart SET many_produk = many_produk + $manyItem_produk, price_produk = price_produk + $price_produk WHERE name_produk = '$name_produk' ");

        return false;

    }
    
    mysqli_query($userConn, "INSERT INTO usercart VALUES(NULL, '$image_produk', '$name_produk', '$categories_produk', '$manyItem_produk', '$price_produk', '$original_price')");

}

function queryLogin($cartLogin) {

    $dbName = $_SESSION["user"] . "db";
    $userConn = mysqli_connect("localhost", "root", "", $dbName);

    $row = mysqli_query($userConn, $cartLogin);
    $arrEmpty = [];

    while($rows = mysqli_fetch_assoc($row)) {
        $arrEmpty[] = $rows;
    }

    return $arrEmpty;

} 


function updateitemplus($dataUpdatePlus) {

    $user = $_SESSION["user"] . "db";
    $userConn = mysqli_connect("localhost", "root", "", $user);

    $name_produk = $dataUpdatePlus->name_produk;
    $original_price = $dataUpdatePlus->original_price;

    mysqli_query($userConn, "UPDATE usercart SET price_produk = price_produk + $original_price, many_produk = many_produk + 1 WHERE name_produk = '$name_produk' ");


}








?>

