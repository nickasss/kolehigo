import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Koheligo from '../../DashboardAssets/KolehiGO_ICON.png';
import Colleges from '../../DashboardAssets/Colleges_Button_(1).png';
import Profile from '../../DashboardAssets/Profile_Button_(1).png';
import Scholarships from '../../DashboardAssets/Scholarship_Button_(1).png';
import Logout from '../../DashboardAssets/Logout.png';
import NotificationIcon from '../../DashboardAssets/Notification.png';

const VerticalContainer = () => {
    const navigate = useNavigate();
    const [showNotifications, setShowNotifications] = useState(false);

    const handleLogout = () => {
        navigate('/'); // Navigate to login page
    };

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    return (
        <div>
            <div className='VerticalContainer'>
                <div className='Koheligo'><img src={Koheligo} alt="KoheliGO icon"/></div>
                <Link to={'/Dashboard'}>
                    <button className="Profile">
                        <img src={Profile} alt="Profile icon"/> Profile
                    </button>
                </Link>
                <Link to={'/colleges'}>
                    <button className="Colleges">
                        <img src={Colleges} alt="College icon"/> Colleges
                    </button>
                </Link>
                <Link to={'/Scholarships'}>
                    <button className="Scholarships">
                        <img src={Scholarships} alt="Scholarships icon"/> Scholarships
                    </button>
                </Link>
                <button className="Notifications" onClick={toggleNotifications}>
                    <img src={NotificationIcon} alt="Notifications icon"/> Notifications
                </button>
                <button className="Logout" onClick={handleLogout}>
                    <img src={Logout} alt="Logout icon" style={{filter: 'invert(0.5)'}}/> Logout
                </button>
            </div>
            {showNotifications && (
                <div className="notification-overlay">
                    <div className="notification-content">
                        {/* Notification content goes here */}
                        <h2>Notifications</h2>
                        <p>You have 0 new messages.</p>
                        <button onClick={() => setShowNotifications(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default VerticalContainer;
