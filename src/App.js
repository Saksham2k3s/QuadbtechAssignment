import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ShowsList from "./pages/ShowsList";
import ShowDetails from "./pages/ShowDetails";

function App() {
  return (
    <>
      <div className="container-fluid background-color ">
        <Routes>
          <Route path="/" element={<ShowsList />} />
          <Route path="/show/booking/:id" element={<ShowDetails />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
