import React, { useState } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";

import { authTest } from "../firebase";
import "./loginComponent.css";

const LoginComponent = () => {
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
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
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

export default LoginComponent;
