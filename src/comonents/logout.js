import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginActions } from "../store/login-context";
import { authTest } from "../firebase";
// import "./logoutComponent.css";

const Logout = () => {
  const [logoutResult, setLogoutResult] = useState(null);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await authTest.signOut();
      dispatch(loginActions.logout());
      setLogoutResult("success");
    } catch (error) {
      setLogoutResult("failure");
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  const handleCloseModal = () => {
    setLogoutResult(null);
    window.location.href = "/";
  };

  return (
    <div>
      {logoutResult === "success" && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Wylogowano pomyślnie</h2>
              <span className="close" onClick={handleCloseModal}>
                &times;
              </span>
            </div>
            <div className="modal-body">
              <div>Zostałeś wylogowany.</div>
            </div>
          </div>
        </div>
      )}
      {logoutResult === "failure" && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Błąd wylogowania</h2>
              <span className="close" onClick={handleCloseModal}>
                &times;
              </span>
            </div>
            <div className="modal-body">
              <div>Wylogowanie nie powiodło się.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logout;
