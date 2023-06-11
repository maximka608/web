
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from './sidebar';
import { ErrorDisplay } from './error';
import profileicon from '../images/profile-icon.png';
import alert from '../images/alert.png';

function EditUser() {
    const url = 'http://127.0.0.1:5000/user/';

    const name = window.localStorage.getItem('username');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [popupClass, setPopUpClass] = useState('pop-up-box');

    let navigate = useNavigate();

    const handleChangeUsername = (e) => {
        setError("");
        if (e.target.value !== '' && e.target.value !== null) {
            setUsername(e.target.value);
        }
    }

    const handleChangeEmail = (e) => {
        setError("");
        if (e.target.value !== '' && e.target.value !== null) {
            setEmail(e.target.value);
        }
    }

    const handleChangePassword = (e) => {
        setError("");
        if (e.target.value !== '' && e.target.value !== null) {
            setPassword(e.target.value);
        }
    }

    const handleChangeConfirmPassword = (e) => {
        setError("");
        if (e.target.value !== '' && e.target.value !== null) {
            setConfirmPassword(e.target.value);
        }
    }

    const closeIconHandler = (e) => {
        e.preventDefault();
        setPopUpClass('pop-up-box');
    }

    const discardButtonHandler = (e) => {
        e.preventDefault();
        setPopUpClass('pop-up-box show');
    }

    const discardChangesHandler = (e) => {
        e.preventDefault();
        
        if (popupClass === 'pop-up-box show') {
            setPopUpClass('pop-up-box');
            navigate('/profile');
        }
    }

    const logout = () => {
        localStorage.removeItem('id');
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate("/login");
    }

    const saveChangesHandler = (e) => {
        e.preventDefault();
    
        if (password !== '' && confirmPassword !== '') {
            if (password !== confirmPassword) {
                const error = 'Passwords are not the same';
                setError(error);
                return;
            }
        }
    
        fetch(`${url}${window.localStorage.getItem('id')}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: username,
                email: email,
                password: password,
            }),
        }).then(async (response) => {
            if (response.ok) {
                setError("");
                return response.json();
            }
            return response.text().then((text) => { throw new Error(text); });
        }).then(() => {
            navigate('/profile');
        }).catch((errors) => {
            let error = errors.message
            setError(error);
        });
    }

    return (
        <div>
            <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet'></link>
            <input type="checkbox" id="check"></input>

            <div className={popupClass}>
                <div className="pop-up">
                    <div className="pop-up-content">
                        <header>
                            <p>Discard</p>
                            <i data-testid="close-icon" className='bx bx-plus' onClick={closeIconHandler}></i>
                        </header>
                        <form action="#">
                            <p>Are you shure you want to discard changes?
                            You will not be able to restore it.</p>
                            <br></br>
                            <button data-testid="discard-changes" id="discard-changes" onClick={discardChangesHandler}>Yes, I`m sure</button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="content">
                <div className="profile">
                    <div className="profile-left">
                        <i className='bx bxs-user-circle' ></i>
                    </div>
                    <div className="profile-right">
                        <div className="profile-info">
                            <h3>Personal Information</h3>
                            <div className="info-data">
                                <div className="data">
                                    <h4>Username</h4>
                                    <input type="text" onChange={handleChangeUsername} placeholder="username" id="username"></input>
                                </div>
                                <div className="data">
                                    <h4>Email</h4>
                                    <input type="text" onChange={handleChangeEmail} placeholder="email" id="email"></input>
                                </div>
                            </div>

                            <h3>Password Credentials</h3>
                            <div className="info-data">
                                <div className="data">
                                    <h4>Password</h4>
                                    <input type="password" onChange={handleChangePassword} placeholder="password" id="password"></input>
                                </div>
                                <div className="data">
                                    <h4>Confirm password</h4>
                                    <input type="password" onChange={handleChangeConfirmPassword} placeholder="confirm password" id="confirm-password"></input>
                                </div>
                            </div>

                            { ErrorDisplay(error, alert)}
                            <br></br>
                            <button data-testid="discard-button" id="discard-button" onClick={discardButtonHandler}><i className='bx bx-x'></i>Discard</button>
                            <button data-testid="handlechange" id="save-button" onClick={saveChangesHandler}><i className='bx bx-check'></i>Save</button>
                        </div>
                    </div>
                </div>
            </div>

            { Sidebar(profileicon, name, logout) };
            <div className="content-image-profile"></div>
        </div>
    );
}

export default EditUser;
