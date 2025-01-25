const cityElement = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility-distance");
const descriptionText = document.querySelector(".description-text");
const date = document.querySelector(".date");
const descriptionIcon = document.querySelector(".description i");

const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input");

const apiKey = "b74e3ee04ef7a010c50e3b225814eb60"; 


async function fetchWeatherData(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) {
            
            throw new Error(`City not found: ${city}`);
        }

        const data = await response.json();
        console.log("Weather Data:", data); 
        updateWeatherUI(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        showError(`Unable to fetch data for "${city}". Please try again.`);
    }
}

// Function to update the UI with fetched weather data
function updateWeatherUI(data) {
    cityElement.textContent = data.name || "Unknown City";
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    windSpeed.textContent = `${data.wind.speed} km/h`;
    humidity.textContent = `${data.main.humidity}%`;
    visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
    descriptionText.textContent = capitalize(data.weather[0].description);

    const currentDate = new Date();
    date.textContent = currentDate.toDateString();

    const weatherIconName = getWeatherIconName(data.weather[0].main);
    descriptionIcon.className = `material-icons`; 
    descriptionIcon.textContent = weatherIconName;
}

// Event listener for the form submission
formElement.addEventListener("submit", function (e) {
    e.preventDefault();

    const city = inputElement.value.trim();
    if (city) {
        fetchWeatherData(city);
        inputElement.value = ""; 
    }
});

// Function to map weather conditions to icon names
function getWeatherIconName(weatherCondition) {
    const iconMap = {
        Clear: "wb_sunny",
        Clouds: "wb_cloudy",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "cloud",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "cloud",
    };

    return iconMap[weatherCondition] || "help";
}

// Function to capitalize the first letter of a string
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to show error messages
function showError(message) {
    cityElement.textContent = "Error";
    temperature.textContent = "--°C";
    windSpeed.textContent = "-- km/h";
    humidity.textContent = "--%";
    visibility.textContent = "-- km";
    descriptionText.textContent = message;
    descriptionIcon.className = `material-icons`;
    descriptionIcon.textContent = "error";
}
