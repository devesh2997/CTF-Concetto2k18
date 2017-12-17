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
 }else if(isset($_POST['team_members']) && $_POST['team_members']!=""){
    $team_members = $_POST['team_members'];
  
    $result = $db->addTeamMembers($team_members);
  
    echo json_encode($result);
 }else if(isset($_POST['team_contact']) && $_POST['team_contact']!=""){
  $team_contact = $_POST['team_contact'];

  $result = $db->isTeamNameAvailable($team_contact);
  echo json_encode($result);
}

?>
