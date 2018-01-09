
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
                document.location=server;
                var currQuestion = response.current_question;
                if(!(currQuestion >= 7) ){
                    document.location = server+'questions/'+currQuestion+'/question'+currQuestion+'.html';
                }
            }else{                
                console.log('loggged out');
            }
        }else if(this.readyState == 4 && this.status != 200){
        }
    }
    xhttp.open("GET", server+"server-side-code/include/session_status.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();
}

function checkFlag(){
    console.log('check fired');

    var inputElement = document.getElementById('flaginput');
    var checkElement = document.getElementById('flagcheck');

    flag = inputElement.value;
    
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        console.log(this.responseText);
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            if(response.session_status){
                console.log('loged in');
                if(response.is_correct){
                    console.log('anser is corcet');
                    checkElement.innerHTML = "Correct";
                    checkElement.style.background = 'lightgreen';
                    questionAnswered();
                }else{
                    checkElement.innerHTML = "Wrong";
                    checkElement.style.background = 'darkred';
                }
            }else{                
                console.log('loggged out');
                document.location=server;
            }
        }else if(this.readyState == 4 && this.status != 200){
        }
    }
    xhttp.open("POST", server+"server-side-code/questions/question7Checker.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("team_name="+QuestionHandler.prototype.teamName+"&flag="+flag);
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
                    
                    document.location = server+'questions/8/question8.html';
                }else{
                }
            }else{                
                console.log('loggged out');
                document.location=server;
            }
        }else if(this.readyState == 4 && this.status != 200){
        }
    }
    xhttp.open("POST", server+"server-side-code/questions/question7Checker.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("team_name="+QuestionHandler.prototype.teamName);
    }

    

