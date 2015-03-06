//console.log("js called");
var Hangout = gapi.hangout;
//console.log("Hangout: " + Hangout);
//console.log("api done");
var participants = new Array();
var scores = new Array();
//var participant_id = new Array();
var avatar_list = document.getElementById("avatars");
var names_list = document.getElementById("names");
var body = document.getElementById("body");
var game_on = false;
console.log("vars made");

function init(){
    body.style.width = window.innerWidth;
    body.style.height = window.innerHeight;
    if(game_on){
        body.innerHTML = "Too late, bruh. A game is already in session. You know what they say. You snooze, you lose. Loser.";
    }
    else {
        //document.getElementById("body").innerHTML += "hey guys. What's up?";
        participants = Hangout.getEnabledParticipants();

        console.log("Participants: " + participants);
        for(var i = 0; i < participants.length; i++){
            //console.log(avatar_list);
            participants[i].ready = false;
            //avatar_list.innerHTML += "innerhtml div test";
            avatar_list.innerHTML += "<li><img src = '" + participants[i].person.image.url + "' class = 'avatar_pic' /> <br /><span class = 'name'>" + participants[i].person.displayName + "</span></li>";


            //participant_id[i] = participants[i].person.id;

            //participant_id[i] = participants.id;
            console.log("URL:" + i + " " + participants[i].person.image.url);
            console.log("Display Name:" + i + " " + participants[i].person.displayName);
            //console.log("Id:" + i + " " + participants_id[i]);

        }
    }
}

gapi.hangout.onApiReady.add(function(eventObj){
    console.log("api ready");
    init();
});

gapi.hangout.onParticipantsChanged.add(function(eventObj){
    console.log("changed people");
    init();
});