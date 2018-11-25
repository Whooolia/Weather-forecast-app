document.getElementsByClassName('submit')[0].addEventListener('click', function(){
    var locationInput = document.getElementsByClassName('locationInput')[0].value;
    weatherCall(locationInput);
    locationCall();
});



var weatherCall = function(latitude, longitude) {
    var weatherRequest = new XMLHttpRequest();
    var weatherURL = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/07c99f2181829c1743da2c2bbf805d6d/51.5074,0.1278'
    // var weatherURL = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/07c99f2181829c1743da2c2bbf805d6d/${latitude},${longitude}`;

    weatherRequest.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            var weatherObj = JSON.parse(weatherRequest.responseText);
            var temperature = weatherObj.currently.temperature;
            var weatherIcon = weatherObj.currently.icon;
            var location = weatherObj.timezone
            var weatherSummary = weatherObj.currently.summary;

            document.getElementById('weather-icon').textContent = weatherIcon;
            document.getElementById('weather-temperature').textContent = temperature;
            document.getElementById('location').textContent = location;
            document.getElementById('weather-summary').textContent = weatherSummary;         
        } else {
            console.log('Sorry, this is error from weather API.');
        }
    }     
weatherRequest.open('GET', weatherURL, true);
weatherRequest.send();
}


var locationCall = function(){
    var locationRequest = new XMLHttpRequest();
    var locationURL = 'https://cors-anywhere.herokuapp.com/https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBChduinyJCvJnuC_Fby-HrRgqiAakuMp8';

    locationRequest.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var locationObj = JSON.parse(locationRequest.responseText);
            console.log(locationObj);
        } else {
            console.log('sorry! THIS IS GOOGLE ERROR');
        }
    }
    locationRequest.open('GET', locationURL, true);
    locationRequest.send();
}