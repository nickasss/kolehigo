import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CollegeView.css';
import Koheligo from '../../../../DashboardAssets/KolehiGO_ICON.png';
import College from '../../../../DashboardAssets/Colleges_Button_(1).png';
import Profilebut from '../../../../DashboardAssets/Profile_Button_(1).png';
import Scholarships from '../../../../DashboardAssets/Scholarship_Button_(1).png';
import college1 from '../../../../DashboardAssets/CollegesAssets/college1.png';
import kolehigo from '../../../../DashboardAssets/CollegesAssets/Kolehigo.png';
import CPU from '../../../../DashboardAssets/CollegesAssets/CPU.png';
import SearchBar from '../../Colleges/SearchBar.jsx';
import Description from '../CollegeView/Description/Description.jsx';
import ApplicationProcess from './ApplicationProcess/ApplicationProcess.jsx';
import Tuition from './Tuition/Tuition.jsx';
import Reviews from './Reviews/Reviews.jsx';
import SideBar from "../../../Dashboard/VerticalContainer.jsx";


const CollegeView = () => {
    const [selectedTab, setSelectedTab] = useState('Description');

    const renderComponent = () => {
        switch (selectedTab) {
            case 'Description':
                return <Description />;
            case 'Application Process & Requirements':
                return <ApplicationProcess />;
            case 'Tuition':
                return <Tuition />;
            case 'Reviews':
                return <Reviews />;
            default:
                return null;
        }
    };

    return (
        <div>
            <div className='Grid5'>
                <div className='VerticalContainer'>
                    <SideBar />
                 </div>
                 <div className='HorizontalContainer'>
                    <img src={kolehigo} alt='kolehigologo' className='kolehigo'/>
                    {<SearchBar />}
                    <img src={college1} alt="college1" className='college1'/>
                </div>
                <div className ='HorizontalContainer1'>
                    <div className="Left">
                        <img src={CPU} alt='Search' className='CPU'/>
                        <h1>Central Philippine University</h1>
                        <p>CPU Research and Development Building, Jaro,<br/> Iloilo City, 5000 Iloilo</p>
                    </div>
                    <div className="Right"> 
                        <Link to={'/Compare'}><button className="Compare">Compare</button></Link>
                        <button className="Apply">Add to Colleges</button>
                    </div>
                </div>
                <div className='fill'>
                
                </div>
                <div className='HorizontalContainer2'>
                    <div class="MiniTabs">
                        <button className={`AppInfo ${selectedTab === 'Description' ? 'underline' : ''}`} onClick={() => setSelectedTab('Description')}>Description</button>
                        <button className={`LogCred ${selectedTab === 'Application Process & Requirements' ? 'underline' : ''}`} onClick={() => setSelectedTab('Application Process & Requirements')}>Application Process & Requirements</button>
                        <button className={`EduBack ${selectedTab === 'Tuition' ? 'underline' : ''}`} onClick={() => setSelectedTab('Tuition')}>Tuition</button>
                        <button className={`MyColleges ${selectedTab === 'Reviews' ? 'underline' : ''}`} onClick={() => setSelectedTab('Reviews')}>Reviews</button>
                    </div>
                    {renderComponent()}
                </div>
            </div>
        </div>
    );
};

export default CollegeView;