import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import '../Colleges/Colleges.scss';
import { useColleges } from '../Colleges/CollegeContext.jsx';

const CollegeList = () => {
    const { addCollege, isCollegeAdded } = useColleges();
    const [colleges, setColleges] = useState([]);
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [filter, setFilter] = useState([]);
    const [areaFilter, setAreaFilter] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        fetchColleges();
    }, []);

    const fetchColleges = () => {
        const queryParams = new URLSearchParams();
        if (filter.length > 0) queryParams.append('type', filter.join(','));
        if (areaFilter.length > 0) queryParams.append('area', areaFilter.join(','));

        Axios.get(`http://localhost:3010/colleges?${queryParams.toString()}`).then(response => {
            setColleges(response.data);
        }).catch(error => {
            console.error('Error fetching colleges:', error);
        });
    };

    const applyFilters = () => {
        fetchColleges();
    };

    const toggleFilterVisibility = () => {
        setShowFilters(!showFilters);
    };

    const handleCheckboxChange = (filterType, value) => {
        const update = prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value];
        if (filterType === 'type') setFilter(update);
        else if (filterType === 'area') setAreaFilter(update);
    };

    const handleAddCollege = (college) => {
        if (!isCollegeAdded(college.college_id)) {
            addCollege(college);
            setMessage(`${college.name} Added Successfully!`);
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 3000);
        } else {
            setMessage(`${college.name} has already been added.`);
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 3000);
        }
    };

    return (
        <div className="college-list">
            <button onClick={toggleFilterVisibility} className="toggle-filters-button">
                {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            {showFilters && (
                <div className='label-container'>
                    <div>
                        <label>
                            <input type="checkbox" value="Private" checked={filter.includes('Private')}
                                onChange={(e) => handleCheckboxChange('type', 'Private')} /> Private
                        </label>
                        <label>
                            <input type="checkbox" value="Public" checked={filter.includes('Public')}
                                onChange={(e) => handleCheckboxChange('type', 'Public')} /> Public
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="checkbox" value="Urban" checked={areaFilter.includes('Urban')}
                                onChange={(e) => handleCheckboxChange('area', 'Urban')} /> Urban
                        </label>
                        <label>
                            <input type="checkbox" value="Rural" checked={areaFilter.includes('Rural')}
                                onChange={(e) => handleCheckboxChange('area', 'Rural')} /> Rural
                        </label>
                    </div>
                    <button onClick={applyFilters} className='Apply-filters'>Apply Filter</button>
                </div>
            )}
            {showMessage && <div className="application-submitted">{message}</div>}
            {colleges.map((college, index) => (
                <div key={index} className="college-item">
                    <img src={college.logo} alt={college.name} className="college-logo" />
                    <div className="college-details">
                        <h5>{college.name}</h5>
                        <p>{college.address}</p>
                        <button
                            className={isCollegeAdded(college.college_id) ? "added-to-colleges" : "add-to-colleges"}
                            onClick={() => handleAddCollege(college)}
                        >
                            {isCollegeAdded(college.college_id) ? "College Added" : "Add to Colleges"}
                        </button>
                        <Link to={`/CollegeView`}>
                            <button className="view">View More</button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CollegeList;
