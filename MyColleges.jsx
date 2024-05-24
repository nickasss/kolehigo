import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import './MyColleges.css';
import '../../../../App.css';
import SideBar from '../../../../Components/Dashboard/VerticalContainer';
import ProfileName from '../../../../Components/Dashboard/ProfileName';
import { useColleges } from '../../../Dashboard/Colleges/CollegeContext.jsx';

const MyColleges = () => {
    const { myColleges } = useColleges();
    const [courses, setCourses] = useState({});
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [enrollmentModalVisible, setEnrollmentModalVisible] = useState(false);
    const [selectedCollege, setSelectedCollege] = useState('');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [applicationSubmitted, setApplicationSubmitted] = useState(false);

    

    const fetchCourses = (collegeName) => {
        const url = `http://localhost:3011/courses/${encodeURIComponent(collegeName)}`;
        setLoading(true);
        Axios.get(url)
            .then(response => {
                setCourses(prevCourses => ({
                    ...prevCourses,
                    [collegeName.toLowerCase()]: response.data
                }));
                setLoading(false);
                setModalVisible(true);
                setSelectedCollege(collegeName);
            })
            .catch(error => {
                console.error('Failed to fetch courses:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        if (applicationSubmitted) {
            // You can set a timeout to hide the message after a few seconds if needed
            setTimeout(() => {
                setApplicationSubmitted(false);
            }, 5000);
        }
    }, [applicationSubmitted]);


    const handleApply = (course) => {
        setSelectedCourse(course);
        setEnrollmentModalVisible(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Close all modals first
        closeModal();

        // Set a timeout to display the success message after a slight delay
        setTimeout(() => {
            setApplicationSubmitted(true);

            // Optionally reset the success message after a few seconds
            setTimeout(() => {
                setApplicationSubmitted(false);
            }, 5000);
        }, 300); // Adjust this delay based on how quickly your modal transitions are
    };

    const closeModal = () => {
        setModalVisible(false);
        setEnrollmentModalVisible(false);
    };

    return (
        <div className="Grid2">
            <div className="VerticalContainer">
                <SideBar />
            </div>
            <div className="HorizontalContainer">
                <ProfileName />
                <div className="MiniTabs">
                    <Link to='/Dashboard'><button className="ApplicantInfo">Applicant's Information</button></Link>
                    <Link to='/LogInCredentials'><button className="LogCred">Log In Credentials</button></Link>
                    <button className="EduBack">Educational Background</button>
                    <Link to='/MyColleges'><button className="MyColleges">My Colleges</button></Link>
                    <button className="InterSchol">Interested Scholarships</button>
                    <button className="DocUplo">Documents Uploaded</button>
                </div>
                <div className="ProfilePrompt">
                    <h1>My Colleges</h1>
                    <p>Tab of your chosen interested colleges to apply</p>
                </div>
            </div>
            <div className="HorizontalContainerBOTTOM">
                {myColleges.map((college) => (
                    <div key={college.id} className="mycollege-item">
                        <img src={college.logo} alt={college.name} className="mycollege-logo" />
                        <div className="mycollege-details">
                            
                            <h5>{college.name}</h5>
                            <p>{college.address}</p>
                            <button onClick={() => fetchCourses(college.name)} className="myview">
                                View Courses
                            </button>
                        </div>
                    </div>
                ))}
                {loading && <p>Loading...</p>}
            </div>
            {modalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>Courses at {selectedCollege.toUpperCase()}</h2>
                        {courses[selectedCollege.toLowerCase()] && courses[selectedCollege.toLowerCase()].map(course => (
                            <div key={course.id} className='display-course'>
                                <p>{course.course}
                                    <button onClick={() => handleApply(course)} className='apply-button'>Apply</button>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {applicationSubmitted && (
                <div className="success-message">
                    You have successfully submitted your application for {selectedCourse.course} at {selectedCollege}.
                </div>
            )}

            {enrollmentModalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>Apply for {selectedCourse.course}</h2>
                        <br></br>
                        <p>Enrollment process for {selectedCourse.course} at {selectedCollege}.</p>
                        <br></br>
                        <form onSubmit={handleSubmit} className='form'>
                            <li>Form 137 <span className="checkmark">&#10003;</span></li>
                            <li>Good Moral <span className="checkmark">&#10003;</span></li>
                            <li>2pcs. of 2x2 ID Picture <span className="checkmark">&#10003;</span></li>
                            <li>Birth Certificate <span className="checkmark">&#10003;</span></li>
                            
                            <br></br><br></br>
                            <button type="submit" className='submit-button'>Submit Application</button>
                        </form>
                    </div>
                </div>
            )}
            
        </div>
    );
};

export default MyColleges;
