document.getElementsByClassName('submit')[0].addEventListener('click', function(){
    var locationInput = document.getElementsByClassName('locationInput')[0].value;
    weatherCall(locationInput);
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

            console.log(weatherObj.currently.icon);
            console.log('weather');
            
        } else {
            console.log('Sorry, there is an error.');
        }
    }     
weatherRequest.open('GET', weatherURL, true);
weatherRequest.send();
}
