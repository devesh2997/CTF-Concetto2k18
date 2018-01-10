<?php
require_once('connect.php');
?>
<?php
$queryboard = "SELECT * FROM trialmenu";
$resultbliss=mysqli_query($link,$queryboard);
  while ($row=mysqli_fetch_assoc($resultbliss)) {
echo "<li><mark>". $row['item']."</mark><small>". $row['price']."</small></li>";

}
?>