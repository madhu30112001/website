import React, { useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";

const Login = ({ setToken, url }) => {
  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post(`${url}/api/user/login`, data);

      if (!result.data.success) {
        alert(result.data.message);
        return;
      }

      if (result.data.role !== "admin") {
        alert("Only admins can login");
        return;
      }

      sessionStorage.setItem("token", result.data.token);
      setToken(result.data.token);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>Login</h2>
        </div>
        <div className="login-popup-inputs">
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <button type="submit">Login</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
      </form>
    </div>
  );
};

export default Login;
