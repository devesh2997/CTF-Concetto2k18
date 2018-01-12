<?php
require_once('connect.php');
?>
<?php
$queryboard = "SELECT * FROM teams ORDER BY solved DESC , time limit 14";
$resultbliss=mysqli_query($link,$queryboard);
while ($row=mysqli_fetch_assoc($resultbliss)) {
echo "<li><mark>". $row['team_name']."</mark><small>". $row['solved']."</small></li>";
}
?>