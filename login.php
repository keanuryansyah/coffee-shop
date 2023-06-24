<?php 

$title = "LOGIN";
$styleCss = "css/login.css";

require "headers.php";

if(isset($_POST["login"])) {
    login($_POST);
}

if(isset($_SESSION["logined"])) {
    header("Location: index.php");
}




?>

<?php require "header.php"; ?>
<?php require "emptybag.php"; ?>


<main>

<section id="loginSection">
    <div id="loginCtnWr" class="container">
        <div class="loginBox">
            <div class="loginTitle">
                <h3>- MyCoffee Login -</h3>
                <p>To get more information about our restaurant, and to place an order. please login</p>
            </div>
            <div class="dataLogin">
                <form action="" method="post">
                    <ul>
                        <li>
                            <input type="text" name="username" placeholder="Enter your username...">
                        </li>
                        <li>
                            <input type="password" name="password" placeholder="Enter your password...">
                        </li>
                        <li>
                            <button type="submit" name="login">Login</button>
                        </li>
                    </ul>
                </form>
            </div>
            <div class="dontHaveAcc">
                <span>Don't have account?</span>
                <span><a href="signup.php">Signup now!</a></span>
            </div>
        </div>
    </div>
</section>

<a href="logout.php">logout</a>



</main>

<?php include "footer.php"; ?>

<script type="text/javascript">
    <?php include "js/functions.js"; ?>
</script>

<script type="text/javascript">
    <?php include "js/header.js"; ?>
</script>

<script type="text/javascript">
    <?php include "js/login.js"; ?>
</script>

</body>
</html> 