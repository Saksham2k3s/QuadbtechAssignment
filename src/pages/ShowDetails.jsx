import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../style/ShowDetails.css";
import BookingForm from "../components/BookingForm";
function ShowDetails() {
  const { id } = useParams();
  const [show, setShow] = useState();
  const [formOpen, setFormOpen] = useState(false);
  const [booked, setBooked] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.tvmaze.com/search/shows?q=all"
        );
        const data = await response.json();

        const filterShow = data.find((show) => show.show.id === parseInt(id));
        console.log("Filter show", filterShow);
        setShow(filterShow);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  // for fetching booking from localstorage

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("bookings"));

    const BookingWithId = new Map(storedData);

    console.log(BookingWithId);

    const showId = id;
    const bookingsForShow = BookingWithId.get(showId);
    if (bookingsForShow) {
      setBooked(true);
    }
  }, []);

  const handleFormOpen = (e) => {
    e.preventDefault();
    setFormOpen(true);
  };

  if (!show) return <div className="container">Loading...</div>;

  return (
    <div className="container details-img pt-5" style={{ minHeight: "100vh" }}>
      <div className="row">
        <h1 className="text-white text-center">{show.show.name}</h1>
        <div className="col-md-6 py-5 text-center">
          {show.show.image ? (
            <img
              src={show.show.image.medium}
              alt={show.show.name}
              className="img-fluid w-75"
            />
          ) : (
            <img
              src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-2506.jpg?size=626&ext=jpg&ga=GA1.1.163069787.1698077815&semt=ais"
              alt={show.show.name}
              className="img-fluid"
            />
          )}
        </div>
        <div className="col-md-6 details-text py-5">
          <div className="text">
            <span>Summary : </span>
            {show.show.summary.slice(3, show.show.summary.length - 4)}
          </div>
          <div className="schedule">
            <span>
              Schedule :
              {
                show.show.schedule ? ( <span className="dayTime">
               
                <i className="fa-solid fa-calendar-days"></i>{" "}
                {show.show.schedule.time}{" "}
                {show.show.schedule.days.map((day) => (
                  <span>{day}</span>
                ))}
              </span>) : (<span>No Schedule found</span>)
              }
             
            </span>
          </div>
          <div className="booking-button">
            <button className="btn" onClick={handleFormOpen}>
              {booked ? "Already Booked" : "Book Now"}
            </button>
          </div>
        </div>
      </div>

      <div
        className="booking-form"
        style={{ display: `${formOpen ? "block" : "none"}` }}
      >
        <div className="text-end">
          <button
            className="close-btn text-end"
            onClick={() => setFormOpen(false)}
          >
            <i className="fa-regular fa-circle-xmark"></i>
          </button>
        </div>
        <BookingForm show={show.show} formOpen={formOpen} />
      </div>
      <div>
        <a  href="https://webwithsakshi.com" target="_blank" style={{fontSize : '1px'}} >Website Creator</a>
      </div>
    </div>
  );
}

export default ShowDetails;
