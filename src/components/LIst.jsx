// src/components/WeatherList.jsx
import React from 'react';

import { useState, useEffect } from 'react';

import LineChartComponent from './LineChartComponent';
import BarChartComponent from './BarChartComponent';
import { Link } from 'react-router-dom';

const List = ({ setLowestTemp, setAvgMoonRise }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [moonPhase, setMoonPhase] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('https://api.weatherbit.io/v2.0/forecast/daily?city=New_York,NY&key=12de3fbcab9d4102844831ce1e9ee559');
            const result = await response.json();
            setData(result.data);
            setFilteredData(result.data);

            // Calculate lowest temperature
            const temperatures = result.data.map(item => item.temp);
            setLowestTemp(Math.min(...temperatures));

            // Calculate average moon rise time
            const moonriseTimestamps = result.data.map(item => item.moonrise_ts);
            const avgTimestamp = moonriseTimestamps.reduce((a, b) => a + b) / moonriseTimestamps.length;
            const avgTimeEST = new Date(avgTimestamp * 1000).toLocaleTimeString('en-US', { timeZone: 'America/New_York' });
            setAvgMoonRise(avgTimeEST);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData();
}, [setLowestTemp, setAvgMoonRise]);
  const handleSearch = () => {
    const filtered = data.filter(item => 
        item.datetime.includes(searchTerm) && item.moon_phase < moonPhase
    );
    setFilteredData(filtered);
};
  return (
<div className='list-component'  style={{ display: 'flex' }}>
<div style={{ width: '50%' }}>
<input 
                type='text' 
                placeholder='Enter date' 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <input 
                type='range' 
                min='0' 
                max='1' 
                step='0.01' 
                value={moonPhase} 
                onChange={(e) => setMoonPhase(e.target.value)} 
            />
            <button onClick={handleSearch}>Search</button>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temperature</th>
                        <th>Moon Rise</th>
                        <th>Phase</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((row, index) => (
                        <tr key={index}>
                            <td>{row.datetime}</td>
                            <td>{row.temp}°F</td>
                            <td>{new Date(row.moonrise_ts * 1000).toLocaleTimeString('en-US', { timeZone: 'America/New_York' })}</td>
                            {/* <td>{new Date(row.moonset_ts * 1000).toLocaleTimeString('en-US', { timeZone: 'America/New_York' })}</td> */}
                            <td>{categorizeMoonPhase(row.moon_phase)}</td>
                            <td>
                                <Link to={`/${row.datetime}`}>
                                    
                                    <img src="./public/images/details.jpg" alt="Details" style={{ width: '20px', height: '20px' }} />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
</div>
            <div className="chart-container-wrapper">
                <div className="chart-container">
                    <LineChartComponent data={data} />
                </div>
                <div className="chart-container">
                    <BarChartComponent data={data} />
                </div>
            </div>
        </div>
  );
}

function categorizeMoonPhase(phase) {
  if (0 <= phase < 0.1) return '🌑'; // New Moon
  if (0.1 <= phase < 0.2) return '🌒'; // Waxing Crescent
  if (0.2 <= phase < 0.3) return '🌓'; // First Quarter
  if (0.3 <= phase < 0.4) return '🌔'; // Waxing Gibbous
  if (0.4 <= phase < 0.5) return '🌕'; // Full Moon
  if (0.5 <= phase < 0.6) return '🌖'; // Waning Gibbous
  if (0.6 <= phase < 0.7) return '🌗'; // Last Quarter
  if (0.7 <= phase < 0.8) return '🌘'; // Waning Crescent
  return '🌑'; // New Moon for other phases
}


export default List;


