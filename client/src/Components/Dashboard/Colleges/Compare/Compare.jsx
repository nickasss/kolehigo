import React, { useState } from 'react';
import './Compare.css';
import college1 from '../../../../DashboardAssets/CollegesAssets/college1.png';
import kolehigo from '../../../../DashboardAssets/CollegesAssets/Kolehigo.png';
import SearchBar from '../../Colleges/SearchBar.jsx';
import SideBar from "../../../Dashboard/VerticalContainer.jsx";

const Compare = () => {
    // Managing state for both Left and Right divs
    const [info, setInfo] = useState({
        left: "",
        right: ""
    });

    const information = {
        "Type of Institution": {
            left: "Private University (Central Philippine University)",
            right: "Public University (University of San Agustin)"
        },
        "Programs Offered": {
            left: "Engineering, Health Sciences, Business, etc. (CPU)",
            right: "Liberal Arts, Sciences, Education, etc. (USA)"
        },
        "Location": {
            left: "Iloilo City, Philippines (CPU)",
            right: "Iloilo City, Philippines (USA)"
        },
        "Admission Requirements": {
            left: "High school diploma, entrance exam, interview (CPU)",
            right: "High school diploma, entrance exam (USA)"
        }
    };

    const handleClick = (key) => {
        // Update the state for both the left and right divs
        setInfo({
            left: information[key].left,
            right: information[key].right
        });
    };

    return (
        <div className='Grid10'>
            <div className='VerticalContainer'>
                <SideBar />
            </div>
            <div className='HorizontalContainer'>
                <img src={kolehigo} alt='kolehigologo' className='kolehigo'/>
                <SearchBar />
                <img src={college1} alt="college1" className='college1'/>
            </div>
            <div className='HorizontalContainer1'>
                <h6 className="Title">Comparison</h6>
                <div className="Uni1">
                    <h6 className="School1">Central Philippine University</h6>
                </div>
                <div className="Uni2">
                    <h6 className="School2">University of San Agustin</h6>
                </div>
            </div>
            <div className='fill'></div>
            <div className="HorizontalContainer2">
                <div className="ButtonContainer">
                    {Object.keys(information).map(key => (
                        <button key={key} onClick={() => handleClick(key)}>
                            {key}
                        </button>
                    ))}
                </div>
                <div className='Left'>
                    {info.left && <p>{info.left}</p>}
                </div>
                <div className='Right'>
                    {info.right && <p>{info.right}</p>}
                </div>
            </div>
        </div>
    );
};

export default Compare;
