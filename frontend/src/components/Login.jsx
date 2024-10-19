import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { StoreContext } from "../contextapi/contextapi";
import axios from "axios";
import register from "./Register"

import { toast } from "react-toastify";
const Login = () => {
  const { url, setToken,setUser } = useContext(StoreContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setredirect] = useState(false);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${url}/api/user/login`,
        { email, password },
        { withCredentials: true }
      );
      if (response.data.success) {
        setUser(response.data.userlogin)

        toast.success(response.data.message);

      
          setredirect(true)

       

      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error logging in", error);
    }
  };
  if (redirect) {
    // window.location.href = "http://localhost:5173/";
    return <Navigate to="/" />; // Redirect to home page

  }
  return (
    <div className="mt-4 w-[100%] h-[100%] relative z-[1000] grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl mb-4 text-center">Login</h1>
        <form
          className="max-w-md mx-auto border rounded-2xl shadow-md shadow-gray-300 p-3"
          onSubmit={handleLoginSubmit}
        >
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="password"
            name="password"
            placeholder="Your Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <button className="primary">Login</button>
          <div className=" text-gray-500">
            <input className="mr-1" type="checkbox" name="" id="" required />
            By continuing I agree to the terms of use & privacy policy
          </div>
          <div className="p-2 text-center text-gray-500">
            Don't have an account?{" "}
            <Link className="underline text-primary" to="/register">
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
