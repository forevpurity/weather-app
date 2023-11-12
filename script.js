let weatherData;
let isValid;

const searchInput = document.querySelector("input");
const error = document.querySelector(".error");
const condition = document.querySelector(".condition");
const loc = document.querySelector(".location");
const temp = document.querySelector(".temp");
const feel = document.querySelector(".feel");
const wind = document.querySelector(".wind");
const humid = document.querySelector(".humid");

const fetchWeatherData = async (location) => {
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=cbc854fcf59a4aeba0791823231011&q=${location}&aqi=no`
  );
  const weatherData = await response.json();
  return weatherData;
};

const getWeatherData = (location = "Ho chi minh") => {
  fetchWeatherData(location).then((result) => {
    if (result?.error) isValid = 0;
    else {
      isValid = 1;
      weatherData = result;
      updateUI();
    }
  });
};

const updateUI = () => {
  condition.textContent = weatherData.current.condition.text;
  loc.textContent = `${weatherData.location.name}, ${weatherData.location.country}`;
  temp.textContent = weatherData.current.temp_c;
  feel.textContent = `feels like: ${weatherData.current.feelslike_c}`;
  wind.textContent = `wind: ${weatherData.current.wind_kph} kph`;
  humid.textContent = `humidity: ${weatherData.current.humidity}%`;
};

getWeatherData();

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && searchInput != "") {
    getWeatherData(searchInput.value);
    if (isValid) {
      searchInput.value = "";
    } else {
      error.style.display = "block";
      setTimeout(() => {
        error.style.display = "none";
      }, 5000);
    }
  }
});
