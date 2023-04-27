import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authTest } from "../firebase";
import { loginActions } from "../store/login-context";
import { useNavigate } from "react-router-dom";
import "./loginComponent.css";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // użycie hooka useNavigate do przekierowania użytkownika na inną stronę

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(authTest, email, password);
      dispatch(loginActions.login({ value: email }));
      console.log(`Zalogowano jako: ${email}`);
      setRedirect(true); // ustawienie wartości redirect na true po zalogowaniu
    } catch (error) {
      console.log("Logowanie nie powiodło się.", error);
    }
  };

  if (redirect) {
    navigate("/album"); // przekierowanie na stronę Dashboard po zalogowaniu za pomocą hooka useNavigate
  }

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
        <button type="submit">Zaloguj się</button>
      </form>
    </div>
  );
};

export default LoginComponent;
