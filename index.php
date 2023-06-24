<?php 

$title = "HOMEPAGE";
$styleCss = "css/index.css";

require "headers.php";

$allProduct = query("SELECT * FROM allcoffee");
$allReview = query("SELECT * FROM review_cust");


?>

<?php require "header.php"; ?>
<main>

    <div class="rotateCoffee">
        <i class="fa-solid fa-mug-hot"></i>
    </div>

    <section id="sectionFirst" data-scroll="1">
        <div id="sectionFirstCtn" class="container">
            <div class="leftSectFirstCtn">
                <div class="myCoffee">
                    <h2>MyCoffee</h2>
                </div>
                <div class="textH3">
                    <h3>Coffee with an authentic, old taste</h3>
                </div>
                <div class="buttonNav">
                    <a href="">Reservation</a>
                    <a href="">See our menu</a>
                </div>
            </div>
            <div class="rightSectFirstCtn">
                <div class="border"></div>
                <img src="images/coffee2.jpg" alt="New coffee variant">
                <div class="round">
                    <p>New variant</p>
                </div>
            </div>
        </div>
    </section>

    <section id="sectionSecond" data-scroll="2">
        <div id="sectionSecondCtn" class="container">
            <div class="leftSectSecondCtn">
                <img src="images/overview.jpg" alt="Overview our coffee shop">
            </div>
            <div class="rightSectSecondCtn">
                <div class="rightSecond">
                    <div class="ourSayTitle">
                        <h2>Our say</h2>
                    </div>
                    <div class="ourSayIntro">
                        <h3>Delicious coffee, is made with love</h3>
                    </div>
                    <div class="ourSayText">
                        <p>“You may prefer sweet tea. However, I am already synonymous with coffee and all its bitterness.”</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="ourSignatureMenuRoot">
        <div id="ourSignatureMenuCtnWr" class="container">
            <div class="titleOurSignatureMenu">
                <h3>Our signature menu</h3>
            </div>
            <div class="ourSignatureProductWr">

                <?php foreach($allProduct as $allProd) : ?>
                <div class="ourSignatureProduct">
                    <div class="topSignatureMenu">
                        <img src="images/<?php echo $allProd["image_co"] ?>" alt="Our signature menu">
                    </div>
                    <div class="bottomSignatureMenu">
                        <div class="nameProduct">
                            <p><?php echo $allProd["name_co"] ?></p>
                        </div>
                        <div class="tagAndPrice">
                            <p><?php echo $allProd["categories_co"] ?></p>
                            <div class="manyProduct">
                                <p>-</p>
                                <p>0</p>
                                <p>+</p>
                            </div>
                            <div class="priceSignature">
                                <span>$</span>
                                <span><?php echo $allProd["price_co"] ?></span>
                            </div>
                        </div>
                        <div class="viewAndAddToCart">
                            <a href="view-detail.php">View detail</a>
                            <button type="button" id="addToCart" current-price="<?php echo $allProd["price_co"]; ?>">Add to bag</button>
                        </div>
                    </div>
                </div>

                <?php endforeach; ?>

            </div>

            <div class="seeMore">
                <a href="menu.php">See all menu</a>
            </div>

        </div>

        <!-- <a style="background-color: white; padding: 10px; color: black;" href="logout.php" id="logout">logout</a> -->
    </section>


    <!-- customer review -->

    <section id="sectionReview">
        <div id="sectionCtn" class="container">
            <h3>Customer review</h3>

            <?php foreach( $allReview as $allRvw ) : ?>

            <div class="boxReview">
                <div class="leftReview">
                    <div class="leftReviewCtn">
                        <div class="topLeftReview">
                            <img src="images/<?php echo $allRvw["image_cust"] ?>" alt="">
                        </div>
                        <div class="bottomLeftReview">
                            <p><?php echo $allRvw["name_cust"] ?></p>
                            <p><?php echo $allRvw["work_cust"] ?></p>
                        </div>
                    </div>
                </div>
                <div class="rightReview">
                    <p><?php echo $allRvw["review_cust"]; ?></p>
                    <div class="reviewStars">
    
                        <?php for($i = 0; $i < 5; $i++): ?>
                            <i class="fa-solid fa-star"></i>
                        <?php endfor; ?>
    
                    </div>
                </div>
            </div>

            <?php endforeach; ?>

        </div>
    </section>


</main>

<?php include "emptybag.php"; ?>
<?php include "addedbag.php"; ?>
<?php include "footer.php"; ?>



<!-- my index script -->


<script>
    <?php include "js/functions.js"; ?>
</script>

<script>
    <?php include "js/header.js"; ?>    
</script>

<script>
    <?php include "js/index.js"; ?>
</script>
    
</body>
</html>