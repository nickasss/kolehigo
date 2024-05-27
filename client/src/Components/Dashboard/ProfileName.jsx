import React, { useState, useEffect } from 'react';
import Profile1 from '../../DashboardAssets/ProfileAssets/Profile_Icon.png'
import EditIcon from '../../DashboardAssets/ProfileAssets/EditProfileIcon.png'
import axios from 'axios';

const ProfileName =  () => {
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [updatedName, setUpdatedName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() =>{
        getUserData();
    })

    const getUserData = () => {
        const userId = localStorage.getItem('userId');
        console.log("userId", userId)   
        axios.get(`http://localhost:3002/getUser/${userId}`)
        .then(response => {
            const userData = response.data;
            setFirstName(userData.firstname);
            setMiddleName(userData.middlename);
            setLastName(userData.lastname);
            setUpdatedName(`${userData.firstname} ${userData.middlename} ${userData.lastname}`);
            setErrorMessage('');
        })
        .catch(error => {
            // Handle errors
            setErrorMessage('Failed to fetch user data.');
            console.error('Error fetching user data:', error);
        });
    }

    return (
        <div className="NameDis">
        <img src={Profile1} alt="Profile1"/>
        <h1>{updatedName ? updatedName : 'Set Name'}
        <p>Freshman</p>
        </h1>
        </div>
    )
}

export default ProfileName