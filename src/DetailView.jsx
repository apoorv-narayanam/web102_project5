import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/Navbar'; 
import './DetailView.css';
function DetailView() {
    const { date } = useParams(); // Get the date from the URL
    const [details, setDetails] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=New_York,NY&key=12de3fbcab9d4102844831ce1e9ee559`);
                const result = await response.json();
                const selectedDateData = result.data.find(item => item.datetime === date);
                setDetails(selectedDateData);
            } catch (error) {
                console.error('Error fetching details:', error);
            }
        };

        fetchDetails();
    }, [date]);

    if (!details) {
        return <div>Loading...</div>;
    }

    return (
        <div className="detail-view">
    <div className='left-pane'>    
    <Header />
    <NavBar />
    </div>
            <div className="main-content">
                
                <div className="content">
                    <div className="detail-card">
                        <h2>Date: {details.datetime}</h2>
                        <p><strong>Phase:</strong> {categorizeMoonPhase(details.moon_phase)}</p>
                        <p><strong>Visibility:</strong> {details.moon_phase * 100}%</p>
                        <p><strong>Moonrise:</strong> {new Date(details.moonrise_ts * 1000).toLocaleTimeString('en-US', { timeZone: 'America/New_York' })}</p>
                        <p><strong>Moonset:</strong> {new Date(details.moonset_ts * 1000).toLocaleTimeString('en-US', { timeZone: 'America/New_York' })}</p>
                        <p><strong>Description:</strong> The moon is at {details.moon_phase * 180} degrees away from the sun and is fully illuminated.</p>
                    </div>
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

export default DetailView;
