var request = require('request');
console.log("Weather status of Bhairahawa today is .....");
		request('https://nepal-weather-api.herokuapp.com/api/?place=Bhairahawa', function(error, response, body) {
    // request('https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400', function(error, response, body) {

            if (!error && response.statusCode == 200) {
            	var parsedData=JSON.parse(body);
            	console.log(parsedData);
            }

            });