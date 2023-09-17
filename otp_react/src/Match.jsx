import React from "react";
import "./App.css";

const Match = (props) => {
  console.log(props.props);
  return (
    <>
      <div className="innslot">
        <h3 className="emogi">
          {props.props.x} {props.props.y} {props.props.z}
        </h3> 
        <h3 className="match">This is matching</h3>
        <hr style={({ border: "2px solid black" }, { width: "100%" })}></hr>
      </div>
      
    </>
  )
};


export default Match;
