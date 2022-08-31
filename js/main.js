// global variable
let response;
let result;

// 7 varibals card one 
let currentDayName = document.getElementById('dayOne');
let currentDate = document.getElementById('date');
let currentLocation = document.getElementById('loc');
let currentTemp = document.getElementById('degreeOne');
let currentIcon = document.getElementById('img');
let currentWindPerc = document.getElementById('tempPerc');
let currentTempKm = document.getElementById('tempKm');
let currentTempDirec = document.getElementById('tempDirection');
let currentCondWeather = document.getElementById('condWeather');

// forcasting 5 variabls for tow cards
let forcastDaysName = document.getElementsByClassName('forcastDay'),
    forcastIcon = document.getElementsByClassName('forcastImg'),
    forcastTempC = document.getElementsByClassName('forcastTempC'),
    forcastTempF = document.getElementsByClassName('forcastTempF'),
    forcastCondition = document.getElementsByClassName('forcastCondition');

// search button 
let search = document.getElementById('search');
let submit = document.getElementById('submit');

monthName = ['Jan','Feb','March','April','May','June','July','Aug','Spet','Oct','Nov','Dec'],
days = [
   "Sunday",
   "Monday",
   "Tuesday",
   "Wednesday",
   "Thursday",
   "Friday",
   "Saturday",
 ];


function displayCardOne(){
    let date = new Date();
    currentDayName.innerHTML = days[date.getDay()];
    currentDate.innerHTML = `${date.getDate()} ${monthName[date.getMonth()]}`;
    currentLocation.innerHTML = result.location.name;
    currentTemp.innerHTML = `${result.current.temp_c}<sup>o</sup>C`;
    currentIcon.setAttribute('src', `https:${result.current.condition.icon}`);
    currentWindPerc.innerHTML = `${result.current.humidity}%`;
    currentTempKm.innerHTML = `${result.current.wind_kph}Km/h`;
    currentTempDirec.innerHTML = `${result.current.wind_dir}`;
    currentCondWeather.innerHTML = result.current.condition.text;

    console.log(currentLocation.innerHTML = result.location.name);
}

function dispalyTowCards(){
    let date = new Date();
    for(let i =0 ; i <= forcastDaysName.length; i++)
    {
        forcastDaysName[i].innerHTML = days[new Date(result.forecast.forecastday[i+1].date).getDay()];
        forcastIcon[i].setAttribute('src', `https:${result.forecast.forecastday[i+1].day.condition.icon}`);
        forcastTempC[i].innerHTML = `${result.forecast.forecastday[i+1].day.maxtemp_c} <sup>o</sup>C`;
        forcastTempF[i].innerHTML = `${result.forecast.forecastday[i+1].day.mintemp_c} <sup>o</sup>C`;
        forcastCondition[i].innerHTML = result.forecast.forecastday[i+1].day.condition.text;
        console.log(forcastDaysName[i].innerHTML);
    }
}

async function fetchURL(currentCity = 'Cairo'){
    response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${currentCity}&days=3`)
    result = await response.json();
    console.log(result)
    displayCardOne()
    dispalyTowCards()
}
fetchURL()

search.addEventListener('keyup', function(){
    let city = search.value;
    fetchURL(city)
    submit.addEventListener('click',function(){
        search.value = '';
    })

})