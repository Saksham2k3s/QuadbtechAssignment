import React, { useState, useEffect } from "react";
import "../style/ShowsList.css";
import ShowCard from "../components/ShowCard";

const ShowsList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.tvmaze.com/search/shows?q=all"
        );
        const data = await response.json();
        setShows(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching shows:", error);
      }
    };

    fetchData();
  }, []);

  const scrollToShowList = () => {
    const showListElement = document.getElementById("showList");
    if (showListElement) {
      showListElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container ">
      <div className="hero-section">
        <h1>Enjoy Your Show's</h1>
        <button className="btn" onClick={scrollToShowList}>
          Show's List <i className="fa-solid fa-angle-down"></i>
        </button>
      </div>
      <div className="show-list">
        <div className="row" id="showList">
          {shows.map((show) => (
            <div className="col-md-4">
              <ShowCard showData={show} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowsList;
