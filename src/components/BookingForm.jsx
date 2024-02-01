import React, { useState, useEffect } from "react";
import "../style/BookingFrom.css";
import Alert from "./Alert";

function BookingForm(props) {
  const [confirm, setConfirm] = useState(false);
  const [showName, setShowName] = useState("");
  const [userName, setUserName] = useState("");
  const [person, setPerson] = useState(1);
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    setShowName(props.show.name);
    setDay(props.show.schedule.days[0] || "");
    setTime(props.show.schedule.time);
  }, [props.show.name, props.show.schedule.days, props.show.schedule.time]);

 

  const BookingWithId = new Map();

  const handleConfirm = (e) => {
    e.preventDefault();

    const showId = props.show.id;

    const prevMap = BookingWithId.get(showId) || [];

    const newBooking = {
      showName: showName,
      userName: userName,
      person: parseInt(person),
      day: day,
      time: time,
    };

    BookingWithId.set(showId, [...prevMap, newBooking]);

    localStorage.setItem("bookings", JSON.stringify([...BookingWithId]));

    console.log([...BookingWithId]);
    setConfirm(true);
  };

  if (confirm) {
    return (
      <>
        {confirm && (
          <Alert
            show={props.show.name}
            day={props.show.schedule.days[0]}
            time={props.show.schedule.time}
            userName={userName}
            person={person}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div className="form row">
        <h1 className="text-center h1 text-white">
          Booking For Show "{showName}"
        </h1>
        <div className="col-md-4"></div>
        <div className="col-md-4 p-3">
          <form onSubmit={handleConfirm} >
            <div className="form-group">
              <label>Name of Show: </label>
              <input
                className="form-control"
                type="text"
                value={showName}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Your Name: </label>
              <input
                className="form-control"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              <label>Select Number of People: </label>
              <select
                className="form-control"
                value={person}
                placeholder="Select Number of person"
                onChange={(e) => setPerson(e.target.value)}
              >
                {[...Array(10).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Select Day: </label>
              <select
                className="form-control"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                placeholder="Select Day"
              >
                {props.show.schedule.days.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Time: </label>
              <input
                className="form-control"
                type="text"
                value={time}
                readOnly
                placeholder={props.show.schedule.time}
              />
            </div>
            <div  >
            <button className="confirm-btn " type="submit">
              Confirm
            </button>
            </div>
          </form>
        </div>
        <div className="col-md-4"></div>
      </div>
    </>
  );
}

export default BookingForm;
