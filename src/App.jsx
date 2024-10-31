// src/App.jsx
import React from 'react';
import Header from './components/Header';
import NavBar from './components/Navbar';
import Card from './components/Card';
import List from './components/List';
import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DetailView from './DetailView';

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:date" element={<DetailView />} /> {/* Dynamic route */}
          </Routes>
      </Router>
  );
}
function Home() {
  const [lowestTemp, setLowestTemp] = useState(null);
  const [avgMoonRise, setAvgMoonRise] = useState(null);
  const [fullMoonPhase, setFullMoonPhase] = useState('🌕');
  return (
    <div className='app'>
    <div className='left-pane'>    
    <Header />
    <NavBar />
    </div>
    <div className='right-pane'>
    <Card
                    lowestTemp={lowestTemp}
                    avgMoonRise={avgMoonRise}
                    fullMoonPhase={fullMoonPhase}
                />
                    <List
                    setLowestTemp={setLowestTemp}
                    setAvgMoonRise={setAvgMoonRise}
                />

    </div>
</div>
  );
}

export default App;
