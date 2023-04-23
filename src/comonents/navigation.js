import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

const NavigarionComponent = () => {
  return (
    <div>
      <div>
        <Link to="/addPhoto">DODAJ ZDJĘCIE</Link>
      </div>
      <div>
        <Link to="/album">ALBUM</Link>
      </div>
      <div>
        <Link to="/">LOGOWANIE</Link>
      </div>
    </div>
  );
};

export default NavigarionComponent;
