import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from './sidebar';
import profileicon from '../images/profile-icon.png';

function MyNotes() { 
    const url = 'http://127.0.0.1:5000';

    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [popup, setPopUp] = useState('pop-up-box');
    const [popupEdit, setPopUpEdit] = useState('pop-up-box-edit');
    const [popupDelete, setPopUpDelete] = useState('pop-up-box-delete');
    const [popupAddEditor, setPopUpAddEditor] = useState('pop-up-box-addEditor');
    const [popupShowEditor, setPopUpShowEditor] = useState('pop-up-box-showEditor');
    const [addUser, setAddUser] = useState('');
    const [editors, setEditors] = useState();
    const [error, setError] = useState('');

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

    const addNoteWindow = () => {
        setPopUp("pop-up-box show");
    }

    const removeAddNoteWindow = () => {
        setPopUp("pop-up-box");
    }

    const editNoteWindow = (event, note) => {
        window.localStorage.setItem('noteid', note.id);
        setPopUpEdit("pop-up-box-edit show");
    }

    const removeEditNoteWindow = () => {
        window.localStorage.removeItem('noteid');
        setPopUpEdit("pop-up-box-edit");
    }

    const deleteNoteWindow = (event, note) => {
        window.localStorage.setItem('noteid', note.id);
        setPopUpDelete("pop-up-box-delete show");
    }

    const removeDeleteNoteWindow = () => {
        window.localStorage.removeItem('noteid');
        setPopUpDelete("pop-up-box-delete");
    }

    const addEditorsWindow = (event, note) => {
        window.localStorage.setItem('noteid', note.id);
        setPopUpAddEditor("pop-up-box-addEditor show");
    }

    const removeAddEditorsWindow = () => {
        window.localStorage.removeItem('noteid');
        setPopUpAddEditor("pop-up-box-addEditor");
    }

    const getEditors = () => {
        fetch(`${url}/note_editors/${window.localStorage.getItem('noteid')}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        }).then(async (response) => {
            if (response.ok) {
                return response.json();
            }
            return response.text().then((text) => { throw new Error(text); });
        }).then((data) => {
            let editorsItems = data['editors'].map((editor) => 
                <li><i class='bx bxs-edit' ></i>{editor}</li>
            )
            setEditors(editorsItems);
        });
    }

    const showEditorsWindow = (event, note) => {
        window.localStorage.setItem('noteid', note.id);
        setPopUpShowEditor("pop-up-box-showEditor show");
        getEditors();
    }

    const AddUser = (e) => {
        setAddUser(e.target.value);
    }

    const addEditor = (e) => {
        e.preventDefault();

        fetch(`${url}/note_user`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: addUser,
                noteId: window.localStorage.getItem('noteid'),
            }),
        }).then((response) => {
            if (response.ok) {
                setError("");
                return response.json();
            }
            return response.text().then((text) => { throw new Error(text); });
        }).then((data) => {
            setAddUser();
            removeAddEditorsWindow();
        }).catch((errors) => {
            let error = errors.message
            setError(error);
        });
    }

    const displayNotes = (notes) => {
        if (notes.length === 0){
            return ;
        } else {
            let notesItems = notes.map((note) =>
            <li className="note">
                <div className="details">
                    <p>{note['name']}</p>
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
                            <li onClick={(event) => editNoteWindow(event, note)}><i className='bx bx-pencil'></i>Edit</li>
                            <li onClick={(event) => addEditorsWindow(event, note)}><i className='bx bxs-user-plus'></i>Add editor</li>
                            <li onClick={(event) => showEditorsWindow(event, note)}><i className='bx bxs-group'></i>Show editors</li>
                            <li onClick={(event) => deleteNoteWindow(event, note)}><i className='bx bx-trash' ></i>Delete</li>
                        </ul>
                    </div>
                </div>
            </li>
            );
            return notesItems;
        }
    }

    const addTitle = (e) => {
        setTitle(e.target.value);
    }

    const addDescription = (e) => {
        setDescription(e.target.value);
    }

    const addNote = () => {
        fetch(`${url}/note`, {
            method: 'POST',
            body: JSON.stringify({
                name: title,
                text: description,
                idOwner: localStorage.getItem('id'),
                idTag: 1,
            }),
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        }).then(async (response) => {
            if (response.ok) {
                setError("");
                return response.json();
            }
            const text = await response.text();
            throw new Error(text);
        }).then((data) => {
            setNotes(Object.values(data));
            console.log('b')
            console.log(notes);

        }).catch((errors) => {
            let error = errors.message
            setError(error);
        });
        setPopUp("pop-up-box");
    }

    const updateNote = (e) => {
        e.preventDefault();

        fetch(`${url}/note/${window.localStorage.getItem('noteid')}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: title,
                text: description,
            }),
        }).then(async (response) => {
            if (response.ok) {
                setError("");
                return response.json();
            }
            return response.text().then((text) => { throw new Error(text); });
        }).then(() => {
            setAddUser();
            removeEditNoteWindow();
            window.location.replace("/mynotes");
        }).catch((errors) => {
            let error = errors.message
            setError(error);
        });
    }

    const deleteNote = (e) => {
        e.preventDefault();

        fetch(`${url}/note/${window.localStorage.getItem('noteid')}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}`,
            },
        }).then(() => {
            removeDeleteNoteWindow();
            window.location.replace("/mynotes");
        });
    }

    useEffect(() => {
        const getNotes = () => {
            fetch(`${url}/note_service/${window.localStorage.getItem('id')}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            }).then(async (response) => {
                if (response.ok) {
                    return response.json();
                }
                return response.text().then((text) => { throw new Error(text); });
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

            <div className={popup}>
                <div className="pop-up">
                    <div className="pop-up-content">
                        <header>
                        <p>Add a new note</p>
                        <i className='bx bx-plus' onClick={removeAddNoteWindow}></i>
                        </header>
                        <form action="#">
                            <div className="row title">
                                <label>Title</label>
                                <input  data-testid="title" type="text" spellCheck="false" onChange={addTitle}></input>
                            </div>
                            <div className="row description">
                                <label>Description</label>
                                <textarea data-testid="description"  spellCheck="false" onChange={addDescription}></textarea>
                            </div>
                            <button onClick={addNote}>Add Note</button>
                        </form>
                    </div>
                </div>
            </div>

            {/* <div className={popupEdit}>
                <div className="pop-up-edit">
                    <div className="pop-up-content">
                        <header>
                            <p>Edit note</p>
                            <i onClick={removeEditNoteWindow} className='bx bx-plus'></i>
                        </header>
                        <form action="#">
                            <div className="row title">
                                <label>Title</label>
                                <input type="text" spellCheck="false" onChange={addTitle}></input>
                            </div>
                            <div className="row description">
                                <label>Description</label>
                                <textarea spellCheck="false" onChange={addDescription}></textarea>
                            </div>
                            <button onClick={updateNote}>Save</button>
                        </form>
                    </div>
                </div>
            </div>
             */}
        

            

            
            

            <div className="content">
                <p>NOTES</p>
                <div className="search-box">
                    <i className='bx bx-search icon'></i>
                    <input type="text"></input>
                </div>
                <br></br>
                <ul className="wrapper">
                    <li className="add-box-note">
                        <div className="plus-icon" onClick={addNoteWindow}>
                            <i className='bx bx-plus'></i>
                        </div>
                        <p>Add new note</p>
                    </li>
                {displayNotes(notes)}
                </ul>
            </div>
            
            { Sidebar(profileicon, window.localStorage.getItem('username'), logout) };
            <div className="content-image-mynotes"></div>
            <div className="logo-header" id="logo-header">
                <span className="greetings">My Notes</span>
                <span className="calendar-day">{date.toUpperCase()}</span>
            </div>
        </div>
    );
}

export default MyNotes;