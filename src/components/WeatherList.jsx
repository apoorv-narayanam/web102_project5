// src/components/WeatherList.jsx
import React from 'react';

const WeatherList = ({ weatherData }) => {
  return (
    <div className="weather-list">
      {weatherData.map((item) => (
        <div key={item.city_name} className="card">
          <h3>{item.city_name}</h3>
          <p>Date: {item.datetime}</p>
          <p>Temperature: {item.temp}°C</p>
          <p>Wind Speed: {item.wind_spd}</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherList;
