<?php
/**
 *@author Devesh Anand
**/

 require_once 'include/DB_Functions.php';
 $db = new DB_Functions();


 if(isset($_POST['team_name']) && $_POST['team_name']!="" && isset($_POST['team_contacts']) && $_POST['team_contacts']!="" ){
   $team_name = $_POST['team_name'];
   $team_contacts = $_POST['team_contacts'];

   $result = $db->addTeamContact($team_name, $team_contacts);

   if($result){
     $response["success"]=true;
   }else{
     $response["success"]=false;
   }
   echo json_encode($response);
 }

?>
