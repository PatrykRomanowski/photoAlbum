import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./navigation.css";

const NavigarionComponent = () => {
  const actualEmail = useSelector((state) => state.login.email);

  return (
    <div className="header">
      <div className="menu">
        {actualEmail ? (
          <div className="menu-item">
            <Link className="header-link" to="/addPhoto">
              DODAJ FOTOGRAFIE
            </Link>
          </div>
        ) : null}
        {actualEmail ? (
          <div className="menu-item">
            <Link className="header-link" to="/album">
              ALBUM
            </Link>
          </div>
        ) : null}
        {actualEmail ? null : (
          <div className="menu-item">
            <Link className="header-link" to="/">
              LOGOWANIE
            </Link>
          </div>
        )}
        {actualEmail ? null : (
          <div className="menu-item">
            <Link className="header-link" to="/register">
              REJESTRACJA
            </Link>
          </div>
        )}
        {actualEmail ? (
          <div className="menu-item">
            <Link className="header-link" to="/logout">
              WYLOGOWANIE
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NavigarionComponent;
