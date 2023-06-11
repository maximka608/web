import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from './sidebar';
import profileicon from '../images/profile-icon.png';

function Home() {
    const url = 'http://127.0.0.1:5000'

    const [error, setError] = useState('');
    const [notes, setNotes] = useState([]);

    var today = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var date = new Intl.DateTimeFormat('en-US', options).format(today);

    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('username');
        localStorage.clear();
        navigate("/login");
    }

    const displayNotes = (notes) => {
        if (notes.length === 0){
            return <p>No note was added</p>
        } else if (notes.length > 1) {
            const notesItems = notes.map((note) =>
            <li className="note">
                <div className="details">
                    <p>{note.name}</p>
                    <span>{note.text}</span>
                </div>
                <div className="tags">
                    <button className="tag">#{note.idTag}</button>
                </div>
                <div className="bottom-content">
                    <span>April 3, 2022</span>
                    <div className="settings">
                        <i className='bx bx-dots-horizontal-rounded'></i>
                        <ul className="note-menu">
                            <li><i className='bx bx-pencil'></i>Edit</li>
                            <li><i className='bx bxs-user-plus'></i>Add editor</li>
                            <li><i className='bx bxs-group'></i>Show editors</li>
                            <li><i className='bx bx-trash' ></i>Delete</li>
                        </ul>
                    </div>
                </div>
            </li>
            );
            return notesItems;
        } else {
            return (
                <li className="note">
                <div className="details">
                    <p>{notes.name}</p>
                    <span>{notes.text}</span>
                </div>
                <div className="tags">
                    <button className="tag">#{notes.idTag}</button>
                </div>
                <div className="bottom-content">
                    <span>April 3, 2022</span>
                    <div className="settings">
                        <i className='bx bx-dots-horizontal-rounded'></i>
                        <ul className="note-menu">
                            <li><i className='bx bx-pencil'></i>Edit</li>
                            <li><i className='bx bxs-user-plus'></i>Add editor</li>
                            <li><i className='bx bxs-group'></i>Show editors</li>
                            <li><i className='bx bx-trash' ></i>Delete</li>
                        </ul>
                    </div>
                </div>
            </li>
            );
        }
    }

    const getNote = (e) => {
        fetch(`${url}/note/${e.target.value}`, {
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
            console.log(data);
            setNotes(data);
        });
    }

    useEffect(() => {
        const getNotes = () => {
            fetch(`${url}/note_service`, {
                method: 'GET',
            }).then(async (response) => {
                if (response.ok) {
                    return response.json();
                }     
            }).then((data) => {
                setNotes(data);
            });
          }
        if (error === ''){
            getNotes();
        }
    }, [error]);

    return (
        <div>
            <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet'></link>
            <input type="checkbox" id="check"></input>

            <div className="content">
                <p>NOTES</p>
                <div className="search-box">
                    <i className='bx bx-search icon'></i>
                    <input type="text" data-testid="findnote" onChange={getNote}></input>
                </div>
                <br></br>
                <ul className="wrapper">
                    {displayNotes(notes)}        
                </ul>
            </div>

            { Sidebar(profileicon, window.localStorage.getItem('username'), logout) };
            <div className="content-image-home"></div>
            <div className="logo-header" id="logo-header">
                <span className="greetings">Good Day, {window.localStorage.getItem('username')}!</span>
                <span className="calendar-day">{date.toUpperCase()}</span>
            </div>
        </div>
    );
 }

export default Home;