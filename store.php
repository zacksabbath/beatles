<?php ob_start(); ?>

<html>
<body>
  <?php include_once("analyticstracking.php"); ?>
</body>
</html>

<?php
  header("Location: merch.php?type=Shirt");
  die();
?>
