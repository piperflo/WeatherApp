const loc = document.getElementById("location");
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const tempImg = document.getElementById('temp-image');
const tempText = document.getElementById('temp-text');
const dateTime = document.getElementById('date-time');

const toWeather = document.getElementById('tomorrow-weather');
const toMaxTemp = document.getElementById('max-temp');
const toMinTemp = document.getElementById('min-temp');
const toRain = document.getElementById('rain-chance');
var input = document.getElementById("input");

loc.addEventListener("click", function(event){
    event.preventDefault();
    console.log("clicked");
    var weatherLocation = document.getElementById("input").value;
    getWeatherData(weatherLocation);
});

async function getWeatherData(weatherLocation) {
    try {
        const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=51d81f56576b4aa4a45170859231107&q=' + weatherLocation + '&days=3', {mode: 'cors'});
        const data = await response.json(); 
        setWeatherData(data);
        return data;
    } catch (error) {
        alert("Couldn't Find Data");
    }
}

async function setWeatherData(data){
    try {
        city.textContent = data.location.name + ", " + data.location.region;
    } catch (error) {
        alert("Invalid Input");
        return;
    }

    const d = new Date(data.location.localtime);

    var format = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      };

    const date = d.toDateString();
    dateTime.textContent = date + " | " + d.toLocaleString('en-US', format);

    //setting temp info
    const f = document.createElement("sup");
    f.textContent = "°F";
    temp.textContent = data.current.temp_f;
    temp.appendChild(f);
    tempImg.src = data.current.condition.icon;
    tempText.textContent = data.current.condition.text + " | Feels Like " + data.current.feelslike_f + " | TZ " + data.location.tz_id + " | Pressure: " + data.current.pressure_in + " | Wind Speeds: " + data.current.wind_mph + " | Wind Direction: " + data.current.wind_dir + " | Clouds: " + data.current.cloud + "% | Humidity: " +  data.current.humidity + "%";

    const t = new Date(data.forecast.forecastday[2].date);

    toWeather.textContent = "Date " + t.toDateString();
    toMaxTemp.textContent = "Max Temp: " + data.forecast.forecastday[1].day.maxtemp_f + "°F";
    toMinTemp.textContent = "Min Temp: " + data.forecast.forecastday[1].day.mintemp_f + "°F";
    toRain.textContent = "Chance of rain: " + data.forecast.forecastday[1].day.daily_chance_of_rain + "%";

}

getWeatherData("Kansas");
