<?php
/**
 *@author Devesh Anand
**/

 require_once 'include/DB_Functions.php';
 $db = new DB_Functions();


 if(isset($_POST['team_name']) && $_POST['team_name']!="" && isset($_POST['team_password']) && $_POST['team_password']!="" ){
   $team_name = $_POST['team_name'];
   $team_password = $_POST['team_password'];

   $result = $db->isTeamNameAvailable($team_name);

   if($result){
     $response["isAvailable"]=true;
     $response["result"]=$db->addTeam($team_name,$team_password);
   }else{
     $response["isAvailable"]=false;
   }
   echo json_encode($response);
 }

?>
