// https://openweathermap.org/current
// https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=${units}&lang=${lang}
// https://openweathermap.org/weather-conditions

//elementos HTML
const weatherApp = document.getElementById("weather-app");
const form =  document.getElementById("form-Weather");
const cityInput = document.getElementById("city-input");
const btn = document.getElementById("btn-weather");

//API info
const api_key = "f33e35b2762492a05cabd2f89a04851f";
const units = "metric";
const lang = "pt_br";

form.addEventListener("submit", async (e) =>{
    e.preventDefault();

    const cityName = cityInput.value.trim();

    if(cityName === ""){
        displayError("Por favor preencha o campo com uma informação válida!");
        return
    }

    try{
        const cityData = await fetchWeather(cityName);
        createCard(cityData);
        cityInput.value = "";
    }
    catch(error){
        displayError(error.message);
    }
});

async function fetchWeather(city){

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=${units}&lang=${lang}`;

    const response = await fetch(url);
        
    if(!response.ok){
        throw new Error("Cidade não encontrada!");
    }

    const data  = await response.json();

        console.log(response);
        console.log(data)

    return data;
}

function createCard(data){

    removePrevious();

    //div
    const card = document.createElement("div");
    card.textContent = "";
    card.classList.add("card");
    card.style.display = "flex";

    //cidade
    const city = document.createElement("h1");
    city.textContent = `${data.name}, ${data.sys.country}`;
    city.classList.add("display-city");

    //temperatura
    const temperature = document.createElement("p");
    temperature.textContent = `${data.main.temp.toFixed(1)} Cº`;
    temperature.classList.add("display-temperature");

    
    //humidade
    const humidity = document.createElement("p");
    humidity.textContent = `Humidade: ${data.main.humidity}%`;;
    humidity.classList.add("display-humidity");

    //descrição
    const description = document.createElement("p");
    description.textContent = data.weather[0].description;
    description.classList.add("display-description");
    
    //icone
    const icon = document.createElement("p");
    icon.textContent = getWeatherIcon(data.weather[0].id);
    icon.classList.add("display-icon");

    weatherApp.appendChild(card);
    card.append(city, temperature, humidity, description, icon);
}

function getWeatherIcon(weatherId){
    
    switch(true){
        case weatherId >= 200 && weatherId <= 299:
            return "⛈️"; // Grupo 2xx: Tempestade
        case weatherId >= 300 && weatherId <= 399:
            return "🌦️"; // Grupo 3xx: Chuvisco
        case weatherId >= 500 && weatherId <= 599:
            return "🌧️"; // Grupo 5xx: Chuva
        case weatherId >= 600 && weatherId <= 699:
            return "❄️"; // Grupo 6xx: Neve
        case weatherId >= 700 && weatherId <= 799:
            return "🌫️"; // Grupo 7xx: Atmosfera
        case weatherId === 800:
            return "☀️"; // Grupo 800: Limpar
        case weatherId >= 801 && weatherId <= 899:
            return "☁️"; // Grupo 80x: Nuvens
        default:
            return "❓";
    }
}

function displayError(errorMessage){

    removePrevious();

    const displayError = document.createElement("p");
    displayError.textContent = errorMessage;
    displayError.classList.add("display-error");

    weatherApp.appendChild(displayError);
}

function removePrevious(){
    const removePreviousCard = document.querySelector(".card");
    const removePreviousError = document.querySelector(".display-error");

    if(removePreviousCard){
        removePreviousCard.remove();
    }

    if(removePreviousError){
        removePreviousError.remove();
    }
}