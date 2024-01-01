const apiKey = "0d14ed4cbe4159ed185c4c1df1850126"; // Replace with your API key

const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weatherDescription');
const weatherIcon = document.getElementById('weatherIcon');

weatherForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const city = cityInput.value;
    if (city) {
        getWeatherData(city);
    }
});

async function getWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            displayWeatherData(data);
        } else {
            showError("City not found");
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        showError("Failed to fetch weather data");
    }
}

function displayWeatherData(data) {
    cityName.textContent = data.name;
    temperature.textContent = `Temperature: ${Math.round(data.main.temp - 273.15)}°C`;
    weatherDescription.textContent = `Weather: ${data.weather[0].description}`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    weatherInfo.classList.remove('hidden');
}

function showError(message) {
    cityName.textContent = '';
    temperature.textContent = '';
    weatherDescription.textContent = '';
    weatherIcon.src = '';
    weatherInfo.classList.add('hidden');
    alert(message);
}
