import * as mysql from 'mysql'

const databaseConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: 'darkking9876',
    database: 'WeatherApp'
}

async function searchCities(city, country) {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(databaseConfig)

        connection.connect()

        city = city.replace('\'', '\\\'')
        country = country.replace('\'', '\\\'')

        let query = `call searchCities('${city}', '${country}')`

        connection.query(query, function (err, rows, fields) {
            if (err) {
                console.error(err)

                return
            }

            resolve(rows[0])
        })

        connection.end()
    })
}

async function getCityLatLong(cityId) {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(databaseConfig)

        connection.connect()

        let query = `call getCityLatLong('${cityId}')`

        connection.query(query, function (err, rows, fields) {
            if (err) {
                console.error(err)

                return
            }

            resolve(rows[0])
        })

        connection.end()
    })
}

export { searchCities, getCityLatLong }
