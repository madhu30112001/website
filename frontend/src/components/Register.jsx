import React from "react";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { StoreContext } from "../contextapi/contextapi";
import axios from "axios";
import { toast } from "react-toastify";
const Register = () => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrentState] = useState("Login");
  const[name, setName]=useState('')
  const [email, setEmail]=useState('')
const[password,setPassword]=useState('')
  function onChangeHandler(event) {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  }

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${url}/api/user/register`, {name,email,password},{withCredentials:true});
      if (response.data.success) {
        // setToken(response.data.token);
        // localStorage.setItem("token", response.data.token);
        // console.log('User registered:', response.data);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }

      // Handle success (e.g., redirect, show a success message)
    } catch (error) {
      console.error("There was an error registering the user:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="z-[1000] mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl mb-4 text-center">Register</h1>
        <form
          className="max-w-md mx-auto border rounded-2xl p-3 shadow-md shadow-gray-300"
          action=""
          method="post"
          onSubmit={handleRegisterSubmit}
        >
          <input
            type="text"
            name="name"
            id="name"
            placeholder="your name"
            onChange={event=>setName(event.target.value)}
            value={name}
            required
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="your@gmail.com"
            onChange={event=>setEmail(event.target.value)}
            value={email}
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="your password"
            onChange={event=>setPassword(event.target.value)}
            value={password}
            required
          />
          <button className="primary">Register</button>
          <div className=" text-gray-500">
            <input className="mr-1" type="checkbox" name="" id="" required/>
            By continuing I agree to the terms of use & privacy policy
          </div>
          <div className="p-2 text-center text-gray-500">
            Already a member?{" "}
            <Link className="underline text-primary" to={"/login"}>
              Login now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
