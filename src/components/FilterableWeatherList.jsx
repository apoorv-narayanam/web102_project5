// src/components/FilterableWeatherList.jsx
import React, { useEffect, useState } from 'react';
import WeatherList from './WeatherList';
import SummaryStats from './SummaryStats';
import SearchBar from './SearchBar';

const FilterableWeatherList = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          'https://api.weatherbit.io/v2.0/history/daily?postal_code=11790&country=US&start_date=2024-10-11&end_date=2024-10-20&key=12de3fbcab9d4102844831ce1e9ee559'
        );
        const data = await response.json();
        setWeatherData(data.data);
        setFilteredData(data.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, []);

  const handleSearch = (query) => {
    const filtered = weatherData.filter((item) =>
      item.city_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <div className="dashboard">
      <SearchBar onSearch={handleSearch} />
      <SummaryStats data={filteredData} />
      <WeatherList weatherData={filteredData} />
    </div>
  );
};

export default FilterableWeatherList;
