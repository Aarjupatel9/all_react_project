import React, { useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/user.service";
import MainDisplayArea from "./child-component/MainDisplayArea.home";
import AuthService from "../services/auth.service";
import io from "socket.io-client";

import { useDispatch, useSelector } from "react-redux";

import HomeContext from "../context/HomeContext";

import "../mainstyle.css";
import { userDetailsTemplate } from "../templates/Templates";
import authService from "../services/auth.service";

import toast from 'react-hot-toast';


function Home() {

  const { currentUser, setCurrentUser, mySocket, setMySocket, players, setPlayers } = useContext(HomeContext);
  // myContacts, setMyContacts,

  const [massegeArrayPage, setMassegeArrayPage] = useState(1);
  const [massegeArrayScrollToBottom, setMassegeArrayScrollToBottom] = useState(1);
  const [massegeArrayWhole, setMassegeArrayWhole] = useState([]);

  const [localContacts, setLocalContacts] = useState([]);

  const contactIdRef = useRef(currentUser._id);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser === userDetailsTemplate) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    console.log("useEffect localContacts start ", localContacts.length);
  }, [localContacts]);






  useEffect(() => {

  }, []);




  // listenr's function for sockerts


  useEffect(() => {

    const socket = io(process.env.REACT_APP_SOCKET_SERVER, {
      withCredentials: true,
      extraHeaders: {
        "token": "abcd"
      },
      auth: {
        id: AuthService.getCurrentUserId()
      }
    });

    socket.on("connect", () => {
      setMySocket(socket);
      console.log("SocketServiceInit Connected to server!");
    });

    socket.on("logoutEvent", (status) => {
      console.log("logout event accure");
      socket.disconnect();
      AuthService.logout();
      setCurrentUser(userDetailsTemplate);
      window.alert("you are logout due to android session is started");
      window.location.reload();
    });


    setMySocket(socket);

    return () => {
      socket.disconnect();
    };

  }, []);


  const onBlockContentClick = () => {

  }
  return (
    <div className="homeDiv">

        <div className="MainDisplayArea ">
          <MainDisplayArea />
        </div>

    </div>
  );
}

export default Home;
