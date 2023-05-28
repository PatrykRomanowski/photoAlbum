import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authTest } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./registerComponent.css";

const RegisterComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerResult, setRegisterResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (registerResult === "success" && showModal) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [registerResult, showModal, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(authTest, email, password);
      console.log("Rejestracja powiodła się.");
      setRegisterResult("success");
      setShowModal(true);
    } catch (error) {
      console.log("Rejestracja nie powiodła się.", error);
      setRegisterResult("failure");
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setRegisterResult(null);
    setShowModal(false);
  };

  return (
    <div>
      <form className="registerComponent" onSubmit={handleSubmit}>
        <p className="inputText">WPISZ LOGIN:</p>
        <input
          className="input-login"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="inputText">WPISZ HASŁO:</p>
        <input
          className="input-login"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn-register" type="submit">
          Zarejestruj się
        </button>
      </form>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              {registerResult === "failure" && <h2>Błąd rejestracji</h2>}
              {registerResult === "success" && (
                <h2>Rejestracja powiodła się</h2>
              )}
              <span className="close" onClick={handleCloseModal}>
                &times;
              </span>
            </div>
            <div className="modal-body">
              {registerResult === "failure" && (
                <div>
                  Rejestracja nie powiodła się. Sprawdź poprawność danych i
                  spróbuj ponownie.
                </div>
              )}
              {registerResult === "success" && (
                <div>Rejestracja zakończona sukcesem.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterComponent;
