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

        /**
         * Encrypting password
        * @param password
        * returns salt and encrypted password
        */
        public function hashSSHA($password) {
        
            $salt = sha1(rand());
            $salt = substr($salt, 0, 10);
            $encrypted = base64_encode(sha1($password . $salt, true) . $salt);
            $hash = array("salt" => $salt, "encrypted" => $encrypted);
            return $hash;
        }
        
        /**
        * Decrypting password
        * @param salt, password
        * returns hash string
        */
        public function checkhashSSHA($salt, $password) {
        
            $hash = base64_encode(sha1($password . $salt, true) . $salt);
        
            return $hash;
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

        // public function addTeam($team_name){
        //     $stmt = "INSERT INTO teams(team_name) VALUES('$team_name')";

        //     $stmt_run = mysqli_query($this->conn,$stmt);

        //     if($stmt_run){
        //         $result['success']=true;
        //         $result['msg']='Team added !';
        //     }else{
        //         $result['success']=false;
        //         $result['msg']='Some error occured, try again .';
        //     }
        //     return $result;
        // }

        public function addTeam($team_name, $team_password){
            $hash = $this->hashSSHA($password);
            $encrypted_password = $hash["encrypted"]; // encrypted password
            $salt = $hash["salt"]; // salt

            $stmt = "INSERT INTO teams(team_name,encrypted_password, salt) VALUES('$team_name','$encrypted_password', '$salt')";
            $result = mysqli_query($this->conn,$stmt);

            if($result){
                $response['success']=true;
                $response['msg']="Password set. Login to continue.";
            }else{
                $response['success']=false;
                $response['msg']="Some error occured in setting up your account!";
            }

        }

        public function login($team_name, $team_password){
            $stmt = "SELECT * FROM teams WHERE team_name = '$team_name'";
            
            if ($stmt_run=mysqli_query($this->conn,$stmt)) {
                $team = mysqli_fetch_assoc($stmt_run);
                // verifying user password
                $salt = $team['salt'];
                $encrypted_password = $teamuser['encrypted_password'];
                $hash = $this->checkhashSSHA($salt, $password);
                // check for password equality
                if ($encrypted_password == $hash) {
                    // user authentication details are correct
                    return true;
                }
            } else {
                return false;
            }
        }

        public function addTeamMembers($team_name, $team_members){
            $stmt = "SELECT team_members from teams WHERE team_name='$team_name'";

            if($stmt_run=mysqli_query($this->conn,$stmt)){
                $curr_team_members = mysqli_fetch_assoc($stmt_run);

                $team_members = $curr_team_members.','.$team_members;

                $stmt2="UPDATE teams SET team_members='$team_members' WHERE team_name='$team_name'";

                if($stmt_run2=mysqli_query($this->conn,$stmt2)){
                    return true;
                }else{
                    return false;
                }

            }else{
                return false;
            }
        }

        public function addTeamContact($team_name, $team_contact){
            $stmt = "SELECT team_contact from teams WHERE team_name='$team_name'";
            
            if($stmt_run=mysqli_query($this->conn,$stmt)){
                $curr_contact = mysqli_fetch_assoc($stmt_run);
            
                $team_contact = $curr_contact.','.$team_contact;
            
                $stmt2="UPDATE teams SET team_contact='$team_contact' WHERE team_name='$team_name'";
            
                if($stmt_run2=mysqli_query($this->conn,$stmt2)){
                    return true;
                }else{
                    return false;
                }
            
            }else{
                return false;
            }
        }
    }
?>