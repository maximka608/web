import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from './navbar';
import logo from '../images/logo-black.jpg';
import picture from '../images/notelaptop.png'

function Main() {
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

    return (
    <div>
        { Navbar(logo, main, login, register) };
        
        <div className="main-content-section1">
            <div className="text">
                <h1>Your Notes. Organized. Effortless.</h1>
                <p>Takes notes anywhere.</p>
                <p>Go paperless.</p>
                <p>Feel organized without the effort.</p>
                <p>Find your productivity happy place.</p>
                <br></br>
                <br></br>
                <button id="navigation-join-button" onClick={register}>JOIN US</button>
            </div>
            <div><img src={picture} alt=""></img></div>
        </div>

        <div className="main-content-section3">
            <div className="text">
                <h1>Get to know NoteMe</h1>
                <p>From staying on top of your to dos to making your schedule work for you, 
                    NoteMe helps bring order to the chaos.</p>
                <p>Gives you everything you need to keep your life organized.</p>
            </div>
            <div><button data-testid="change-sign-button" id="navigation-started-button" onClick={register}>Get Started</button></div>
        </div>
        <footer>
            <ul>
                <li><a href="/">About</a></li>
                <li><a href="/login">Log In</a></li>
                <li><a href="/register">Sign Up</a></li>
            </ul>
            <p className="copyright">NoteMe © 2022</p>
        </footer>
    </div>
    )
}

export default Main;