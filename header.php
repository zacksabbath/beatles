        <script>
                $(document).ready(function() {
                    $('nav.mainnav ul').dropit();
                });
        </script>
        <header class="logo">
                <h1>Nekrofilth</h1>
                <nav class="mainnav">
                        <ul class="mainul">
                                <li><a class="greenlink" href="main.php">Main</a>
                                    <ul class="dropit-submenu subnav">
                                        <li><a href="main.php">News</a></li>
                                    </ul>
                                </li>
                                 <li><a class="greenlink" href="store.php?directed=header">Store</a>
                                    <ul class="dropit-submenu subnav">
                                        <li><a href="merch.php?type=Shirt">Shirts</a></li>
                                        <li><a href="merch.php?type=Vinyl">Vinyl</a></li>
                                        <li><a href="merch.php?type=CD">CDs</a></li>
                                        <li><a href="merch.php?type=Patch">Patches</a></li>

                                    </ul>
                                </li>
                                <li>
                                  <a class="greenlink" id="cartButton" href="cart.php">
                                    <img src="images/shoppingcart.png" style="height: 1.5em;" vertical-align="middle">
                                    <span class="cartHeader">(<span class="simpleCart_quantity"></span>)</span>
                                  </a>
                                </li>
                        </ul>
                </nav>
        </header>
