import React, { useState } from 'react';
import './Register.css';
import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import WhiteLogo from '../../LoginAssets/whitelogo.png';
import Boy from '../../LoginAssets/Boy.png';
import { MdMarkEmailRead } from "react-icons/md";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight, AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [firstname, setFirstName] = useState('');
    const [middlename, setMiddleName] = useState('');
    const [lastname, setLastName] = useState('');
    const [mobilenumber, setMobileNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    //validation
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isFirstNameValid, setIsFirstNameValid] = useState(true);
    const [isMiddleNameValid, setIsMiddleNameValid] = useState(true);
    const [isLastNameValid, setIsLastNameValid] = useState(true);
    const [isMobileNumberValid, setIsMobileNumberValid] = useState(true);
    const [isBirthdateValid, setIsBirthdateValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const navigateTo = useNavigate();

    const validateForm = () => email.trim() && password.trim() && birthdate && firstname.trim() && lastname.trim() && mobilenumber.trim() && document.getElementById('termsCheckbox').checked;

    const validatePassword = (password) => {
        // This regex will enforce at least 10 characters, one uppercase, one lowercase, one number, and one special character
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{10,}$/;
        return regex.test(password);
    };

    const handlePasswordChange = (event) => {
        const { value } = event.target;
        setPassword(value);
        setIsPasswordValid(validatePassword(value) || value === '');
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setIsEmailValid(true); // Reset validation state upon change
    };
    
    const [aboveFooterText, setAboveFooterText] = useState('Discover your ideal academic destination: Your definitive roadmap to unlocking the perfect college fit awaits.');
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const footerTexts = [
        "Seamlessly send all necessary documents, ensuring a smooth and hassle-free submission process.",
        "Navigate scholarship maze effortlessly with our app. Explore and apply for tailored financial aid seamlessly.",
        "Discover your ideal academic destination: Your definitive roadmap to unlocking the perfect college fit awaits."
    ];

    const changeAboveFooterText = (direction) => {
        setCurrentTextIndex(prevIndex => {
            const newIndex = direction === 'previous' ? (prevIndex - 1 + footerTexts.length) % footerTexts.length : (prevIndex + 1) % footerTexts.length;
            setAboveFooterText(footerTexts[newIndex]);
            return newIndex;
        });
    };

    const renderPageIndicators = () => footerTexts.map((text, index) => (
        <span key={index} className={`dot ${currentTextIndex === index ? 'active' : ''}`} />
    ));

    const createUser = (e) => {
        e.preventDefault();
    
        // Validations for each field
        const validEmail = email.trim() !== '';
        const validPassword = validatePassword(password);
        const validFirstName = firstname.trim() !== '';
        const validMiddleName = middlename.trim() !== '';
        const validLastName = lastname.trim() !== '';
        const validMobileNumber = mobilenumber.trim() !== '';
        const validBirthdate = birthdate.trim() !== '';
    
        // Set validation states
        setIsEmailValid(validEmail);
        setIsPasswordValid(validPassword);
        setIsFirstNameValid(validFirstName);
        setIsMiddleNameValid(validMiddleName)
        setIsLastNameValid(validLastName);
        setIsMobileNumberValid(validMobileNumber);
        setIsBirthdateValid(validBirthdate);
    
        // Check if all validations are true
        if (!validEmail || !validPassword || !validFirstName || !validLastName || !validMobileNumber || !validBirthdate) {
            setErrorMessage('Please fill in all required fields correctly.');
            return;
        }

        Axios.get(`http://localhost:3002/check-email?email=${email}`)
            .then(response => {
                console.log('emial', email)
                if (response.data.exists) {
                    setErrorMessage('Email already exists in the database.');
                } else {
                    Axios.post('http://localhost:3002/register', {
                        Email: email,
                        Password: password,
                        Birthdate: birthdate,
                        FirstName: firstname,
                        MiddleName: middlename,
                        LastName: lastname,
                        MobileNumber: mobilenumber,
                    }).then(() => navigateTo('/'));
                }
            })
            .catch(error => {
                console.error('Error checking email:', error);
                setErrorMessage('Failed to check email, please try again.');
            });
    };

    return (
        <div className='registerPage flex'>
            <div className='container flex'>
                <div className='backgroundDiv'>
                    <p className="above-footer-headtext">Welcome to KolehiGO!</p>
                    <p className="above-footer-text">{aboveFooterText}</p>
                    <img src={Boy} alt="Background Image" className="centered-image" />
                    <img src={WhiteLogo} alt="Background Image" className="logo" />
                    <div className="footerDiv flex">
                        <span className="text">Have an account?</span>
                        <Link to={'/'}>
                            <button className='btn'>Login</button>
                        </Link>
                    </div>
                    <div className="btn-container">
                        <button className={`btn change-text-btn prev-btn ${currentTextIndex === 0 ? 'disabled' : ''}`} onClick={() => changeAboveFooterText('previous')}>
                            <AiOutlineArrowLeft className="icon" />
                        </button>
                        <button className={`btn change-text-btn next-btn ${currentTextIndex === footerTexts.length - 1 ? 'disabled' : ''}`} onClick={() => changeAboveFooterText('next')}>
                            <AiOutlineArrowRight className="icon" />
                        </button>
                        <div className="indicator-container">
                            {renderPageIndicators()}
                        </div>
                    </div>
                </div>

                <div className='formDiv flex'>
                    <div className='headerDiv'>
                        <h3>Create Account</h3>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <form action="" className='form grid' onSubmit={createUser}>
                        <div className="inputDiv">
                            <label htmlFor='email'>Email</label>
                            <div className={`input flex ${!isEmailValid ? 'input-error' : ''}`}>
                                <MdMarkEmailRead className='icon' />
                                <input type='email' id='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} style={{ borderColor: isEmailValid ? '' : 'red' }} />
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor='firstName'>First Name</label>
                            <div className={`input flex ${!isFirstNameValid ? 'input-error' : ''}`}>
                                <input type='text' id='firstName' placeholder='Enter First Name' value={firstname} onChange={(e) => setFirstName(e.target.value)} style={{ borderColor: isFirstNameValid ? '' : 'red' }}/>
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor='middleName'>Middle Name</label>
                            <div className={`input flex ${!isMiddleNameValid ? 'input-error' : ''}`}>
                                <input type='text' id='middleName' placeholder='Enter Middle Name' value={middlename} onChange={(e) => setMiddleName(e.target.value)} style={{ borderColor: isMiddleNameValid ? '' : 'red' }}/>
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor='lastName'>Last Name</label>
                            <div className={`input flex ${!isLastNameValid ? 'input-error' : ''}`}>
                                <input type='text' id='lastName' placeholder='Enter Last Name' value={lastname} onChange={(e) => setLastName(e.target.value)} style={{ borderColor: isLastNameValid ? '' : 'red' }}/>
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor='password'>Password</label>
                            <div className={`input flex ${!isPasswordValid ? 'input-error' : ''}`}>
                                <BsFillShieldLockFill className='icon' />
                                <input type='password' id='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} style={{ borderColor: isPasswordValid ? '' : 'red' }}/>
                            </div>
                            <p className="password-requirements">
                            - minimum of 10 characters<br/>
                            - at least one special character<br/>
                            - at least one lowercase character<br/>
                            - at least one uppercase character<br/>
                            - at least one number
                            </p>
                        </div>


                        <div className="inputDiv">
                            <label htmlFor='birthdate'>Birthdate</label>
                            <div className={`input flex ${!isBirthdateValid ? 'input-error' : ''}`}>
                                <input type='date' id='birthdate' placeholder='Enter Birthdate' value={birthdate} onChange={(e) => setBirthdate(e.target.value)} style={{ borderColor: isBirthdateValid ? '' : 'red' }}/>
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor='mobilenumber'>Mobile Number</label>
                            <div className={`input flex ${!isMobileNumberValid ? 'input-error' : ''}`}>
                                <input type='tel' id='mobilenumber' placeholder='Enter Mobile Number' value={mobilenumber} onChange={(e) => setMobileNumber(e.target.value)} style={{ borderColor: isMobileNumberValid ? '' : 'red' }}/>
                            </div>
                        </div>

                        <div className="termsAndConditions">
                            <input type="checkbox" id="termsCheckbox" required />
                            <label htmlFor="termsCheckbox" className="termsLabel">By accessing or using our platform, you agree to be bound by these Terms of Use and all applicable laws and regulations.</label>
                        </div>

                        <button type='submit' className='btn flex'>
                            <span>Sign Up</span>
                            {/* <AiOutlineSwapRight className='icon' /> */}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;