// src/components/SummaryStats.jsx
import React from 'react';

const Navbar = () => {

  return (
    <nav>
    <ul>
    
        <li><span role='img' aria-label='dashboard'>🏠</span> <a href="#">Dashboard</a></li>
         
        <li><span role='img' aria-label='search'>🔍</span><a href="#">Search</a></li>
         
        <li><span role='img' aria-label='about'>ℹ️</span><a href="#">About</a></li>
    </ul>
</nav>
  );
};

export default Navbar;
