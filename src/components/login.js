import React from 'react';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from './navbar';
import { ErrorDisplay } from './error';
import logo from '../images/logo-black.jpg';
import alert from '../images/alert.png';

function Login() {
    const url = 'http://127.0.0.1:5000/user/login';
    
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
    };

    const handleChangePassword = (e) => {
        setError("");
        setPassword(e.target.value);
    };

    const loginInButtonHandler = (e) => {
        e.preventDefault();
        
        const headers = new Headers();
        headers.set('content-type', 'application/json');
        fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        }).then((response) => {
            if (response.ok) {
                setError("");
                return response.json();
            }
            return response.text().then((text) => { throw new Error(text); });
        }).then((data) => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('id', data.id);
            localStorage.setItem('username', data.name);
            navigate("/profile");
        }).catch((errors) => {
            let error = errors.message
            setError(error);
        });
    }

    return (
        <div className="back">
            { Navbar(logo, main, login, register) };

            <div className="container">
                <div className="form" id="login-form">
                    <h2 data-testid="login-form">Log In</h2>
                    { ErrorDisplay(error, alert)}
                    <input type="text" id="username" onChange={handleChangeUsername} placeholder="Username" required=""/>
                    <input type="password" id="password" onChange={handleChangePassword} placeholder="Password" required=""/>
                    <button type="button" data-testid="handlelogin" className="operation-button" id="login-button" onClick={loginInButtonHandler}>Log In
                    </button>
                </div>

                <div className="sub-container">
                    <div className="img">
                        <div className="img__text">
                            <h2>New here?</h2>
                            <p>Sign up and discover great amount of new opportunities!</p>
                        </div>
                        <div>
                            <button className="button" data-testid="change-sign-button" id="change-form-button" onClick={register}>Sign Up</button>
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

export default Login;