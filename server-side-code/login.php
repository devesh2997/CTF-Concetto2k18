<?php
/**
 *@author Devesh Anand
**/

 require_once 'include/DB_Functions.php';
 $db = new DB_Functions();


 if(isset($_POST['team_name']) && $_POST['team_name']!="" && isset($_POST['team_password']) && $_POST['team_password']!="" ){
   $team_name = $_POST['team_name'];
   $team_password = $_POST['team_password'];

   $result = $db->login($team_name,$team_password);

   if($result['success']){
    session_start();
    $_SESSION['team_name'] = $team_name;
    $_SESSION['id'] = 'test';
   }

   //echo json_encode($_SESSION);
   
   echo json_encode($result);
 }

?>
