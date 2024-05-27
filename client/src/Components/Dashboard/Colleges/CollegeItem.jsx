import React, { useState } from 'react';

const CollegeItem = ({ college, onAddCollege }) => {
    const [isAdded, setIsAdded] = useState(false);
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    const handleClick = () => {
        if (!isAdded) {
            onAddCollege(college);
            setIsAdded(true);
            setMessage("Added to your colleges.");
        } else {
            setMessage("This college has already been added.");
        }
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
    };

    return (
        <div className="college-item">
            {showMessage && <div className="popup-message">{message}</div>}
            <img src={college.logo} alt={college.name} className="college-logo" />
            <div className="college-details">
                <h5>{college.name}</h5>
                <p>{college.address}</p>
            </div>
            <div className="buttons-container">
                <button 
                    className={isAdded ? "added-to-colleges" : "add-to-colleges"}
                    onClick={handleClick}
                    disabled={isAdded} // Disable button when college is already added
                >
                    {isAdded ? "College Added" : "Add to Colleges"}
                </button>
                <button className="view">View</button>
            </div>
        </div>
    );
};

export default CollegeItem;