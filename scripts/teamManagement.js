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
    terminal.input("$ctf@concetto'18>",function(input){
        cmd = input.slice(input.lastIndexOf('>')+1);
        TeamManagement.prototype.processCommand(cmd);             
    });
}



TeamManagement.prototype.processCommand = function(cmd){
    if(cmd.indexOf(cmdAddTeam)>-1){
        name = cmd.slice(12);
        TeamManagement.prototype.addTeam(cmd.slice(12));
    }else{
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