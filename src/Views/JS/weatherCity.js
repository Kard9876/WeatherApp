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

    if (cityId.length == 0) {
        window.location = backHomeURL

        return
    }

    deleteCookie(cityIdCookieName)

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

                let elem = createCurWeatherDiv(weatherId, weather, weatherDescription, temperature, humidity, wind)

                container.append(elem)
            })

            // Get Next 5 days weather prevision
            let next5WeatherApiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityLatitude}&lon=${cityLongitude}&units=metric&appid=${ApiKey}`

            // Current Weather
            // TODO
            fetch(next5WeatherApiURL).then((res) => res.json()).then((data) => {
                for (let result of data.list) {
                    nextWeatherDiv(result)
                }
            })
        })
}

/**
 * Get Weather's icon based on weather's id
 * @param {*} cod Weather's id
 * @returns Weather's icon
 */
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

/**
 * Create current weather's display element
 * @param {*} weatherId Weather's id 
 * @param {*} weather Weather's name
 * @param {*} weatherDescription Weather's description
 * @param {*} temperature Weather's temperature
 * @param {*} humidity Weather's humidity
 * @param {*} wind Weather's wind speed
 * @returns current weather's display element
 */
function createCurWeatherDiv(weatherId, weather, weatherDescription, temperature, humidity, wind) {
    let container = document.createElement("div")
    container.classList = "curCentralDiv"

    // Div containing weather's icon and type
    let bigDiv = createWeatherImage(weatherId, weather, weatherDescription, "curContainerBigDiv", "Current Weather", "curTimeText", "curBigDiv", "curBigIcon", "curBigImg", "curBigText")

    // Div containing details such as temperature, humidity and wind speed
    let smallDivContainer = document.createElement("div")
    smallDivContainer.classList = "curSmallDivContainer"

    // Temperature div
    let smallDiv1 = createTemperatureElem(temperature, "curSmallDiv", "curSmallIcon", "curSmallImg", "curSmallText")

    // Humidity div
    let smallDiv2 = createHumidityElem(humidity, "curSmallDiv", "curSmallIcon", "curSmallImg", "curSmallText")

    // Wind div
    let smallDiv3 = createWindElem(wind, "curSmallDiv", "curSmallIcon", "curSmallImg", "curSmallText")

    smallDivContainer.append(smallDiv1)
    smallDivContainer.append(smallDiv2)
    smallDivContainer.append(smallDiv3)

    container.append(bigDiv)
    container.append(smallDivContainer)

    return container
}

/**
 * Create current weather's general information
 * @param {*} weatherId Weather's id
 * @param {*} weather Weather's name
 * @param {*} weatherDescription Weather's description
 * @param {*} containerDivClassList General container classes
 * @param {*} weatherTimeText Weather's time
 * @param {*} weatherTimeClassList Waether's time element's classes
 * @param {*} divClassList Container div's classes
 * @param {*} imageDivClassList Image's container div's classes
 * @param {*} imageClassList Image's classes
 * @param {*} textClassList Text's classes
 * @returns Current weather's general information
 */
function createWeatherImage(weatherId, weather, weatherDescription, containerDivClassList, weatherTimeText, weatherTimeClassList, divClassList, imageDivClassList, imageClassList, textClassList) {
    let containerDiv = document.createElement("div");
    containerDiv.classList = containerDivClassList

    let weatherTime = document.createElement("p");
    weatherTime.innerHTML = weatherTimeText
    weatherTime.classList = weatherTimeClassList

    containerDiv.append(weatherTime)

    let div = document.createElement("div")
    div.classList = divClassList

    let imageDiv = document.createElement("div")
    imageDiv.classList = imageDivClassList

    let image = document.createElement("img")
    image.src = getWeatherIcon(weatherId)
    image.alt = weatherDescription
    image.classList = imageClassList

    imageDiv.append(image)

    let weatherType = document.createElement("p")
    weatherType.innerHTML = weather
    weatherType.classList = textClassList

    div.append(imageDiv)
    div.append(weatherType)

    containerDiv.append(div)

    return containerDiv
}

/**
 * Create current weather's temperature information~
 * @param {*} temperature Weather's temperature
 * @param {*} divClassList Container div's classes
 * @param {*} imageDivClassList Image's container div's classes
 * @param {*} imageClassList Image's classes
 * @param {*} textClassList Text's classes
 * @returns Current weather's temperature information
 */
function createTemperatureElem(temperature, divClassList, imageDivClassList, imageClassList, textClassList) {
    let div = document.createElement("div")
    div.classList = divClassList

    let imageDiv = document.createElement("div")
    imageDiv.classList = imageDivClassList

    let temperatureImg = document.createElement("img")
    temperatureImg.src = '../Images/thermometer.png'
    temperatureImg.alt = 'Temperature:'
    temperatureImg.classList = imageClassList

    imageDiv.append(temperatureImg)

    let temperatureP = document.createElement("p")
    temperatureP.classList = textClassList
    temperatureP.innerHTML = temperature + 'ºC'

    div.append(imageDiv)
    div.append(temperatureP)

    return div
}

/**
 * Create current weather's humidity information´
 * @param {*} humidity Weather's humidity
 * @param {*} divClassList Container div's classes
 * @param {*} imageDivClassList Image's container div's classes
 * @param {*} imageClassList Image's classes
 * @param {*} textClassList Text's classes
 * @returns Current weather's humidity information
 */
function createHumidityElem(humidity, divClassList, imageDivClassList, imageClassList, textClassList) {
    let div = document.createElement("div")
    div.classList = divClassList

    let imageDiv = document.createElement("div")
    imageDiv.classList = imageDivClassList

    let humidityImg = document.createElement("img")
    humidityImg.src = '../Images/humidity.png'
    humidityImg.alt = 'Humidity:'
    humidityImg.classList = imageClassList

    imageDiv.append(humidityImg)

    let humidityP = document.createElement("p")
    humidityP.classList = textClassList
    humidityP.innerHTML = humidity + '%'

    div.append(imageDiv)
    div.append(humidityP)

    return div
}

/**
 * Create current weather's wind speed information
 * @param {*} wind Weather's wind speed
 * @param {*} divClassList Container div's classes
 * @param {*} imageDivClassList Image's container div's classes
 * @param {*} imageClassList Image's classes
 * @param {*} textClassList Text's classes
 * @returns Current weather's wind speed information
 */
function createWindElem(wind, divClassList, imageDivClassList, imageClassList, textClassList) {
    let div = document.createElement("div")
    div.classList = divClassList

    let imageDiv = document.createElement("div")
    imageDiv.classList = imageDivClassList

    let windImg = document.createElement("img")
    windImg.src = '../Images/wind.png'
    windImg.alt = 'Wind Speed:'
    windImg.classList = imageClassList

    imageDiv.append(windImg)

    let windP = document.createElement("p")
    windP.classList = textClassList
    windP.innerHTML = wind + 'm/s'

    div.append(imageDiv)
    div.append(windP)

    return div
}

/**
 * Function that displays graphically the weather's data
 * @param {*} weatherData 
 */
function nextWeatherDiv(weatherData) {
    let weatherId = weatherData.weather[0].id
    let weather = weatherData.weather[0].main
    let weatherDescription = weatherData.weather[0].description
    let weatherTime = weatherData.dt_txt.substring(0, weatherData.dt_txt.lastIndexOf(':'))
    let temperature = weatherData.main.temp
    let humidity = weatherData.main.humidity
    let wind = weatherData.wind.speed

    let container = document.getElementById('nextWeather')

    let elem = createNextWeatherDiv(weatherId, weather, weatherDescription, weatherTime, temperature, humidity, wind)

    container.append(elem)
}

/**
 * Function that creates the graphical information of the weather data
 * @param {*} weatherId Weather's id
 * @param {*} weather Weather's name
 * @param {*} weatherDescription Weather's description
 * @param {*} weatherTime Weather's time
 * @param {*} temperature Weather's temperature
 * @param {*} humidity Weather's humidity
 * @param {*} wind Weather's wind speed
 * @returns A div with all graphical information of the weather data
 */
function createNextWeatherDiv(weatherId, weather, weatherDescription, weatherTime, temperature, humidity, wind) {
    let container = document.createElement("div")
    container.classList = "nextCentralDiv"

    // Div containing weather's icon and type
    let bigDiv = createWeatherImage(weatherId, weather, weatherDescription, "nextContainerBigDiv", weatherTime, "nextTimeText", "nextBigDiv", "nextBigIcon", "nextBigImg", "nextBigText")

    // Div containing details such as temperature, humidity and wind speed
    let smallDivContainer = document.createElement("div")
    smallDivContainer.classList = "nextSmallDivContainer"

    // Temperature div
    let smallDiv1 = createTemperatureElem(temperature, "nextSmallDiv", "nextSmallIcon", "nextSmallImg", "nextSmallText")

    // Humidity div
    let smallDiv2 = createHumidityElem(humidity, "nextSmallDiv", "nextSmallIcon", "nextSmallImg", "nextSmallText")

    // Wind div
    let smallDiv3 = createWindElem(wind, "nextSmallDiv", "nextSmallIcon", "nextSmallImg", "nextSmallText")

    smallDivContainer.append(smallDiv1)
    smallDivContainer.append(smallDiv2)
    smallDivContainer.append(smallDiv3)

    container.append(bigDiv)
    container.append(smallDivContainer)

    return container
}
