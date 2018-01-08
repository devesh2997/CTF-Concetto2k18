<?php
/**
 *@author Devesh Anand
**/

 require_once 'include/DB_Functions.php';
 $db = new DB_Functions();


 if(isset($_POST['team_name']) && $_POST['team_name']!="" && isset($_POST['team_members']) && $_POST['team_members']!="" ){
   $team_name = $_POST['team_name'];
   $team_members = $_POST['team_members'];

   $result = $db->addTeamMembers($team_name, $team_members);

   if($result){
     $response["success"]=true;
   }else{
     $response["success"]=false;
   }
   echo json_encode($response);
 }

?>
