/* Imports */
import { getCookieValue, deleteCookie } from './common.js'

/* Constants */
const cityIdCookieName = "cityId"

const backHomeURL = '../HTML/home.html'

const getCityLatLongInfoURL = '/getCityLatLong?'

const ApiKey = '7c6b100b4095b9eec996daa6c85d3044'

const weatherIcons = {
    clear_sky: 'https://openweathermap.org/img/wn/01d@2x.png',
    few_clouds: 'https://openweathermap.org/img/wn/02d@2x.png',
    scattered_clouds: 'https://openweathermap.org/img/wn/03d@2x.png',
    broken_clouds: 'https://openweathermap.org/img/wn/04d@2x.png',
    shower_rain: 'https://openweathermap.org/img/wn/09d@2x.png',
    rain: 'https://openweathermap.org/img/wn/10d@2x.png',
    thunderstorm: 'https://openweathermap.org/img/wn/11d@2x.png',
    snow: 'https://openweathermap.org/img/wn/13d@2x.png',
    mist: 'https://openweathermap.org/img/wn/50d@2x.png'
}

/**
 * Function that loads page's info
 */
window.loadPage = function loadPage() {
    let cityId = getCookieValue(cityIdCookieName)

    /*
    if (cityId.length == 0) {
        window.location = backHomeURL

        return
    }
    
    deleteCookie(cityIdCookieName)
    */

    searchCityWeather(cityId)
}

/**
 * Function that searchs the weather on the specified city
 * @param {*} cityId Database's city's id 
 */
function searchCityWeather(cityId) {
    fetch(getCityLatLongInfoURL + new URLSearchParams({ cityId: cityId }))
        .then((res) => res.json()).then((data) => {
            let cityLatitude = data.results[0].Latitude
            let cityLongitude = data.results[0].Longitude

            let curWeatherApiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${cityLatitude}&lon=${cityLongitude}&units=metric&appid=${ApiKey}`

            // Current Weather
            fetch(curWeatherApiURL).then((res) => res.json()).then((data) => {
                let weatherId = data.weather[0].id
                let weather = data.weather[0].main
                let weatherDescription = data.weather[0].description
                let temperature = data.main.temp
                let humidity = data.main.humidity
                let wind = data.wind.speed

                let container = document.getElementById('curWeather')

                let elem = createCurWeatherDiv(weatherId, weather, temperature, humidity, wind)

                container.append(elem)

                console.log(`Cur\nWeatherId: ${weatherId}\nWeather: ${weather}\nTemperature: ${temperature} ºC\nHumidity: ${humidity}%\nWind: ${wind}m/s`)
                console.log(data)
            })

            // Get Next 5 days weather prevision
            let next5WeatherApiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityLatitude}&lon=${cityLongitude}&units=metric&appid=${ApiKey}`

            // Current Weather
            fetch(next5WeatherApiURL).then((res) => res.json()).then((data) => {
                console.log("Next")
                console.log(data)
            })
        })
}

function getWeatherIcon(cod) {
    if (cod >= 200 && cod <= 232) return weatherIcons.thunderstorm

    if ((cod >= 300 && cod <= 321) || (cod >= 512 && cod <= 531)) return weatherIcons.shower_rain

    if (cod >= 500 && cod <= 504) return weatherIcons.rain

    if (cod == 511 || (cod >= 600 && cod <= 622)) return weatherIcons.snow

    if (cod >= 701 && cod <= 781) return weatherIcons.mist

    if (cod == 800) return weatherIcons.clear_sky

    if (cod == 801) return weatherIcons.few_clouds

    if (cod == 802) return weatherIcons.scattered_clouds

    return weatherIcons.broken_clouds
}

function createCurWeatherDiv(weatherId, weather, weatherDescription, temperature, humidity, wind) {
    let container = document.createElement("div")

    // Div containing weather's icon and type
    let div1 = document.createElement("div")

    let image = document.createElement("img")
    image.src = getWeatherIcon(weatherId)
    image.alt = weatherDescription
    // TODO css
    image.classList = "bigIcon"

    let weatherType = document.createElement("p")
    weatherType.innerHTML = weather

    div1.append(image)
    div1.append(weatherType)

    // TODO Div containing details such as temperature, humidity and wind speed
    let div2 = document.createElement("div")

    let temperatureElem = document.createDiv("")

    container.append(div1)
    container.append(div2)

    return container
}