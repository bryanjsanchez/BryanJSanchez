var $channels = $("#channels");

var usernames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"];
var status;
var url;

for (var i = 0; i < usernames.length; i++) {
  url = "https://wind-bow.glitch.me/twitch-api/streams/" + usernames[i];
  $.getJSON(url, function(streams) {
    if (streams.stream == null) {
      status = "offline";
    } else {
      status = "online";
    }
  })
  url = "https://wind-bow.glitch.me/twitch-api/channels/" + usernames[i];
  $.getJSON(url, function(channels) {
    var listItem = "<a href='" + channels.url + "' target='_blank'><li>";
    listItem += "<img src='" + channels.logo + "'>";
    listItem += "<p>" + channels.display_name + "</p>";
    listItem += "<div class='status' style='background-color:" 
    if (status == "online") {
      listItem += "green;'></div>";
    } else if (status == "offline") {
      listItem += "red;'></div></li>";
    }
    $channels.append(listItem);
  });
}