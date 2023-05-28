import React from "react";
import { useNavigate } from "react-router-dom";

import "./titlepageComponent.css";
import backgroundImage from "../photos/titlePhoto.jpg"; // Dodaj import ścieżki do obrazka

const TitlepageComponent = () => {
  const navigate = useNavigate();
  const keepGoing = () => {
    navigate("/login");
  };

  return (
    <div
      className="title-page-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="title-text">Zachowaj swoje wspomnienia na dłużej.</div>
      <button className="homePage-btn" onClick={keepGoing}>
        Zaczynamy
      </button>
    </div>
  );
};

export default TitlepageComponent;
