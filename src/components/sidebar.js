import React from 'react';

export function Sidebar(profileicon, username, logout) {
    return (
        <nav className="sidebar">    
            <header>
                <label htmlFor="check">
                    <i className='bx bx-chevron-right toggle' id="sidebar_btn"></i>
                </label>
                <div className="image-text">
                    <span className="image">
                        <img src={profileicon} alt=""></img>
                    </span>
                    <div className="text logo-text">
                        <div className="name">{username}</div>
                    </div>
                </div>
            </header>
            <br></br>
    
            <div className="menu">
                <a href="/home"><i className="bx bx-home-alt icon"></i><span>Home</span></a>
                <a href="/profile"><i className="bx bx-user-pin"></i><span>Profile</span></a>
                <a href="/mynotes"><i className="bx bx-note"></i><span>My Notes</span></a>
            </div>
    
            <div className="bottom-content">
                <div className="logout">
                    <i className='bx bx-log-out icon' ></i>
                    <span className="text nav-text" data-testid="logout" id="logout-button" onClick={logout}>Logout</span>
                </div>
            </div>
        </nav>
    );
}