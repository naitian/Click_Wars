//console.log("js called");
var Hangout = gapi.hangout;
//console.log("Hangout: " + Hangout);
//console.log("api done");
var participants = [];
var localScores = [];
var cloudScores = [];
var ready = "";
//var participant_id = new Array();


var avatar_list = document.getElementById("avatars");
var body = document.getElementById("body");
var ready_div = document.getElementById("ready_container");
var game_on = false;
console.log("vars made");

function playStart(){
    alert("Hi. The game should start now. But I haven't gotten there yet. Okay. Click cancel and we can keep on working. Bye!");
    game_on = true;
    refresh();
}

function toggleReady(){
    Hangout.getParticipantById(Hangout.getLocalParticipantId()).ready = !Hangout.getParticipantById(Hangout.getLocalParticipantId()).ready;
    Hangout.data.setValue(Hangout.getLocalParticipantId(), Hangout.getParticipantById(Hangout.getLocalParticipantId()).ready.toString());
    for(var i = 0; i < participants.length; i++){
        if(Hangout.data.getValue(participants[i].id) == 'false') return;
    }
    playStart();
}

function score(player){
    localScores[player] -= 1;
    localScores[participants.length] += 1;
}

function refresh(){
    console.log("refresh running");
    if(game_on){
        body.innerHTML = "Too late, bruh. A game is already in session. You know what they say. You snooze, you lose. Loser.";
    }
    else {
        //document.getElementById("body").innerHTML += "hey guys. What's up?";
        participants = Hangout.getEnabledParticipants();
        avatar_list.innerHTML = "";
        ready_div.innerHTML = "";
        console.log("Participants: " + participants);
        for(var i = 0; i < participants.length; i++){
            //console.log(avatar_list);
            //avatar_list.innerHTML += "innerhtml div test";
            avatar_list.innerHTML += "<li><img src = '" + participants[i].person.image.url + "' class = 'avatar_pic' id='a" + i + "' onclick='score(" + i +  ")'/> <br /><span class = 'name'>" + participants[i].person.displayName + "</span></li>";
            document.getElementById("a" + i).style.borderColor = "#fff";
            if(participants[i].ready === true) document.getElementById("a" + i).style.borderColor = "#2ecc71";

            //participant_id[i] = participants[i].person.id;

            //participant_id[i] = participants.id;
            console.log("URL:" + i + " " + participants[i].person.image.url);
            console.log("Display Name:" + i + " " + participants[i].person.displayName);
            //console.log("Id:" + i + " " + participants_id[i]);
        }
        ready_div.innerHTML += "<div onclick='toggleReady()'>Ready</div>";
        console.log("ready div made");
    }
}

function init(){
    body.style.width = window.innerWidth;
    body.style.height = window.innerHeight;
    if(game_on){
        body.innerHTML = "Too late, bruh. A game is already in session. You know what they say. You snooze, you lose. Loser.";
    }
    else {
        //document.getElementById("body").innerHTML += "hey guys. What's up?";
        participants = Hangout.getEnabledParticipants();
        avatar_list.innerHTML = "";
        ready_div.innerHTML = "";
        console.log("Participants: " + participants);
        for(var i = 0; i < participants.length; i++){
            //console.log(avatar_list);
            participants[i].ready = false;
            var ready_string = participants[i].ready.toString();
            Hangout.data.setValue(participants[i].id, ready_string);
            console.log(Hangout.data.getValue(participants[i].id));        
        }
        refresh();
        ready_div.innerHTML += "<div onclick='toggleReady()'>Ready</div>";
        console.log("ready div made");
    }
}


Hangout.onApiReady.add(function(eventObj){
    console.log("api ready");
    init();
});

Hangout.onParticipantsChanged.add(function(eventObj){
    console.log("changed people");
    refresh();
});

Hangout.data.onStateChanged.add(function(eventObj){
    console.log("toggled ready");
    refresh();
});
