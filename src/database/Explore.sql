use WeatherApp;

delimiter //
create procedure searchCities(in cityName varchar(100), in countryName varchar(50))
begin
	select Id, City, Country
    from Cities
    where City like concat(cityName, '%') and Country like concat(countryName, '%')
    order by Population desc;
end //

delimiter ;
