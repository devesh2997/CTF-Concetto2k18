var terminal;

var cmdAddTeam = 'ctf_add_team';
var cmdAddTeamMembers = 'ctf_add_members';
var cmdAddContact = 'ctf_add_contact';

function TeamManagement(){
    terminal = new Terminal("terminal");
}

TeamManagement.prototype.init = function(){
    //terminal.print("Enter your team name:");
    document.body.appendChild(terminal.html);
    TeamManagement.prototype.prompt();    
}

TeamManagement.prototype.prompt = function(){
    var msg;
    if(TeamManagement.prototype.teamName == null){
        msg = "$ctf@concetto'18>";
    }else{
        msg = '$'+TeamManagement.prototype.teamName+"@concetto'18>";
    }
    terminal.input(msg,function(input){
        cmd = input.slice(input.lastIndexOf('>')+1);
        TeamManagement.prototype.processCommand(cmd);             
    });
}



TeamManagement.prototype.processCommand = function(cmd){
    if(cmd.indexOf(cmdAddTeam)>-1){
        name = cmd.slice(13);
        if(TeamManagement.prototype.teamName == null){
            TeamManagement.prototype.addTeam(name);
        }else{
            terminal.print("Team name has already been set. Proceed to enter team members and contact.");
            TeamManagement.prototype.prompt();
        }        
    }else if(cmd.indexOf(cmdAddTeamMembers)>-1){
        members = cmd.slice(16);
        
    }
    else if(cmd.indexOf('clear')>-1){
        terminal.clear();
        TeamManagement.prototype.prompt();
    }
    else{
        msg = cmd+' is not recognized as an internal or and external command.';
        terminal.print(msg);
        TeamManagement.prototype.prompt();
    }
}






TeamManagement.prototype.addTeam= function(team_name) {
    terminal.print("Connecting...");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            terminal.print("Checking availability...");
            response = JSON.parse(this.responseText);
            if(response.isAvailable){
                terminal.print("team name available");
                terminal.print("adding team...");
                if(response.result.success){
                    terminal.print(response.result.msg);
                    TeamManagement.prototype.teamName = team_name;
                    TeamManagement.prototype.prompt();
                }else{
                    terminal.print(response.result.msg);
                    TeamManagement.prototype.prompt();
                }
            }else{
                terminal.print("team name not available");
                TeamManagement.prototype.prompt();
            }
        }else if(this.readyState == 4 && this.status != 200){
            terminal.print("Some error ocurred in connection, try again.")
        }
    }
    xhttp.open("POST", "http://localhost/CTF-Concetto2k18/server-side-code/addTeam.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("team_name="+team_name);
}