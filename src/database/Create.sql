drop database if exists WeatherApp;

create database WeatherApp;

use WeatherApp;

create table Cities(
	Id int not null auto_increment,
    City varchar(100) not null,
    Country varchar(50) not null,
    Latitude double not null,
    Longitude double not null,
    primary key (Id)
);
