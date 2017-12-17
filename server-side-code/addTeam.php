<?php
/**
 *@author Devesh Anand
 *to check if a team name is available or not.
 **/

 require_once 'include/DB_Functions.php';
 $db = new DB_Functions();


 if(isset($_POST['team_name']) && $_POST['team_name']!="" ){
   $team_name = $_POST['team_name'];

   $result = $db->isTeamNameAvailable($team_name);

   if($result){
     $response["isAvailable"]=true;
     $response["result"]=$db->addTeam($team_name);
   }else{
     $response["isAvailable"]=false;
   }

   echo json_encode($response);


 }

?>
