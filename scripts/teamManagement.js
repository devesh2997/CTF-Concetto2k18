var terminal;

var cmdAddTeam = 'ctf_add_team ';
var cmdAddTeamMembers = 'ctf_add_members ';
var cmdAddContact = 'ctf_add_contact ';
var cmdLogin = 'login ';
var cmdLogout = 'logout';

function TeamManagement(){
    terminal = new Terminal("terminal");
}

TeamManagement.prototype.init = function(){
    //terminal.print("Enter your team name:");
    document.body.appendChild(terminal.html);
    terminal.print("Initializing...");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            if(response.status){
                team_name = response.team_name;
                TeamManagement.prototype.teamName = team_name;
            }            
            TeamManagement.prototype.prompt();
        }else if(this.readyState == 4 && this.status != 200){
            terminal.print("Some error ocurred in connection, try again.")
            TeamManagement.prototype.prompt();
        }
    }
    xhttp.open("GET", "http://localhost/CTF-Concetto2k18/server-side-code/include/session_status.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();
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
            TeamManagement.prototype.checkNameAvailability(name);
        }else{
            terminal.print("Team name has already been set. Proceed to enter team members and contact.");
            TeamManagement.prototype.prompt();
        }        
    }else if(cmd.indexOf(cmdAddTeamMembers)>-1){
        members = cmd.slice(16);

    }else if(cmd.indexOf(cmdLogin)>-1){
        nameFlag = ' -t ';
        passwordFlag = ' -p ';
        msg = 'Invalid entry format.'
        if(cmd.indexOf(nameFlag)>-1){
            if(cmd.indexOf(passwordFlag)>-1){
                nameFlagIndex = cmd.indexOf(nameFlag);
                passwordFlagIndex = cmd.indexOf(passwordFlag);
                teamName = cmd.slice(nameFlagIndex+4,passwordFlagIndex);
                password = cmd.slice(passwordFlagIndex+4);
                TeamManagement.prototype.login(teamName,password);
            }else{
                terminal.print(msg);
                TeamManagement.prototype.prompt();
            }
        }else{
            terminal.print(msg);
            TeamManagement.prototype.prompt();
        }
    }else if(cmd.indexOf(cmdLogout) > -1){
        TeamManagement.prototype.logout();
    }else if(cmd == 'help'){
        msg = '  ctf_add_team <team_name>      -> register your team.'; 
        terminal.print(msg);
        msg = '  ctf_add_members <members>     -> add team members. member names should be separated by comma ';
        terminal.print(msg);
        msg = '  ctf_add_contact <contact>     -> add one or more mobile numbers(should be separated by comma)'; 
        terminal.print(msg);
        msg = '  clear                         ->clear screen';
        terminal.print(msg);
        TeamManagement.prototype.prompt();
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

TeamManagement.prototype.login = function(team_name, team_password){
    terminal.print("Connecting...");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            msg = response.msg;
            terminal.print(msg);
            if(response.success){
                TeamManagement.prototype.teamName = team_name;
            }            
            TeamManagement.prototype.prompt();
        }else if(this.readyState == 4 && this.status != 200){
            terminal.print("Some error ocurred in connection, try again.")
            TeamManagement.prototype.prompt();
        }
    }
    xhttp.open("POST", "http://localhost/CTF-Concetto2k18/server-side-code/login.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("team_name="+team_name+"&team_password="+team_password);
}

TeamManagement.prototype.logout = function(){
    if(TeamManagement.prototype.teamName == null){
        terminal.print("no team logged in.");
        TeamManagement.prototype.prompt();
    }else{
        terminal.print("Logging out...");
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                console.log("test");
                TeamManagement.prototype.teamName = null;
                TeamManagement.prototype.prompt();
            }else if(this.readyState == 4 && this.status != 200){
                terminal.print("Some error ocurred in logging you out, try again.")
                TeamManagement.prototype.prompt();
            }
        }
        xhttp.open("GET", "http://localhost/CTF-Concetto2k18/server-side-code/logout.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send();
    }
    
}


TeamManagement.prototype.checkNameAvailability= function(team_name) {
    terminal.print("Connecting...");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            terminal.print("Checking availability...");
            response = JSON.parse(this.responseText);
            if(response.isAvailable){
                terminal.print("team name available");
                TeamManagement.prototype.getTeamPassword(team_name);

            }else{
                terminal.print("team name not available");
                TeamManagement.prototype.prompt();
            }
        }else if(this.readyState == 4 && this.status != 200){
            terminal.print("Some error ocurred in connection, try again.");
            TeamManagement.prototype.prompt();
        }
    }
    xhttp.open("POST", "http://localhost/CTF-Concetto2k18/server-side-code/isTeamNameAvailable.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("team_name="+team_name);
}

TeamManagement.prototype.getTeamPassword = function(team_name){
    terminal.input("Set password ->",function(input){
        password = input.slice(input.lastIndexOf('>')+1);
        terminal.input("Confirm password ->",function(con_input){
            confirm_password = con_input.slice(con_input.lastIndexOf('>')+1);
            if(password == confirm_password){
                TeamManagement.prototype.submitTeamPassword(team_name,password);
            }else{
                terminal.print('Password mismatch.');
                TeamManagement.prototype.prompt();
            }
        })
    })
}

TeamManagement.prototype.submitTeamPassword = function(team_name,team_password){
    terminal.print("Connecting...");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            if(response.isAvailable){
                msg = response.result.msg;
                terminal.print(msg);
                if(response.result.success){                    
                    TeamManagement.prototype.login(team_name,team_password);
                }else{
                    TeamManagement.prototype.prompt();
                }

            }else{
                terminal.print("team name not available");
                TeamManagement.prototype.prompt();
            }
        }else if(this.readyState == 4 && this.status != 200){
            terminal.print("Some error ocurred in connection, try again.")
            TeamManagement.prototype.prompt();
        }
    }
    xhttp.open("POST", "http://localhost/CTF-Concetto2k18/server-side-code/addTeam.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("team_name="+team_name+"&team_password="+team_password);
}