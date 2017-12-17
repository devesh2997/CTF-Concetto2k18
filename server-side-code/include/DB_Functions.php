<?php 

    class DB_Functions {
        
        private $conn;
    
        // constructor
        function __construct() {
            require_once 'DB_Connect.php';
            // connecting to database
            $db = new Db_Connect();
            $this->conn = $db->connect();
        }
        // destructor
        function __destruct() {
            $this->conn->close();
        }

        public function isTeamNameAvailable($name){
            $stmt = "SELECT team_name from teams WHERE team_name = '$name'";
            
            $stmt_run = mysqli_query($this->conn,$stmt);
            
            $stmt_row=mysqli_fetch_assoc($stmt_run);
            
            if ($stmt_row > 0) {
                // team name not available
                return false;
            } else {
                // team name available
                return true;
            }
        }

        public function addTeam($team_name){
            $stmt = "INSERT INTO teams(team_name) VALUES('$team_name')";

            $stmt_run = mysqli_query($this->conn,$stmt);

            if($stmt_run){
                $result['success']=true;
                $result['msg']='Team added !';
            }else{
                $result['success']=false;
                $result['msg']='Some error occured, try again .';
            }
            return $result;
        }
    }
?>