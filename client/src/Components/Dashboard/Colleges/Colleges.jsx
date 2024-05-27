import React from 'react';
import { Link } from 'react-router-dom';
import './Colleges.css';
import '../../../App.css';
import SideBar from "../../../Components/Dashboard/VerticalContainer.jsx"


import college1 from '../../../DashboardAssets/CollegesAssets/college1.png';
import kolehigo from '../../../DashboardAssets/CollegesAssets/Kolehigo.png'
import CPU from '../../../DashboardAssets/CollegesAssets/CPU.png'

import SearchBar from '../Colleges/SearchBar.jsx';
import PromotedColleges from '../Colleges/PromotedColleges.jsx';
import CollegeList from '../Colleges/CollegeList.jsx';
const Colleges = () => {
    return (
        <div>
            <div className='Grid0'>
                <div className='VerticalContainer'>
                    <SideBar />
                 </div>
                 <div className='HorizontalContainer'>
                    <img src={kolehigo} alt='kolehigologo' className='kolehigo'/>
                    {<SearchBar />}
                    <img src={college1} alt="college1" className='college1'/>
                </div>
                <div className ='HorizontalContainer1'>
                    <h6>Promoted Colleges</h6>
                    {<PromotedColleges />}
                </div>
                <div className = "HorizontalContainer2"> 
                    {<CollegeList />}
                </div>
            </div>
        </div>
    );
};

export default Colleges;