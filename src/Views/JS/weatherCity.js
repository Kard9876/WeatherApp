/* Imports */
import { getCookieValue, deleteCookie } from './common.js'

/* Constants */
const cityIdCookieName = "cityId"

const backHomeURL = '../HTML/home.html'

const getCityLatLongInfoURL = '/getCityLatLong?'

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

            console.log(cityLatitude, cityLongitude)
        })
}