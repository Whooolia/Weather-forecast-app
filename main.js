// Input go through google API and the results of location pass into weather API as arguments
function getWeatherInformation() {
  var locationInput = document.getElementsByClassName("locationInput")[0].value;
  locationCall(locationInput);
}

var images = {
  'cloudy': "./icons/cloudy.png",
  "partly-cloudy-night": "./icons/cloudy.png",
  "partly-cloudy-day": "./icons/cloudy.png",
  'sunny': "./icons/sunny.png",
  "clear-day": "./icons/sunny.png",
  "clear-night": "./icons/sunny.png",
  'rain': "./icons/rain.png",
  'snow': "./icons/snow.png",
  'sleet': "./icons/sleet.png",
  'wind': "./icons/windy.png",
  'fog': "./icons/foggy.png"
};

var backgrounds = {
  'cloudy': "./background/cloudy.jpg",
  "partly-cloudy-night": "./background/cloudy.jpg",
  "partly-cloudy-day": "./background/cloudy.jpg",
  'sunny': "./background/sunny.jpg",
  "clear-day": "./background/sunny.jpg",
  "clear-night": "./background/sunny.jpg",
  'rain': "./background/rain.jpg",
  'snow': "./background/snow.jpg",
  // 'sleet': "./background/sleet.png",
  // 'wind': "./background/windy.png",
  // 'fog': "./background/foggy.png"
}

function getWeatherIcon(weatherType) {
  var weatherContainer = document.getElementById("weatherIcon");
  if (weatherContainer.hasChildNodes()) { 
    weatherContainer.removeChild(weatherContainer.firstChild);
  }
  
  if(document.body.style){
    document.body.style.backgroundImage = 'none';
  }
  var elem = document.createElement("img");
  weatherContainer.appendChild(elem);
  elem.src = images[weatherType];

  document.body.style.backgroundImage = `url(${backgrounds[weatherType]})`;
  // elem.src = backgrounds[weatherType];
 

  // switch (weatherType) {
  //   case "cloudy":
  //     elem.src = "./icons/cloudy.png";
  //     break;
  //   case "partly-cloudy-night":
  //     elem.src = "./icons/cloudy.png";
  //     break;
  //   case "sunny":
  //     elem.src = "./icons/sunny.png";
  //     break;
  //   case "clear-night":
  //     elem.src = "./icons/sunny.png";
  //     break;
  //   case "rain":
  //     elem.src = "./icons/rain.png";
  //     break;
  //   case "snow":
  //     elem.src = "./icons/snow.png";
  //     break;
  //   case "sleet":
  //     elem.src = "./icons/sleet.png";
  //     break;
  //   case "windy":
  //     elem.src = "./icons/windy.png";
  //     break;
  //   case "foggy":
  //     elem.src = "./icons/foggy.png";
  //     break;
  // }
}

// User can submit either pressing Enter or submit button
document
  .getElementsByClassName("submit")[0]
  .addEventListener("click", function() {
    getWeatherInformation();
  });

document.body.addEventListener("keyup", function(e) {
  if (e.keyCode == 13) {
    getWeatherInformation();
  }
});

// Takes two arguments to get the weather info
var weatherCall = function(latitude, longitude) {
  var weatherRequest = new XMLHttpRequest();
  var weatherURL = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/07c99f2181829c1743da2c2bbf805d6d/${latitude},${longitude}`;
  weatherRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var weatherObj = JSON.parse(weatherRequest.responseText);
      var temperature = weatherObj.currently.temperature;
      var weatherIcon = weatherObj.currently.icon;

      var location = weatherObj.timezone;
      var weatherSummary = weatherObj.currently.summary;

      // Icon changes
      //   document.getElementById("weather-icon").textContent = weatherIcon;
      //   if(weatherIcon == 'clear-day' || weatherIcon == 'clear-night'){
      //     document.getElementsByClassName("sunnyIcon").style.display = 'block';
      //   } else if(weatherIcon == 'partly-cloudy-night' || weatherIcon == 'partly-cloudy-day'){
      //     document.getElementsByClassName("cloudyIcon").style.display = 'block';
      //   }
      document.getElementById("weather-temperature").textContent = temperature;
      document.getElementById("location").textContent = location;
      document.getElementById("weather-summary").textContent = weatherSummary;
      getWeatherIcon(weatherIcon);
    } else {
      console.log("Sorry, this is error from weather API.");
    }
  };
  weatherRequest.open("GET", weatherURL, true);
  weatherRequest.send();
};

// Takes one argument to get latitude and longitude of the city(input)
var locationCall = function(locationInput) {
  var locationRequest = new XMLHttpRequest();
  var locationURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${locationInput}&key=AIzaSyAR6JW0Ad1M4ukQ5uPE4kKonM5HrrdyuIE`;
  locationRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var locationObj = JSON.parse(locationRequest.responseText);
      var latitude = locationObj.results[0].geometry.location.lat;
      var longitude = locationObj.results[0].geometry.location.lng;
      weatherCall(latitude, longitude);
    } else {
      console.log("Sorry, this is error from location API.");
    }
  };
  locationRequest.open("GET", locationURL, true);
  locationRequest.send();
};
