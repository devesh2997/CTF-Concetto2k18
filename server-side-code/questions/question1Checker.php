<?php
require_once '../include/DB_Functions.php';
$db = new DB_Functions();

    $flag['base_64'] = 'Q29uY2V0dG8gaXMgYXdlc29tZQ==';
    $flag['sha_256'] = 'C6DEDC01BEF1473F6E21D9FCE6ADD555C57EAB219AD2AE4C8A0288ABDB40A472';
    $flag['caeser'] = 'pbaprggb vf njrfbzr';
    $flag['vignere'] = 'ecaeimmc wf epxgqar';
    $flag['md_5'] = 'dc2c7045d49c80548d08c7a6d23cb79c';
    $flag['hex'] = '436F6E636574746F20697320617765736F6D65';
    //$flag['enigma'] = '';
    $flag['rot_13'] = 'pbaprggb vf njrfbzr';
    $flag['morse'] = '-.-. --- -. -.-. . - - --- / .. ... / .- .-- . ... --- -- .';

    session_start();

    if(isset($_SESSION['team_name']) && isset($_SESSION['id'])) {
        $result['session_status']=true;
        if(isset($_POST['team_name']) && isset($_POST['flag_type']) && isset($_POST['flag'])){
            $team_name = $_POST['team_name'];
            $flag_type = $_POST['flag_type'];
            $flag_sub = $_POST['flag'];
            $corr_flag = $flag[$flag_type];
            if($flag_type == 'rot_13'){
                if(strcasecmp($flag_sub,$corr_flag)==0){
                    $result['is_correct']=true;
                }else{
                    $result['is_correct']=false;
                }
            }else($flag_sub == $corr_flag){
                $result['is_correct']=true;
            }else{
                $result['is_correct']=false;
            }
        }else if(isset($_POST['team_name'])){
            $team_name = $_POST['team_name'];
            $result['success'] = $db->questionAnswered($team_name,1);
        }
    }else{
        $result['session_status']=false;
    }

    echo json_encode($result);

    
?>