import React, { useContext, useEffect, useState } from "react";

import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import HomeContext from "../../context/HomeContext";
function MainDisplayArea() {


  const { fUpdateContactRankAndLastMassege, massegeArrayScrollToBottom, setMassegeArrayScrollToBottom, addMyContactsUpdateQueue } = useContext(HomeContext);

 





  return (
    <>
      hello
     </>

  );
}

export default MainDisplayArea;
