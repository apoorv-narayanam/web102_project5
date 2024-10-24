// src/components/SearchBar.jsx
import React from 'react';

const Card = ({ lowestTemp, avgMoonRise, fullMoonPhase }) => {

  return (
    <div className='card-container'>
    <div className='card'>
        <strong>New York</strong><br />
        Lowest Temp: {lowestTemp}°F
    </div>
    <div className='card'>
        <strong>{avgMoonRise}</strong><br />
        Avg Moon Rise
    </div>
    <div className='card'>
        {fullMoonPhase} <br />
        Moon Phase
    </div>
</div>
  );
};

export default Card;
