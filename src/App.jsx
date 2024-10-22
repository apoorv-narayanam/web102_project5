// src/App.jsx
import React from 'react';
import FilterableWeatherList from './components/FilterableWeatherList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Dashboard</h1>
      </header>
      <FilterableWeatherList />
    </div>
  );
}

export default App;
