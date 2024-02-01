import React from "react";
import "../style/Alert.css";
function Alert(props) {
  return (
    <>
      <div className="alert  text-center" role="alert">
        <h1>Booked!</h1>

        <h1 className="h1">Show Name : {props.show}</h1>
        <h1 className="h1">Time : {props.time}</h1>
        <h1 className="h1">Day : {props.day}</h1>
        <h1 className="h1">User Name : {props.userName}</h1>
        <h1 className="h1">Number of persone : {props.person}</h1>
      </div>
    </>
  );
}

export default Alert;
