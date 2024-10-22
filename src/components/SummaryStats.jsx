// src/components/SummaryStats.jsx
import React from 'react';

const SummaryStats = ({ data }) => {
  const totalItems = data.length;
  const meanTemp = 
    data.reduce((sum, item) => sum + item.temp, 0) / totalItems;

  return (
    <div className="summary">
      <h2>Summary Statistics</h2>
      <p>Total Locations: {totalItems}</p>
      <p>Average Temperature: {meanTemp.toFixed(2)}°C</p>
    </div>
  );
};

export default SummaryStats;
