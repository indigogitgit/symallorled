/* ===============================
   OPEN-METEO (без API ключа)
   =============================== */

const LAT = 44.7866;   //  Belgrade
const LON = 20.4489;

const URL = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true&timezone=auto`;

/* --- Расшифровка weathercode --- */
function getWeatherDescription(code) {
    const weatherCodes = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Cloudy",
        45: "Fog",
        48: "Rime fog",
        51: "Light drizzle",
        53: "Drizzle",
        55: "Heavy drizzle",
        61: "Light rain",
        63: "Rain",
        65: "Heavy rain",
        71: "Light snow",
        73: "Snow",
        75: "Heavy snow",
        80: "Light showers",
        81: "Showers",
        82: "Heavy showers",
        95: "Thunderstorm"
    };

    return weatherCodes[code] || "Weather";
}

/* --- Загрузка погоды --- */
async function fetchWeather() {
    try {
        const response = await fetch(URL);
        const data = await response.json();

        const current = data.current_weather;

        // Температура
        const temp = Math.round(current.temperature);
        document.querySelector(".weather-temp").textContent = `${temp}°C`;

        // Описание
        document.querySelector(".weather-desc").textContent =
            getWeatherDescription(current.weathercode);

         // Дата вручную (независимо от локали системы)
        const apiDate = new Date(current.time);

        const day = apiDate.getDate();
        const year = apiDate.getFullYear();

        const months = [
            "January","February","March","April","May","June",
            "July","August","September","October","November","December"
        ];

        const month = months[apiDate.getMonth()];

        document.getElementById("dateBlock").textContent =
            `${day} ${month} ${year}`;
    } catch (error) {
        console.error("Weather loading error:", error);
        document.querySelector(".weather-desc").textContent = "No data";
    }
}

/* --- Локальные часы (обновление каждую секунду) --- */
function updateClock() {
    const now = new Date();
    document.getElementById("timeBlock").textContent =
        now.toLocaleTimeString('ru-RU');
}

/* --- ИНИЦИАЛИЗАЦИЯ --- */
fetchWeather();
updateClock();

setInterval(fetchWeather, 600000); // каждые 10 минут
setInterval(updateClock, 1000);    // каждую секунду