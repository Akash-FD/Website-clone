const apikey = "16a3f59710922d6a63147cb85203dbb9";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const input = document.getElementById("input")
const btn = document.getElementById("btn")

async function wether(city) {

    const responce = await fetch(apiUrl + `&q=${city}` + `&appid=${apikey}`)
    const data = await responce.json();
    
    console.log(data);

    document.getElementById("city").innerHTML = data.name
    document.getElementById("temp").innerHTML =Math.round(data.main.temp) +" c"
    document.getElementById("humidity").innerHTML = data.main.humidity +" %"
    document.getElementById("wind").innerHTML = data.wind.speed +" km/h"
}
 
btn.addEventListener("click",()=>{

    wether(input.value)
})
    
    