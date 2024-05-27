import React, { useState } from 'react';

import Search from '../../../DashboardAssets/CollegesAssets/SearchBarAssets/Search.png'

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        // Handle the search logic here
        console.log(`Searching for: ${searchTerm}`);
    };

    return (
        <div className='SearchBar'>
            <h1>Find your dream College</h1>
            <img src={Search} alt='Search' className='Search-img' style={{ width: '20px', height: '20px' }} />
            <button onClick={handleSearch} className="search-button">Filters</button>
            <input
                type="text"
                placeholder="Search for Colleges..."
                value={searchTerm}
                onChange={handleChange}
                className="search-bar"
            />
            
        </div>
    );
};

export default SearchBar;