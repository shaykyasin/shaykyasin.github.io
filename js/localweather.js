(function() {

	var metric = false;
	var temp = 330.34;
	var disp = '';

	function setTemp (metric, temp) {
		if (metric) {
			disp = " " + parseFloat(temp - 273).toFixed(2) + " &degC";
		} else {
			disp = " " + parseFloat(temp * 9/5 - 459.67).toFixed(2) +  " &degF";
		}
		$('#temp').html(disp);
	}

	function toggleUnits() {
		metric = !metric;
		setTemp(metric, temp)
	}

	function isMetric(country) {
		var imperials = ['US', 'BS', 'BZ', 'KY', 'PW'];
		if (imperials.indexOf(country) === -1) {
			return true;
		} else {
			return false;
		}
	}

	function init(){
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				showWeather(position.coords.latitude, position.coords.longitude);
			}, getCityIp());
		} else {
			getCityIp();
		}
	}

	function getCityIp(){
		var url = "http://ip-api.com/json/?callback=?";
		$.getJSON(url, function(data){
			if(data.status === "success") {
				showWeather(data.city, data.countryCode);
			} else {
				alert("Failed to get IP error");
			}
		});
	}

	function showWeather(city, con) {
		var url = '';
		if(isNaN(city)) {
			url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "," + con + "&APPID=01ffc2b8227e5302ffa7f8555ba7738e";
		} else {
			url = "http://api.openweathermap.org/data/2.5/weather?lat=" + city + "&lon=" + con + "&APPID=01ffc2b8227e5302ffa7f8555ba7738e";
		}
		var bg = ['clear', 'clouds', 'rain', 'snow', 'haze'];
		var bgId = 0;
		
		$.getJSON(url, function(json) {
			var weather = json.weather[0];
			metric = isMetric(json.sys.country);
			temp = json.main.temp;
			var img = "http://openweathermap.org/img/w/" + weather.icon +".png"
			var coverId = Number(weather.icon.substr(0, 2));
			if(coverId < 1) {
				bgId = 0;
			} else if (coverId < 9) {
				bgId = 1;
			} else if(coverId < 13) {
				bgId = 2;
			} else if(coverId == 13) {
				bgId = 3;
			} else {
				bgId = 4;
			}
			$('body').fadeOut(1000, function(){
				$("#location").text(json.name);
				$("#temp").text(setTemp(metric, temp));
				$("#weather").text(weather.description);
				$("#icon").html("<img src=\"" + img + "\"" + " alt=\"" + weather.main + "\">");
				$('body').css("background", "url\(\'http://codecaraml.appspot.com/img/" + bg[bgId] + ".jpg\') no-repeat fixed").css("background-size", "cover").css("height", "100vh");
				$('body').fadeIn(1000);												
			});
		});
	}


	$('#temp').click(function(){
		toggleUnits();
	});

	init();

})();