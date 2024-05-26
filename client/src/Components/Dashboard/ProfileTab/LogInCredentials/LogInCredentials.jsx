import React from 'react'
import { Link } from 'react-router-dom'
import './LogInCredentials.css'
import '../../../../App.css'
import SideBar from '../../../../Components/Dashboard/VerticalContainer'

//icons for Dashboard

//icons for Profile
import Profile1 from '../../../../DashboardAssets/ProfileAssets/Profile_Icon.png'
//profile tab is default..//applicant information is default


const LogInCredentials = () => {
    return (
        <div>
           <div className='Grid1'>
                <div className='VerticalContainer'>
                    <SideBar/>
                 </div>
                <div className="HorizontalContainer">
                    <div className="NameDis">
                        <img src={Profile1} alt="Profile1"/>
                        <h1>John Patrick Orbina Gerona
                        <p>Freshman</p>
                        </h1>
                    </div>
                    <div className="MiniTabs">
                        <Link to={'/Dashboard'}><button className="ApplicantInfo">Applicant's Information</button></Link>
                        <Link to={'/LogInCredentials'}><button className="LogCred">Log In Credentials</button></Link>
                        <Link to={'/EducationalBackground'}><button className="EduBack">Educational Background</button></Link>
                        <Link to={'/MyColleges'}><button className="MyColleges">My Colleges</button></Link>
                        <button classname="InterSchol">Interested Scholarships</button>
                        <Link to={'/DocumentsUploaded'}><button classname="DocUplo">Documents Uploaded</button></Link>
                    </div>
                    <div className ="ProfilePrompt">
                        <h1>Log Information</h1>
                        <p>Update, strengthen, and reinforce your accounts security</p>
                    </div>
                    
                </div>
                <div class="HorizontalContainerBOTTOM">
                <form>
                        <div className="left">
                            <input type="text" id='CurrentPassword' placeholder='Current Password'  autoComplete="off" />
                            <input type="text" id='NewPassword' placeholder='New Password'  autoComplete="off"/>
                            <input type="text" id='RetypePassword' placeholder='Retype Password'  autoComplete="off" />
                            <button type="submit">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LogInCredentials