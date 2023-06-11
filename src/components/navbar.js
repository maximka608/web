import React from 'react';

export function Navbar(logo, main, login, register) {
    return (
        <nav>
        <ul className="nav">
            <li className="nav-item">
                <img src={logo} alt="" width="130" height="30"></img>
            </li>
            <li className="nav-item">
                <button className="nav-btn" data-testid="change-main-button" id="navigation-about-button" onClick={main}>About</button>
            </li>
            <li className="nav-item">
                <button className="nav-btn" data-testid="change-login-button" id="navigation-log-button" onClick={login}>Log In</button>
            </li>
            <li className="nav-item">
                <button className="nav-btn" data-testid="change-signup-button" id="navigation-register-button" onClick={register}>Sign Up</button>
            </li>
        </ul>
    </nav>
    );
}