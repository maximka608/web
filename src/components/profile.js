import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from './sidebar';
import profileicon from '../images/profile-icon.png';

function Profile() {
    const url = 'http://127.0.0.1:5000/user/';

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [popupClass, setPopUpClass] = useState('pop-up-box');

    var today = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var date = new Intl.DateTimeFormat('en-US', options).format(today);

    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('username');
        navigate("/login");
    }

    const editButtonHandler = () => {
        navigate("/edituser");
    }

    const deleteButtonHandler = (e) => {
        e.preventDefault();
        setPopUpClass('pop-up-box show');
    }

    const closeIconHandler = (e) => {
        e.preventDefault();
        setPopUpClass('pop-up-box');
    }

    const deleteUser = () => {
        fetch(`${url}${window.localStorage.getItem('id')}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        }).then(() => {
            localStorage.removeItem('id');
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            navigate('/login');
        });
    }

    const deleteAccountHandler = (e) => {
        e.preventDefault();
    
        if (popupClass === 'pop-up-box show') {
            deleteUser();
            setPopUpClass('pop-up-box');
            navigate('/register');
        }
    }

    useEffect(() => {
        const getUser = () => {
            fetch(`${url}${window.localStorage.getItem('id')}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            }).then(async (response) => {
                if (response.ok) {
                    setError('');
                    return response.json();
                }
                // return response.text().then((text) => { throw new Error(text); });
            }).then((data) => {
                // setUsername(data.name);
                // setEmail(data.email);
                // window.localStorage.setItem('username', data.name);
            });
          }
        if (error === ''){
            getUser();
        }
    }, [username, email, error]);

    return (
        <div>
        <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet'></link>
        <input type="checkbox" id="check"></input>

        <div className={popupClass}>
            <div className="pop-up">
                <div className="pop-up-content">
                    <header>
                        <p>Delete Account</p>
                        <i className='bx bx-plus' data-testid="close-icon" onClick={closeIconHandler}></i>
                    </header>
                    <form action="#">
                        <p>Are you shure you want to delete your account?
                        You will not be able to restore it.</p>
                        <br></br>
                        <button data-testid="handledelete" id="delete-account" onClick={deleteAccountHandler}>Yes, I`m sure</button>
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
                                <span id="username">{username}</span>
                             </div>
                             <div className="data">
                                <h4>Email</h4>
                                <span id="email">{email}</span>
                             </div>
                        </div>
                        <button data-testid="delete-button" onClick={deleteButtonHandler}><i className='bx bx-trash'></i>Delete</button>
                        <button id="edit-button" onClick={editButtonHandler}><i className='bx bx-pencil' ></i>Edit</button>
                    </div>
                </div>
            </div>
        </div>
        
        { Sidebar(profileicon, username, logout) };
        <div className="content-image-profile"></div>
        <div className="logo-header" id="logo-header">
            <span className="greetings">My Profile</span>
            <span className="calendar-day">{date.toUpperCase()}</span>
        </div>
    </div>
    );
}

export default Profile;