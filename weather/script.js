const apiKey = '26547aa5d940175797da1758a746f9f6'; // Replace with your weather API key

// Fetch weather data based on user's current location
navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    fetchWeatherByCoords(latitude, longitude);
}, error => {
    console.error('Error getting location:', error);
    alert('Unable to retrieve your location. Please enter a city name.');
});

// Fetch weather data by city name
function fetchWeatherByCity() {
    const city = document.getElementById('city').value.trim();
    if (city === '') {
        alert('Please enter a city name');
        return;      
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json(); 
        })
        .then(data => {
            displayWeather(data);
            updateBackground(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data: ' + error.message);
        });
}

// Fetch weather data by coordinates
function fetchWeatherByCoords(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error fetching weather data');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
            updateBackground(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data: ' + error.message);
        });
}

// Display weather data on the page 
function displayWeather(data) {
    document.getElementById('weather').style.display = 'block';
    document.getElementById('city-name').innerText = data.name;
    document.getElementById('description').innerText = data.weather[0].description;
    
    const temperatureElement = document.getElementById('temperature');
    const temp = data.main.temp;
    temperatureElement.innerText = `Temperature: ${temp} °C`;

    if (temp > 30) {
        temperatureElement.style.color = 'red';
    } else if (temp < 20) {
        temperatureElement.style.color = 'blue';
    } else {
        temperatureElement.style.color = '#109f28'; // Default color
    }

    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind-speed').innerText = `Wind Speed: ${data.wind.speed} m/s`;
}

// Update background based on weather conditions
function updateBackground(data) {
    const weather = data.weather[0].main.toLowerCase(); // Get main weather condition (e.g., 'clear', 'rain', 'clouds', etc.)
    let background;

    switch (weather) {
        case 'clear':
            background = 'url("images/clear.jpg")';
            break;
        case 'clouds':
            background = 'url("images/cloudy.jpg")';
            break;
        case 'rain':
            background = 'url("images/rainy.jpg")';
            break;
        case 'snow':
            background = 'url("images/snowy.jpg")';
            break;
        default:
            background = 'linear-gradient(135deg, #74ebd5, #acb6e5)';
            break;
    }


}
