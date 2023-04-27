import React, { useState } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";

import { authTest } from "../firebase";
import "./registerComponent.css";

const RegisterComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(authTest, email, password);
      console.log("Rejestracja powiodła się.");
    } catch (error) {
      console.log("Rejestracja nie powiodła się.", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p className="inputText">WPISZ LOGIN:</p>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="inputText">WPISZ HASŁO:</p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Zarejestruj się</button>
      </form>
    </div>
  );
};

export default RegisterComponent;
