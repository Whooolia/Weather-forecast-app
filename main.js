
// Current date
function getDate() {
  var today = new Date();
  var day = today.getDay();
  var date = today.getDate();
  var month = today.getMonth();
  var year = today.getFullYear();
  console.log(day);
  
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayNamesShort = ['Mon','Tues','Wed','Thur','Fri','Sat','Sun'];
  if(date<10){
    date = '0'+ date;
  }
 
  //Get next 5 days
  for(var i = 0; i<5; i++){
    nextfiveDays = day+i;
    //reminder - infinite 
    // today: 12th -- 13/7 = 6, 14, 15, 16, 17
    nextfiveDays = dayNamesShort[nextfiveDays % dayNamesShort.length];
    var fivedays = document.createElement('p');
    document.querySelector('.fiveDayForecast').appendChild(fivedays).textContent = nextfiveDays;
    // document.querySelector('.fiveDayForecast').style.display = 'none';
  }
  var today = document.querySelector(".today");
  today.textContent = `${dayNames[day]} ${date} ${monthNames[month]}, ${year}`;
}


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
  'snow': "./background/snow1.jpg",
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
    getDate();
    document.querySelector('.rightside').style.display = 'block';
  });

document.body.addEventListener("keyup", function(e) {
  if (e.keyCode == 13) {
    getWeatherInformation();
    getDate();
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


        // Get 5 days forecast!
      var fiveDayForecast = weatherObj.daily.data.slice(0,5)
      var fivedayDiv = document.querySelector('.fiveDayForecast')
      document.querySelector('.fiveDayForecast').innerHTML = '';
  

      fiveDayForecast.forEach(function(e){
        var fiveDayimgs = document.createElement('img');
        fiveDayimgs.src = images[e.icon];
        fivedayDiv.appendChild(fiveDayimgs);
        fiveDayimgs.textContent = e.icon;
      });

      fiveDayForecast.forEach(function(e){
        var fiveDayTemperature = document.createElement('p');
        fivedayDiv.appendChild(fiveDayTemperature);
        fiveDayTemperature.textContent = e.apparentTemperatureHigh;
      });

     
    

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
