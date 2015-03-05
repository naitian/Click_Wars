console.log("js called");
var Hangout = gapi.hangout;
console.log("Hangout: " + Hangout);
console.log("api done");
var participants = new Array();
var scores = new Array();
//var participant_id = new Array();
var avatar_list = document.getElementById("avatars");
var names_list = document.getElementById("names");
console.log("vars made");

function init(){
    document.getElementById("body").innerHTML = "hey guys. What's up?";
    participants = Hangout.getEnabledParticipants();
    console.log("Participants: " + participants);
    for(var i = 0; i < participants.length; i++){
        avatar_list.innerHTML += "innerhtml div test";
        avatar_list.innerHTML += "<li><img src = '" + participants[i].person.image.url + "' /></li>";
        names_list.innerHTML += "<li>" + participants[i].person.displayName + "</li>";

        //participant_id[i] = participants[i].person.id;

        //participant_id[i] = participants.id;
        console.log("URL:" + i + " " + participants[i].person.image.url);
        console.log("Display Name:" + i + " " + participants[i].person.displayName);
        //console.log("Id:" + i + " " + participants_id[i]);

    }
    
}

gapi.hangout.onApiReady.add(function(eventObj){
    console.log("api ready");
    init();
});
