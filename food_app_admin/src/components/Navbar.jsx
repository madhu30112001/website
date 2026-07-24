import React from "react";
import { assets } from "../../src/assets/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Navbar = ({setToken }) => {
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("token");
    setToken(null)
    navigate("/");
  };
  return (
    <div className="navbar">
      <img src={assets.logo} alt="logo" className="logo" />
      <div className="navbar-login">
        <li onClick={logout}>
          <FontAwesomeIcon icon={faSignOut} className="fontawesome-basket" />
          <p>Logout</p>
        </li>
        <img src={assets.profile_image} alt="profile" className="profile" />
      </div>
    </div>
  );
};

export default Navbar;
