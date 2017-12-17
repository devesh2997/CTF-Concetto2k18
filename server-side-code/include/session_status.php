<?php
/*status.php*/
session_start();
//Check for valid session. Exit from page if not valid.
if(isset($_SESSION['team_name']) && isset($_SESSION['id'])) {
    $result['status']=true;
    //echo json_encode($_SESSION);
    $result['team_name']=$_SESSION['team_name'];
    $result['id']=$_SESSION['id'];
}else{
    $result['status']=false;
}
echo json_encode($result);
?>