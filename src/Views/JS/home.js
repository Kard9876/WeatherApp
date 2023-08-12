/* Constants */
const searchCitiesURL = '/searchCities?'

// Function that loads all thhats necessary when the page is loaded
window.loadPage = function loadPage() {
    let searchIcon = document.getElementById("searchIcon")

    searchIcon.addEventListener('submit', searchCities)
}

// Function that searches for the user's desired cities 
window.searchCities = function searchCities(event) {
    event.preventDefault()

    let seachDiv = event.target.childNodes[1]

    let cityElem = seachDiv.childNodes[1]
    let countryElem = seachDiv.childNodes[3]

    let city = cityElem.value
    let country = countryElem.value

    cityElem.value = ""
    countryElem.value = ""

    console.log(city, country)
}