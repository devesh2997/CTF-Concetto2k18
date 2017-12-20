function QuestionManager(teamName){
    this.teamName = teamName;
}

QuestionManager.prototype.init = function(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            
        }else if(this.readyState == 4 && this.status != 200){

        }
    }
}