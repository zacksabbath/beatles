<!DOCTYPE html>
<html lang="en">
<head>
        <meta charset="utf-8" />
        <title>The Beatles - Shopping Cart</title>
        <meta name="description" content="Nekrofilth" />
        <meta name="author" content="Zack Rose" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha/css/bootstrap.min.css">
        <link rel="stylesheet" href="css/dropit.css" />
        <link rel="stylesheet" href="css/style.css" />
        <link rel="stylesheet" href="css/simplecart.css" />

        <script src="js/jquery-2.1.4.js"></script>
        <script src="js/dropit.js"></script>
        <script src="js/simpleCart.js"></script>
        <script src="js/simpleCart-config.js"></script>
</head>
<body>
<?php include_once("analyticstracking.php") ?>

<main>

<?php include("header.php"); ?>

        <section class="primary">
                <article>
                        <header>
                                <h1>Shopping Cart</h1>
                        </header>

                        <div class="simpleCart_items"></div>
                        <h3><a class="emptycart" href="javascript:;" style="color:white;">Empty Cart</a></h3>

                        <div class="beatlescart">
                          <h2>
                            SubTotal: <span id="simpleCart_total" class="simpleCart_total"></span> <br /><br />
                            Ship To: <select id="shippingLocation"> <option>USA</option><option>World</option> </select><br />
                            Shipping: <span id="simpleCart_shipping" class="simpleCart_shipping"></span> <br />
                            <hr />
                          </h2>

                          <h1 style="font-size:200%; margin-bottom:1.5em;">
                            Grand Total: <span id="simpleCart_grandTotal" class="simpleCart_grandTotal"></span>
                          </h1>

                          <h2><a href="javascript:;" class="simpleCart_checkout greenlink">Checkout</a></h2>
                          <h2><img src="images/paypal-whitestroke.png" style="height:1.5em; margin-top:1em;" vertical-align="middle" /></h2>
                        </div>

                        <!--a class="greenlink debug_action" href="javascript:;">Debug Button</a-->
                </article>
        </section>

        <footer>
        <p>&copy; Michael Jackson 2016</p>
        </footer>

</main>

</body>
</html>
