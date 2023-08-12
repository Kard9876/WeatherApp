import bodyParser from 'body-parser'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { renderFile } from 'ejs'
import { searchCities } from './database'

/* Constants */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const viewsFolder = path.join(__dirname + "/Views")
const htmlPages = path.join(viewsFolder + "/HTML")
const homePage = path.join(htmlPages + '/home.html')

/* Set server app and router */
const app = express()
const router = express.Router()

// Set HTML Pages location
app.set('views', htmlPages)

// Set app to use static views
app.use(express.static(viewsFolder))

app.engine('html', renderFile)

// Let express acess search parameters, etc
app.use(bodyParser.urlencoded({ extended: true }))

// Let app send back json
app.use(bodyParser.json())

// Init server
app.use('/', router)

// Let server run on localhost:3000
app.listen(3000)

// Default page
router.get('/', function (req, res) {
    res.render(homePage)
})

// Search for cities
router.get('/searchCities?', async function (req, res) {
    let city = req.query.city
    let country = req.query.city

    let results = await searchCities(city, country)

    res.json({ results: results })
})