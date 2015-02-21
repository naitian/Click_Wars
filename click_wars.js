var Hangout = gapi.hangout;
var participants = new Array();
var scores = new Array();
var avatar_list = document.getElementById("avatars");
var names_list = document.getElementById("names");
var participant_id = new Array();
function init(){
    document.getElementById("body").innerHTML = "hey guys. What's up?";
    participants = Hangout.getEnabledParticipants();
    for(var i = 0; i < participants.length(); i++){
        avatar_list.innerHTML += "<li><img src = '" + participants[i].person.image.url + "' /></li>";
        names_list.innerHTML += "<li><img src = '" + participants[i].person.displayName + "' /></li>";
        participant_id[i] = participants.id;
    }
    
}

gapi.hangout.onApiReady.add(function(eventObj) {
  init();
});
