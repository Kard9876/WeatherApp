use WeatherApp;

delimiter //
create procedure searchCities(in city varchar(100), in country varchar(50))
begin
	select City, Country
    from Cities
    where City like concat(city, '%') and country like (country, '%')
    order by Population desc;
end //

delimiter ;
