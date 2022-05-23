// window.addEventListener('load', () => {
//     let long;
//     let lat;

//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(position => {
//             console.log(position);
//             long = position.coords.longitude;
//             lat = position.coords.latitude;
//             const api = `https://api.darksky.net/forecast/9e7ba84cee3459c751976b915298f81d/${lat},${long}`;
//         });
//         fetch(api)
//     }
// })
// https://api.openweathermap.org/data/2.5/weather?q=Denver&appid=0272983c99007b9d9ed9729bb3b9351e

import apiKey from './apiKey.js';
let weather = {
    apiKey: apiKey,
    fetchWeather: function (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)
            .then(response => {
                return response.json();
            }).then(data => {
                if (data.cod === "404") {
                    alert(data.message);
                } else {
                    document.querySelector('.loader').style.display = 'block';
                    this.displayWeather(data);

                }
            }).catch(err => {
                alert(err + '. Please check your Internet connection')
            })
    },
    displayWeather: function (data) {
        document.querySelector('.loader').style.display = 'none';
        console.log(data);
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        // console.log(name, icon, description, temp, speed, humidity)
        document.querySelector('.city').innerText = 'Weather in ' + name;
        document.querySelector('.icon').src = `https://openweathermap.org/img/wn/${icon}.png`;
        document.querySelector('.description').innerText = description;
        document.querySelector('.temp').innerText = temp + '°C';
        document.querySelector('.humidity').innerText = 'Humidity: ' + humidity + '%';
        document.querySelector('.wind').innerText = 'Wind Speed: ' + speed + 'km/h';
        document.querySelector('.weather').classList.remove('loading');

    },
    search: function () {
        const city = document.querySelector('.search-bar').value;
        console.log(city);
        if (city == '') {
            alert('Please enter a city');
        } else {
            this.fetchWeather(city);
        }
    }

}


let searchBar = document.querySelector('.search-bar')
if (searchBar) {
    searchBar.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            weather.search();
        }
    })
}
let searchBtn = document.querySelector('.search button')

if (searchBtn) {
   
    searchBtn.addEventListener('click', () => {
        weather.search();
    })
}

let signupForm = document.querySelector('#signup-form')
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('here')
        window.location.href = '/home.html'
    })
}


