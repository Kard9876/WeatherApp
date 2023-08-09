import pandas as pd
import mysql.connector
from mysql.connector import Error

try:
    connection = mysql.connector.connect(host='127.0.0.1',
                                        database='WeatherApp',
                                        user='root',
                                        password='darkking9876')


    if connection.is_connected():

        db_Info = connection.get_server_info()

        cursor = connection.cursor()

        excel_path = 'worldcities.xlsx'

        data = pd.read_excel(excel_path)
        dataLen = len(data)

        query = "insert into Cities (City, Country, Latitude, Longitude) values (%s, %s, %s, %s)"

        for i in range(0, dataLen):
            rowData = data.loc[i]

            city = rowData.city_ascii
            country = rowData.country
            latitude = rowData.lat
            longitude = rowData.lng

            cursor.execute(query, (city, country, latitude, longitude))

        connection.commit()
        cursor.close()
        connection.close()

except Error as e:
    print(e)
