var lat;
var lon;
var tempC;
var tempF;
var temperature = $(".temperature");

function showWeather(lat, lon) {
  $.getJSON("http://ip-api.com/json", function(location) {
    lat = location.lat;
    lon = location.lon;
    var url = "http://api.openweathermap.org/data/2.5/weather?lat="; 
    url += lat;
    url += "&lon="; 
    url += lon;
    url += "&appid=3f45a722e12f3a3f8d2d8945ca27b422";
    $.ajax(url, {
      dataType: "json",
      success: function(weatherData) {
        tempC = weatherData.main.temp - 273.15;
        tempF = tempC * 9 / 5 + 32;

        var header = $(".location");
        var imageIcon = $(".image-icon");
        var temperatureValue = Math.round(window[$("#temp-unit input[type='radio']:checked").val()]);
        var html = $("html");

        if ((new Date().getTime()/1000) > weatherData.sys.sunrise && (new Date().getTime()/1000) < weatherData.sys.sunset) {
          html.css("background-color", "#6e9ef5");
        } else {
          html.css("background-color", "#333366");
        }
        header.text("How's the Weather in " + weatherData.name + "?");
        var imgSrc = "http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png"
        imageIcon.attr("src", imgSrc);
        temperature.text(temperatureValue);
      }
    })
  })
}

showWeather();
function tempUnits() {
  temperatureValue = Math.round(window[$("#temp-unit input[type='radio']:checked").val()]);
  temperature.text(temperatureValue);
}


