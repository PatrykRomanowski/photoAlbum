import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { loginActions } from "../store/login-context";
import { authTest } from "../firebase";

const Logout = () => {
  const [errorText, setErrorText] = useState("");

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await authTest.signOut();
      dispatch(loginActions.logout());
      setErrorText("Wylogowano.");
    } catch (error) {
      setErrorText("Wylogowanie nie powiodło się.");
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div>
      <div>{errorText}</div>
    </div>
  );
};

export default Logout;
