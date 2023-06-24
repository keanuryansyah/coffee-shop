<?php 

require "functions.php";


// ADD TO BAG IF USER LOGINED

if(isset($_GET["addtobag"])) {

    $dataProduk = json_decode($_GET["addtobag"]);

    addtobag($dataProduk);

    
}

// ITEM UPDATE PLUS

if(isset($_GET["objekPlus"])) {

    $dataUpdatePlus = json_decode($_GET["objekPlus"]);

    updateitemplus($dataUpdatePlus);
}

// IF USER LOGINED BUT NOT BRING DATA

$test = queryLogin("SELECT * FROM usercart");
$emptyArr = [];
foreach($test as $price) {
    $arr = $price["price_produk"];
    array_push($emptyArr, $arr);
}

$price = array_sum($emptyArr);

// IF USER LOGINED AND BRING DATA

if(isset($_GET["objek"])) {

    $objek = json_decode($_GET["objek"]);
    $test = createdb($objek);
    $emptyArr = [];

   foreach($test as $price) {
    $arr = $price["price_produk"];

    array_push($emptyArr, $arr);

    
}

$price = array_sum($emptyArr);   

}


?>

<?php if($test != []) : ?>

<div id="sectionItem">
            <div class="orderAndEdit">
                <span>Order</span>
                <span>Edit</span>
            </div>
            <div class="orderItemPr">

                <?php foreach($test as $t) : ?>
                <div class="orderItemChild">
                                    <div class="leftItemChild">
                                        <img src="<?php echo $t["image_produk"]; ?>" alt="">
                                    </div>
                                    <div class="rightItemChild">
                                        <div class="nameAndCategories">
                                            <p><?php echo $t["name_produk"]; ?></p>
                                            <p><?php echo $t["categories_produk"]; ?></p>
                                        </div>
                                        <div class="editItem">
                                            <p current-price="<?php echo $t["original_price"] ?>">-</p>
                                            <p><?php echo $t["many_produk"]; ?></p>
                                            <p current-price="<?php echo $t["original_price"] ?>">+</p>
                                        </div>
                                        <div class="priceItemBag">
                                            <span>$</span>
                                            <span><?php echo $t["price_produk"]; ?></span>
                                        </div>
                                    </div>
                                </div>
                <?php endforeach; ?>

            </div>
            <div class="allPayment">
                <div class="subtotalWr">
                    <span class="subtotalText">Subtotal:</span>
                    <div class="subtotalPrice">
                        <span>$</span>
                        <span><?php echo $price; ?>0</span>
                    </div>
                </div>
                <div class="shippingWr">
                    <span class="shippingText">Shipping:</span>
                    <div class="shippingPrice">
                        <span>$</span>
                        <span>5.12</span>
                    </div>
                </div>
                <div class="totalPaymentWr">
                    <span class="totalPaymentText">Total:</span>
                    <div class="totalPaymentPrice">
                        <span>$</span>
                        <span><?php echo $price; ?>0</span>
                    </div>
                </div>
                <div class="checkOutButton">
                    <a href="checkout.php">Checkout now!</a>
                </div>
            </div>
            <div class="closeSectionCart">
                <p>X</p>
            </div>
        </div>

        <?php else: ?>
            <div id="sectionItem">
            <div class="orderAndEdit">
                <span>Order</span>
                <span>Edit</span>
            </div>
            <div class="orderItemPr">

                <div class="textEmpty">
                    <h2>Your bag is empty(0), please shop first...</h2>
                </div>

            </div>
            <div class="allPayment">
                <div class="subtotalWr">
                    <span class="subtotalText">Subtotal:</span>
                    <div class="subtotalPrice">
                        <span>$</span>
                        <span>0.00</span>
                    </div>
                </div>
                <div class="shippingWr">
                    <span class="shippingText">Shipping:</span>
                    <div class="shippingPrice">
                        <span>$</span>
                        <span>0.00</span>
                    </div>
                </div>
                <div class="totalPaymentWr">
                    <span class="totalPaymentText">Total:</span>
                    <div class="totalPaymentPrice">
                        <span>$</span>
                        <span>0.00</span>
                    </div>
                </div>
                <div class="checkOutButton">
                    <a href="shop.php">Shop now!</a>
                </div>
            </div>
            <div class="closeSectionCart">
                <p>X</p>
            </div>
        </div>

<?php endif; ?>


