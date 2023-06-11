import React from 'react';
import './App.css';
import './style.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Main from './components/main';
import Login from './components/login';
import Register from './components/register';
import Home from './components/home';
import Profile from './components/profile';
import EditUser from './components/edituser';
import MyNotes from './components/mynotes';


function App() {
  return (
    <>
    <Router>
			<Routes>
      <Route index element={<Main />} />
        <Route exact path ='/login' element={<Login />} />
        <Route exact path ='/register' element={<Register />} />
        <Route exact path ='/home' element={<Home />} />
        <Route exact path ='/profile' element={<Profile />} />
        <Route exact path ='/edituser' element={<EditUser />} />
        <Route exact path ='/mynotes' element={<MyNotes />} />
  
			</Routes>
		</Router>
    </>
  );
}

export default App;