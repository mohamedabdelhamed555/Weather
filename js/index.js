const apiKey='f466d2eb0c5c42afb88175814252806';
const findButton=document.getElementById("find");
const myLocation=document.getElementById("find-Location")

findButton.addEventListener("click",getWeather)
myLocation.addEventListener("click",getMyLocationWeather)


async function getWeather() {   
    try {
        const input = document.getElementById("search").value.trim();
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${input}&days=3`);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.log(error);
    }
}


async function getMyLocationWeather() {   
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=cairo&days=3`);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.log(error);
    }
}



function displayWeather(data) {
    const forecast = data.forecast.forecastday;
    blackBox=``;
    for (let i = 0; i < forecast.length; i++) {
        const day = forecast[i];
        const date = new Date(day.date);
        const dayName = date.toLocaleDateString("en-UK", { weekday: "long" });
        const currentDate = date.toLocaleDateString("en-UK", {
            day: "numeric",
            month: "long"
          });
          
        blackBox+=`<div class="col-lg-4">
                    <div class="card w-75 ms-5 mt-5">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <span>${dayName}</span>
                            <span>${currentDate}</span>
                        </div>
                        <div class="card-body mt-2 text-center">
                            <h5 class="card-title">${data.location.name}</h5>
                            <p class="card-text fs-1 fw-bolder py-3">${day.day.avgtemp_c}°C</p>
                            <img src="https:${day.day.condition.icon}" width="60px" alt="${day.day.condition.text}">
                            <p class="py-3">${day.day.condition.text}</p>
                        </div>
                    </div>
                </div>`;        
    }
    document.getElementById("weather").innerHTML=blackBox;
}