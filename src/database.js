import mysql from 'mysql'

const databaseConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: 'darkking9876',
    database: 'WeatherApp'
}

async function searchCities(city, country) {
    return new Promise((resolve, reject) => {
        const connection = mysql.connect(databaseConfig)

        connection.query()

        connection.end()
    })
}

export { searchCities }
