<?php 
require_once '../include/DB_Functions.php';
$db = new DB_Functions();
    $corr_flag = 'C0ngRatS_y0u_g0t_tHis';
    $corr_flag_1 = 'C0ngRatS_y0u_ g0t_tHis';

    session_start();

    if(isset($_SESSION['team_name']) && isset($_SESSION['id'])) {
        $result['session_status']=true;
        if(isset($_POST['team_name']) && isset($_POST['flag'])){
            $team_name = $_POST['team_name'];
            $flag_sub = $_POST['flag'];
            if($flag_sub == $corr_flag || $flag_sub == $corr_flag_1){
                $result['is_correct']=true;
            }else{
                $result['is_correct']=false;
            }
        }else if(isset($_POST['team_name'])){
            $team_name = $_POST['team_name'];
            $result['success'] = $db->questionAnswered($team_name,14);
        }
    }else{
        $result['session_status']=false;
    }

    echo json_encode($result);
?>
