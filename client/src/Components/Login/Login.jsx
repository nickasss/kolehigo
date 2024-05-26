import React, { useEffect, useState } from 'react';
import './Login.scss';
import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

//icons and logos
import { MdMarkEmailRead } from "react-icons/md";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight, AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import WhiteLogo from '../../LoginAssets/whitelogo.png';
import Boy from '../../LoginAssets/Boy.png';

const Login = () => {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const navigateTo = useNavigate();
    const [loginStatus, setLoginStatus] = useState('');
    const [statusHolder, setStatusHolder] = useState('message');
    const [aboveFooterText, setAboveFooterText] = useState('Discover your ideal academic destination: Your definitive roadmap to unlocking the perfect college fit awaits.');
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const footerTexts = [
        "Seamlessly send all necessary documents, ensuring a smooth and hassle-free submission process.",
        "Navigate scholarship maze effortlessly with our app. Explore and apply for tailored financial aid seamlessly.",
        "Discover your ideal academic destination: Your definitive roadmap to unlocking the perfect college fit awaits."
    ];

    const [currentPageIndex, setCurrentPageIndex] = useState(0);

    const loginUser = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:3002/login', {
            LoginEmail: loginEmail,
            LoginPassword: loginPassword
        }).then((response) => {
            if (response.data.message || loginEmail === '' || loginPassword === '') {
                navigateTo('/');
                setLoginStatus('Credentials Do Not Exist!');
            } else {
                console.log("response", response.data)
                const { id } = response.data
                localStorage.setItem('userId', id)
                navigateTo('/Dashboard');
            }
        });
    };

    useEffect(() => {
        if (loginStatus !== '') {
            setStatusHolder('showMessage');
            setTimeout(() => {
                setStatusHolder('message');
            }, 4000);
        }
    }, [loginStatus]);

    const onSubmit = () => {
        setLoginEmail('');
        setLoginPassword('');
    };

    const changeAboveFooterText = (direction) => {
        if (direction === 'previous') {
            setCurrentTextIndex((prevIndex) => (prevIndex - 1 + footerTexts.length) % footerTexts.length);
            setCurrentPageIndex((prevIndex) => (prevIndex - 1 + footerTexts.length) % footerTexts.length);
        } else {
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % footerTexts.length);
            setCurrentPageIndex((prevIndex) => (prevIndex + 1) % footerTexts.length);
        }
        setAboveFooterText(footerTexts[currentTextIndex]);
    };


    const renderPageIndicators = () => {
        return footerTexts.map((text, index) => (
            <span key={index} className={`dot ${currentTextIndex === index ? 'active' : ''}`} />
        ));
    };

    return (
        <div className='loginPage flex'>
            <div className='container flex'>
                <div className='backgroundDiv'>
                    <img src={Boy} alt="Background Image" className="centered-image" />
                    <img src={WhiteLogo} alt="Background Image" className="logo" />
                    <p className="above-footer-headtext">Welcome to KolehiGO!</p>
                    <p className="above-footer-text">{aboveFooterText}</p>
                    <div className="footerDiv flex">
                        <span className="text">Don't have an account?</span>
                        <Link to={'/register'}>
                            <button className='btn'>Sign Up </button>
                        </Link>
                    </div>
                    <div className="btn-container">
                        <button className={`btn change-text-btn prev-btn ${currentPageIndex === 0 ? 'disabled' : ''}`} onClick={() => changeAboveFooterText('previous')}>
                            <AiOutlineArrowLeft className="icon" />
                        </button>
                        <button className={`btn change-text-btn next-btn ${currentPageIndex === footerTexts.length - 1 ? 'disabled' : ''}`} onClick={() => changeAboveFooterText('next')}>
                            <AiOutlineArrowRight className="icon" />
                        </button>
                        <div className="indicator-container">
                            {renderPageIndicators()}
                        </div>
                    </div>
                </div>
                <div className="formDiv loginFormDiv flex">
                    <div className='headerDiv'>
                        <h3>Sign In</h3>
                    </div>
                    <form className='form grid' onSubmit={onSubmit}>
                        <span className={statusHolder}>{loginStatus}</span>
                        <div className="inputDiv">
                            <label htmlFor='email'>Email</label>
                            <div className="input flex">
                                <MdMarkEmailRead className='icon' />
                                <input type='email' id='email' placeholder='Enter Email'
                                    onChange={(event) => {
                                        setLoginEmail(event.target.value);
                                      }} />
                            </div>
                        </div>
                        <div className="inputDiv">
                            <label htmlFor='password'>P assword</label>
                            <div className="input flex">
                                <BsFillShieldLockFill className='icon' />
                                <input type='password' id='password' placeholder='Enter Password'
                                    onChange={(event) => {
                                        setLoginPassword(event.target.value);
                                    }} />
                            </div>
                        </div>
                        <button type='submit' className='btn flex' onClick={loginUser}>
                            <span>Login</span>
                            {/* <AiOutlineSwapRight className='icon' /> */}
                        </button>
                        <span className='forgotPassword'>
                            Forgot your password? <a href=''>Click Here!</a>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;