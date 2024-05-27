import { Link } from 'react-router-dom'
import './Dashboard.css'
import '../../App.css'
import React, { useEffect, useState } from 'react';
import SideBar from "./VerticalContainer";
import ProfileName from "./ProfileName";
import axios from 'axios';
//icons for Dashboard

//icons for Profile
import Profile1 from '../../DashboardAssets/ProfileAssets/Profile_Icon.png'
import EditIcon from '../../DashboardAssets/ProfileAssets/EditProfileIcon.png'

//profile tab is default..//applicant information is default



const Dashboard = () => {
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [suffix, setSuffix] = useState('');
    const [address, setAddress] = useState('');
    const [updatedName, setUpdatedName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

        const userId = localStorage.getItem('userId');

    // useEffect(() =>{
    //     getUserData();
    // })

    // const getUserData = () => {
    //     const userId = localStorage.getItem('userId');
    //     axios.get(`/getUser/${userId}`)
    //     .then(response => {
    //         const userData = response.data;
    //         setFirstName(userData.firstName);
    //         setMiddleName(userData.middleName);
    //         setLastName(userData.lastName);
    //         setUpdatedName(``)
    //         setErrorMessage('');
    //     })
    //     .catch(error => {
    //         // Handle errors
    //         setErrorMessage('Failed to fetch user data.');
    //         console.error('Error fetching user data:', error);
    //     });
    // }

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleMiddleNameChange = (e) => {
        setMiddleName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleSuffixChange = (e) => {
        setSuffix(e.target.value);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        console.log('firstname', firstName)
    
        if (firstName && middleName && lastName && suffix && address) {
            axios.patch("http://localhost:3002/update/" + userId, {
                firstname: firstName, 
                middlename: middleName,
                lastname: lastName,
                suffix: suffix,
                address: address
            })
            .then(response => {
                const updatedUser = response.data;
                setUpdatedName(`${updatedUser.firstname} ${updatedUser.middlename} ${updatedUser.lastname} ${updatedUser.suffix}`);
                setFirstName(updatedUser.firstname);
                setMiddleName(updatedUser.middlename);
                setLastName(updatedUser.lastname);
                setSuffix(updatedUser.suffix);
                setAddress(updatedUser.address);
                setErrorMessage('');
            })
            .catch(error => {
                setErrorMessage('Failed to update user.');
                console.error('Error updating user:', error);
            });
        } else {
            setErrorMessage('Please complete all fields.');
        }
    };
    
    return (
        <div>
            <div className='Grid'>
                <div className='VerticalContainer'>
                    <SideBar/>
                 </div>
                <div className="HorizontalContainer">
                    <ProfileName updatedName={updatedName}/>
                    <div className="MiniTabs">
                        <Link to={'/Dashboard'}><button className="ApplicantInfo">Applicant's Information</button></Link>
                        <Link to={'/LogInCredentials'}><button className="LogCred">Log In Credentials</button></Link>
                        <Link to={'/EducationalBackground'}><button className="EduBack">Educational Background</button></Link>
                        <Link to={'/MyColleges'}><button className="MyColleges">My Colleges</button></Link>
                        <button classname="InterSchol">Interested Scholarships</button>
                        <Link to={'/DocumentsUploaded'}><button classname="DocUplo">Documents Uploaded</button></Link>
                    </div>
                    <div className ="ProfilePrompt">
                        <h1>Profile</h1>
                        <p>Update your photo and personal details here</p>
                    </div>
                </div>
                <div className="HorizontalContainerBOTTOM">
                    <form  onSubmit={handleSubmit}>
                        <div ClassName="left">
                            <input type="text" id='FirstName' placeholder='First Name'  autocomplete="off" value={firstName} onChange={handleFirstNameChange}/>
                            <input type="text" id='MiddleName' placeholder='Middle Name'  autocomplete="off" value={middleName} onChange={handleMiddleNameChange}/>
                            <input type="text" id='LastName' placeholder='Last Name'  autocomplete="off" value={lastName}  onChange={handleLastNameChange}/>
                            <input type="text" id='Suffix' placeholder='Suffix'  autocomplete="off" value={suffix} onChange={handleSuffixChange}/> 
                        </div>
                        <div ClassName="right">
                            <label htmlFor="DateofBirth" id="DateofBirthLabel">Birthdate:</label>
                            <input type="date" id='DateofBirth' placeholder='Date of Birth'  autocomplete="off"/>
                            <input type="text" id='Address' placeholder='Address'  autocomplete="off" onChange={handleAddressChange}/>
                            <button type="submit">Update</button>
                            <p className="error-message">{errorMessage}</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Dashboard