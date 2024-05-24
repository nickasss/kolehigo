import React from 'react';
import { Link } from 'react-router-dom';
import './EducationalBackground.css'; // Ensure this CSS file includes the updated styles
import '../../../../App.css';
import SideBar from '../../../../Components/Dashboard/VerticalContainer';
import ProfileName from '../../../../Components/Dashboard/ProfileName';
import Education from '../EducationalBackground/Education';



// Assuming you have icons if needed or other imports

const EducationalBackground = () => {
    return (
        <div className="Grid8">
            <div className="VerticalContainer">
                <SideBar />
            </div>
            <div className="HorizontalContainer">
                <ProfileName />
                <div className="MiniTabs">
                        <Link to={'/Dashboard'}><button className="ApplicantInfo">Applicant's Information</button></Link>
                        <Link to={'/LogInCredentials'}><button className="LogCred">Log In Credentials</button></Link>
                        <Link to={'/EducationalBackground'}><button className="EduBack">Educational Background</button></Link>
                        <Link to={'/MyColleges'}><button className="MyColleges">My Colleges</button></Link>
                        <button classname="InterSchol">Interested Scholarships</button>
                        <Link to={'/DocumentsUploaded'}><button classname="DocUplo">Documents Uploaded</button></Link>
                </div>
                <div className="ProfilePrompt">
                    <h1>Educational Background</h1>
                    <p>A form of your past and current educational records</p>
                </div>
            </div>
            <div className="HorizontalContainerBOTTOM">
                <Education/>
            </div>
        </div>
    );
};

export default EducationalBackground;