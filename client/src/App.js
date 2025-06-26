// client/src/scenes/loginPage/index.jsx
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state"; // assuming this sets token/user in Redux
import { useNavigate } from "react-router-dom";

const baseUrl = process.env.REACT_APP_API_URL;

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, {
        email,
        password,
      });

      const { user, token } = response.data;
      dispatch(setLogin({ user, token }));
      navigate("/home");
    } catch (err) {
      console.error("Login failed", err.response?.data || err.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
