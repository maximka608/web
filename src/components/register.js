import React from 'react';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from './navbar';
import { ErrorDisplay } from './error';
import logo from '../images/logo-black.jpg';
import alert from '../images/alert.png';

function Register() {
    const url = 'http://127.0.0.1:5000/user';
    
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const register = () => {
        navigate("/register");
    }
    const login = () => {
        navigate("/login");
    }
    const main = () => {
        navigate("/")
    }

    const handleChangeUsername = (e) => {
        setError("");
        setUsername(e.target.value);
    }

    const handleChangeEmail = (e) => {
        setError("");
        setEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
        setError("");
        setPassword(e.target.value);
    }

    const handleConfirmPassword = (e) => {
        setError("");
        setConfirmPassword(e.target.value);
    }

    const signUpButtonHandler = (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            const pass = 'Passwords are not the same';
            setError(pass);
            return;
        }
        
        const headers = new Headers();
        headers.set('content-type', 'application/json');
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                name: username,
                email: email,
                password: password,
            }),
            headers,
        }).then(async (response) => {
            if (response.ok) {
                setError("");
                return response.json();
            }
            const text = await response.text();
            throw new Error(text);
        }).then((data) => {
            // localStorage.setItem('token', data.token);
            // localStorage.setItem('id', data.id);
            // localStorage.setItem('username', data.name);
            // navigate("/profile");
        }).catch((errors) => {
            let error = errors.message
            setError(error);
        });
    }

    return (
        <div className="back">
            { Navbar(logo, main, login, register) };
            <div className="container">
                <div className="form" data-testid="register-form" id="login-form">
                    <h2>Create Account</h2>
                    { ErrorDisplay(error, alert)}
                    <input type="text" id="username" onChange={handleChangeUsername} placeholder="Username" required=""/>
                    <input type="email" id="email" onChange={handleChangeEmail} placeholder="Email" required=""/>
                    <input type="password" id="password" onChange={handleChangePassword} placeholder="Password" required=""/>
                    <input type="password" id="confirm-password" onChange={handleConfirmPassword} placeholder="Confirm password" required=""/>
                    <button type="button" data-testid="handleregister" className="operation-button" id="login-button" onClick={signUpButtonHandler}>Sign Up
                    </button>
                </div>

                <div className="sub-container">
                    <div className="img">
                        <div className="img__text">
                            <h2>Wellcome Back!</h2>
                            <p>To stay connected with us please enter your personal information.</p>
                        </div>
                        <div>
                            <button className="button" id="change-form-button" onClick={login}>Log In</button>
                        </div>
                    </div>
                </div>
            </div>
        <style>{"body { background-color: #ab8eea; }"}</style>
        <footer>
            <ul>
                <li><a href="/">About</a></li>
                <li><a href="/login">Log In</a></li>
                <li><a href="/register">Sign Up</a></li>
            </ul>
            <p className="copyright">NoteMe © 2022</p>
        </footer>
    </div>
    );
}

export default Register;