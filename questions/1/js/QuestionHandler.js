var flagType = {
    base64:'base_64',
    sha256:'sha_256',
    caeser:'caeser',
    vignere:'vignere',
    md5:'md_5',
    hex:'hex',
    rot13:'rot_13',
    morse:'morse'
}

var flagStatus = {
    base64:false,
    sha256:false,
    caeser:false,
    vignere:false,
    md5:false,
    hex:false,
    rot13:false,
    morse:false
}

var correctFlagsCount = 0;

function QuestionHandler(){
    
}



QuestionHandler.prototype.init = function(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            if(response.status){
                console.log('loged in');
                QuestionHandler.prototype.teamName = response.team_name;
            }else{                
                console.log('loggged out');
                document.location='http://localhost/CTF-Concetto2k18';
            }
        }else if(this.readyState == 4 && this.status != 200){
        }
    }
    xhttp.open("GET", "http://localhost/CTF-Concetto2k18/server-side-code/include/session_status.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();
}

function checkFlag(flag_type){
    console.log('check fired');
    console.log(flagType[flag_type]);

    var inputElement = document.getElementById(flag_type+'input');
    var checkElement = document.getElementById(flag_type+'check');

    flag = inputElement.value;
    
    if(flagStatus[flag_type]){
        console.log('already answered');
        
        checkElement.innerHTML = "correct";
    }else{
        var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        console.log(this.responseText);
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            if(response.session_status){
                console.log('loged in');
                if(response.is_correct){
                    console.log('anser is corcet');
                    flagStatus[flag_type] = true;
                    correctFlagsCount++;
                    console.log('currrent:'+correctFlagsCount);
                    checkElement.innerHTML = "Correct";
                    checkElement.style.background = 'lightgreen';
                    if(correctFlagsCount == 8){
                        questionAnswered();
                    }
                }else{
                    checkElement.innerHTML = "Wrong";
                    checkElement.style.background = 'darkred';
                }
            }else{                
                console.log('loggged out');
                document.location='http://localhost/CTF-Concetto2k18';
            }
        }else if(this.readyState == 4 && this.status != 200){
        }
    }
    xhttp.open("POST", "http://localhost/CTF-Concetto2k18/server-side-code/questions/question1Checker.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("team_name="+QuestionHandler.prototype.teamName+"&flag_type="+flagType[flag_type]+"&flag="+flag);
    }

    function questionAnswered(){
        var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        console.log(this.responseText);
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            if(response.session_status){
                console.log('loged in');
                if(response.success){
                    
                    alert('done');
                }else{
                }
            }else{                
                console.log('loggged out');
                document.location='http://localhost/CTF-Concetto2k18';
            }
        }else if(this.readyState == 4 && this.status != 200){
        }
    }
    xhttp.open("POST", "http://localhost/CTF-Concetto2k18/server-side-code/questions/question1Checker.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("team_name="+QuestionHandler.prototype.teamName);
    }

    

}