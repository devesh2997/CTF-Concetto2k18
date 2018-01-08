<?php
/*status.php*/
session_start();
require_once 'DB_Functions.php';
$db = new DB_Functions();
//Check for valid session. Exit from page if not valid.
if(isset($_SESSION['team_name']) && isset($_SESSION['id'])) {
    $result['status']=true;
    //echo json_encode($_SESSION);
    $result['team_name']=$_SESSION['team_name'];
    $result['id']=$_SESSION['id'];
    $team_members = $db->getTeamMembers($_SESSION['team_name']);
    $team_contacts = $db->getTeamContacts($_SESSION['team_name']);
    if(!$team_members){
        $result['team_members'] = $team_members;
    }else{
        $result['team_members'] = null;
    }
    if(!$team_contacts){
        $result['team_contacts'] = $team_contacts;
    }else{
        $result['team_contacts'] = null;
    }
    
    

}else{
    $result['status']=false;
}
echo json_encode($result);
?>