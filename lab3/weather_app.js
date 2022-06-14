const api = {
    key: "7e3f21edee540e6110af347b55eb1ab2",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  

  const searchbox = document.querySelector('.search-box');
  searchbox.addEventListener('mouseout',()=>{alert("please enter a vaild city in the search box and hit enter!")});
  searchbox.addEventListener('keypress', setQuery);
  
  function setQuery(event) {
    
    if (event.keyCode == 13) {
      getResults(searchbox.value);
    }
  }
  
  function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
      .then(weather =>weather.json()).then((response)=>{
        
        //console.log(response)
        var result = response.message;
       if(result!=undefined){
          alert(result);
       }{
        displayResults(response)
       }
        }
        ).catch(error=>{
         console.log(error)  
        });
  }
  
  function displayResults (weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
  
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
  
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let feels_like = document.querySelector('.feels-like');
    feels_like.innerHTML=`<P>feels like: <span> ${Math.round(weather.main.feels_like)}°c</span></P>`;
  
    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

    let pressure = document.querySelector('.pressure');
    pressure.innerHTML=`<p>Pressure: <span>${weather.main.pressure} mb</span></p>`;

    let humidity = document.querySelector('.humid');
    humidity.innerHTML=`<p>Humidity: <span>${weather.main.humidity} %</span></p>`;
    
    let wind = document.querySelector('.wind');
    wind.innerHTML=`<p>Wind Speed: <span>${weather.wind.speed} km/h</span></p>`;

    let visibility = document.querySelector('.visibility');
    visibility.innerHTML=`<p>Visibility: <span>${(weather.visibility)/1000} km</span></p>`;
  }
  
  function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }