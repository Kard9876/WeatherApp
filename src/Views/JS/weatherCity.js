/* Imports */
import { getCookieValue, deleteCookie } from './common.js'

/* Constants */
const cityIdCookieName = "cityId"

const backHomeURL = '../HTML/home.html'

const getCityLatLongInfoURL = '/getCityLatLong?'

const ApiKey = '7c6b100b4095b9eec996daa6c85d3044'

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
                console.log("Cur")
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