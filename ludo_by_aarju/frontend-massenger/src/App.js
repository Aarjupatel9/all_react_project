import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";

import "bootstrap/dist/css/bootstrap.min.css";
import "./ChatsComp.css";
import "./mainstyle.css";

import { userDetailsTemplate } from "./templates/Templates";

import HomeContext from "./context/HomeContext";

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


import io from "socket.io-client";
import userService from "./services/user.service";


import NavBar from "./components/common/NavBar";
function App() {

  const [currentUser, setCurrentUser] = useState(userDetailsTemplate);
  const [players, setPlayers] = useState(userDetailsTemplate);
  const [mySocket, setMySocket] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {

    const localCurrentUser = AuthService.getCurrentUser();
    console.log("app.js useeffect localcurrentUser :", localCurrentUser);
    if (localCurrentUser == null) {
      navigate("/login");
    } else {
      setCurrentUser(localCurrentUser);
      navigate("/home");
    }

  }, []);



  return (
    <HomeContext.Provider value={{ currentUser, setCurrentUser, mySocket, setMySocket, players, setPlayers }} >
      <div className="App">
        {/* myContacts, setMyContacts, */}
        <NavBar />
        <div className="MainComponents">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div></HomeContext.Provider>

  );
}

export default App;
