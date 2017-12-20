<?php
/**
 *@author Devesh Anand
 *to check if a team name is available or not.
 **/

 require_once '../include/DB_Functions.php';
 $db = new DB_Functions();


 if(isset($_POST['team_name']) && $_POST['team_name']!="" ){
   $team_name = $_POST['team_name'];

   $response = $db->getNextQuestionId($team_name);

   
   echo json_encode($response);
 }

?>
