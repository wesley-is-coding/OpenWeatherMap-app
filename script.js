var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};
var lat, lon, weather;
var units = "metric";
var unitSymbol = " C°";
$('#tempButton').hide();

function success(pos) {
  var crd = pos.coords;
  $.getJSON("https://api.openweathermap.org/data/2.5/weather?lat=" + crd.latitude + "&lon=" + crd.longitude + "&units=" + units + "&appid=240f269b36f4ef90cdca35db54f3be3d",
		function(data) {
      $('.city').hide();
      $('.weather').hide();
      $('.weatherIcon').hide();
      $('.temp').hide();
      $('.loader').show();
			weatherProcess(data);
  })
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

function weatherProcess(data) {
  weather = data;
  document.getElementsByClassName("city")[0].innerHTML = weather.name + ", " + weather.sys.country;
  document.getElementsByClassName("weatherIcon")[0].innerHTML = "<img src='https://openweathermap.org/img/w/" + weather.weather[0].icon + ".png'>";
  document.getElementsByClassName("weather")[0].innerHTML = weather.weather[0].description;
  document.getElementsByClassName("temp")[0].innerHTML = weather.main.temp + unitSymbol;
  weatherBGround(weather.weather[0].icon);
  $('.city').fadeIn(500);
  $('.loader').hide();
  $('.weatherIcon').fadeIn(1000);
  $('.weather').fadeIn(1000);
  $('.temp').fadeIn(1500);
  $('#tempButton').fadeIn(1500);
}

navigator.geolocation.getCurrentPosition(success, error, options);

function changeCity() {
	$('.city').hide();
	$('.weather').hide();
  $('.weatherIcon').hide();
	$('.temp').hide();
  $('#tempButton').hide();
  $('.loader').show();
  getLocation(document.getElementById("userInput").value);
}

function getLocation(inputCity) {
	$.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + inputCity + "&units=" + units +"&appid=240f269b36f4ef90cdca35db54f3be3d",
		function(data) {
			weatherProcess(data);
		}
	);
}

function changeTemp() {
  if (units == "metric") {
    units = "imperial";
    unitSymbol = " F°"
    document.getElementById("tempButton").innerHTML = "Switch to Celsius";
  }
  else {
    units = "metric";
    unitSymbol = " C°"
    document.getElementById("tempButton").innerHTML = "Switch to Fahrenheit";
  }
  if (document.getElementById("userInput").value) {
    changeCity();
  }
  else {
    $('.city').hide();
    $('.weather').hide();
    $('.weatherIcon').hide();
    $('.temp').hide();
    $('#tempButton').hide();
    $('.loader').show();
    navigator.geolocation.getCurrentPosition(success, error, options);
  }
}

function weatherBGround(desc) {
	var weatherColor = {
		"01d": "#87ceeb",
		"01n": "#191970",
		"02d": "url('https://cloud.modyocdn.com/uploads/9096fff3-c6e6-49fb-abfb-b2ad62d3c755/original/few-clouds-day.png') fixed center",
		"02n": "url('https://cloud.modyocdn.com/uploads/6d55e041-c3f5-4adf-9581-89a61411372c/original/few-clouds-night.png') fixed center",
		"03d": "url('https://cloud.modyocdn.com/uploads/eb12e3d0-4e57-4db0-808f-e4a3fc9e0482/original/broken-clouds.png') fixed center",
		"03n": "url('https://cloud.modyocdn.com/uploads/eb12e3d0-4e57-4db0-808f-e4a3fc9e0482/original/broken-clouds.png') fixed center",
		"04d": "url('https://cloud.modyocdn.com/uploads/eb12e3d0-4e57-4db0-808f-e4a3fc9e0482/original/broken-clouds.png') fixed center",
		"04n": "url('https://cloud.modyocdn.com/uploads/eb12e3d0-4e57-4db0-808f-e4a3fc9e0482/original/broken-clouds.png') fixed center",
		"09d": "url('https://cloud.modyocdn.com/uploads/09d471bc-b730-4647-894a-1767be562066/original/rain-day.png') fixed center",
		"09n": "url('https://cloud.modyocdn.com/uploads/983dce07-5040-4930-afe0-5e1febe03427/original/rain-night.png') fixed center",
		"10d": "url('https://cloud.modyocdn.com/uploads/09d471bc-b730-4647-894a-1767be562066/original/rain-day.png') fixed center",
		"10n": "url('https://cloud.modyocdn.com/uploads/983dce07-5040-4930-afe0-5e1febe03427/original/rain-night.png') fixed center",
		"11d": "url('https://cloud.modyocdn.com/uploads/40887fc4-81a5-4ebb-a084-ba3a290efc9f/original/tstorm-day.png') fixed center",
		"11n": "url('https://cloud.modyocdn.com/uploads/3fc53bf8-24cd-43b1-9b79-1ff2ddf9c0eb/original/tstorm-night.png') fixed center",
		"13d": "url('https://cloud.modyocdn.com/uploads/83a4d569-a8f8-4fa2-ad97-fba3bb18d1ea/original/snow-day.png') fixed center",
		"13n": "url('https://cloud.modyocdn.com/uploads/e6166994-bd29-4092-8dd4-a110fb46818b/original/snow-night.png') fixed center",
		"50d": "url('https://cloud.modyocdn.com/uploads/d18cf246-47c8-40f8-bf59-918ab4b67abc/original/mist.png') fixed center",
		"50n": "url('https://cloud.modyocdn.com/uploads/d18cf246-47c8-40f8-bf59-918ab4b67abc/original/mist.png') fixed center",
	};
	var keys = Object.keys(weatherColor);
	
	keys.forEach(function(key) {
		if (desc == key) {
			document.body.style = "background: " + weatherColor[key] + ";";
		}
	});
}
