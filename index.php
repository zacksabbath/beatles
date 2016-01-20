<!DOCTYPE html>
<html lang="en">
<head>
        <meta charset="utf-8">
        <title>The Beatles</title>
        <meta name="description" content="The Beatles">
        <meta name="author" content="Zack Rose">
        <link rel="stylesheet" href="css/style.css">
        <script src="js/jquery-2.1.4.js"></script>
        <script>
		$(document).ready(function() {
			$('a.siteintro').click(function(e){
				e.preventDefault();
				var urlBase = window.location.href.substring(0, location.href.lastIndexOf("/")+1)
				var gotolink = urlBase + $(this).attr('href');

				$("body").animate({backgroundColor: "#000000", opacity: 0 }, 1500, function() {
				  window.location = gotolink
				});

			});
		});
    </script>

</head>
<body class="siteintro">
<?php include_once("analyticstracking.php") ?>
<main>
	<a class="siteintro" href="main.php">
		<img src="images/backgrounds/beatles-background.jpg" />
	</a>
</main>

</body>
</html>
