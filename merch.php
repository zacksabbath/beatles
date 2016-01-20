<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>The Beatles - Store</title>
    <meta name="description" content="The Beatles - Store" />
    <meta name="author" content="Zack Rose" />

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/modal.css" />
    <link rel="stylesheet" href="css/dropit.css" />
    <link rel="stylesheet" href="css/style.css" />

    <script src="js/jquery-2.1.4.js"></script>
    <script src="js/handlebars-v3.0.3.js"></script>
    <script src="js/modal.js"></script>
    <script src="js/sortElements.js"></script>
    <script src="js/dropit.js"></script>
    <script src="js/simpleCart.js"></script>
    <script src="js/simpleCart-config.js"></script>
    <script src="js/merch.js"></script>



    <script id="merch-template" type="text/x-handlebars-template">
    <div class="merchitem col-sm-12 col-md-6 col-lg-4 simpleCart_shelfItem {{#if is_soldout}}is_soldout{{/if}} type-{{info_type}}" data-id="{{id}}"=>
            <div class="title">{{info_title}}</div>
            <div class="item_name" style="display:none;">{{info_title}} [{{info_type}}]</div>

            <div class="merchthumb">

                {{#if itemdetail}}
                <a class = "itemdetail" href="images/merch/{{itemdetail}}" data-width="{{imagewidth}}" data-height="{{imageheight}}">
                {{/if}}

                {{#if thumbnail}}
                <img src="images/merch/{{thumbnail}}" />
                {{else}}
                <img src="images/merch/default_thumb.png" />
                {{/if}}

                {{#if itemdetail}}
                <span class="itemdetailtext">See Detail</span></a>
                {{else}}
                <span class="itemdetailtext">&nbsp;</a>
                {{/if}}

            </div>

            <div class = "info">
                    <!--div class="description">{{info_description}}</div-->
            </div>

            {{#if is_soldout}}
            <div class="input-group" >
            <div class="input-group-addon soldoutitem">SOLD OUT</div>
            </div>
            {{else}}

            <div class="input-group" >

              <!--div class="input-group-addon type">{{info_type}}</div-->
              <div class="input-group-addon price item_price">{{info_price}}</div>

                {{#if options}}
                <span class="input-group-addon select-group">
                  {{{splitoptions options}}}
                </span>
                {{/if}}

              <div class="input-group-btn">
              <button name="type" type="button" value="add" class="btn btn-success item_add pull-left">Add</button>
              </div>

          </div>
            {{/if}}
    </div>
  </script>

</head>
<body>
<?php include_once("analyticstracking.php") ?>

<main>
<?php include("header.php"); ?>

        <!-- This section is filled in dynamically -->
        <section class="primary">
            <header>
                    <h1>Beatles Store</h1>
            </header>

            <div class="merchoptionsnew">
              <div><!--div necessary for JS functionality (links must not be siblings of other sections) -->
                  <a href="#" class="merchselect merchlink blacklink" data-filter="Shirt">Shirts</a>
                  <a href="#" class="merchselect merchlink blacklink" data-filter="Vinyl">Vinyl</a>
                  <a href="#" class="merchselect merchlink blacklink" data-filter="CD">CDs</a>
                  <a href="#" class="merchselect merchlink blacklink" data-filter="Patch">Patches</a>
              </div>
            </div>

            <!--h2><a href="cart.php">Check Cart <span class = "label label-primary"><img src="images/paypal.png" height="20" vertical-align="middle" /></span></a></h2-->
            <h2><a href="cart.php" class="greenlink">
              <img src="images/shoppingcart.png" style="height: 1.25em;" vertical-align="middle">
              Cart:
              <span class="cartHeader">(<span class="simpleCart_quantity"></span> items)</span>
              </a>
              <img src="images/paypal-whitestroke.png" style="height:2em;" vertical-align="middle" />
            </h2>

            <div class="merchandise pre-scrollable"></div>

        </section>

<footer>
<p>&copy; Michael Jackson 2016</p>
</footer>

</main>
</body>
</html>
