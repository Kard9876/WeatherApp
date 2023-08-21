import { setCookieValue, removeAllChildren } from './common.js'

/* Constants */
const searchCitiesURL = '/searchCities?'
const weatherCityURL = '../HTML/weatherCity.html'


// Function that loads all thhats necessary when the page is loaded
window.loadPage = function loadPage() {
    let searchIcon = document.getElementById("searchIcon")

    searchIcon.addEventListener('submit', searchCitiesSubmit)
}

// Function that searches for the user's desired cities 
window.searchCitiesSubmit = function searchCitiesSubmit(event) {
    event.preventDefault()

    let seachDiv = event.target.childNodes[1]

    let cityElem = seachDiv.childNodes[1]
    let countryElem = seachDiv.childNodes[3]

    let city = cityElem.value
    let country = countryElem.value

    cityElem.value = ""
    countryElem.value = ""

    displaySearchResults(city, country)
}

function displaySearchResults(city, country) {
    fetch(searchCitiesURL + new URLSearchParams({ city: city, country: country }))
        .then((res) => res.json()).then((data) => {

            let container = document.getElementById('searchResultsContainer')

            removeAllChildren(container)

            for (let location of data.results) {
                let cityName = location.City
                let countryName = location.Country
                let locationId = location.Id

                let div = document.createElement('div')
                div.classList = "searchResult"

                let p = document.createElement('p')
                p.classList = "searchResultContent"

                p.innerHTML = cityName + ', ' + countryName

                div.append(p)

                div.addEventListener('click', function () {
                    weatherCity(locationId)
                })

                container.append(div)
            }

        })
}

window.searchCitiesChange = function searchCitiesChange() {
    let city = document.getElementById("cityName").value
    let country = document.getElementById("countryName").value

    if (city == "" && country == "") return

    displaySearchResults(city, country)
}

// Function that load the page with the city's weather
function weatherCity(id) {
    setCookieValue("cityId", id, { 'expiration': { 'minutes': 10 } })

    window.location = weatherCityURL
}