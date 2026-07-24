import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectToken,
  setToken,
  selectTotalCartAmount,
} from "../redux/slice/globalSlice";

import { assets } from "../assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  faCartShopping,
  faSearch,
  faBagShopping,
  faSignOut,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = ({ setShowLogin }) => {
  const location = useLocation();
  const [menu, setMenu] = useState("home");

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const token = useSelector(selectToken);
  const totalCartAmount = useSelector(selectTotalCartAmount); // optional

  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("token");
    dispatch(setToken(""));
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/">
        {" "}
        <img src={assets.header_pic} alt="" className="logo" />
      </Link>
      <div className="navbar-links">
        <ul className="navbar-menu">
          <Link
            to="/"
            onClick={() => setMenu("Home")}
            className={menu === "Home" ? "active" : ""}
          >
            home
          </Link>
          <a
            href="#explore-menu"
            onClick={() => setMenu("menu")}
            className={menu === "menu" ? "active" : ""}
          >
            menu
          </a>
          <a
            href="#app-download"
            onClick={() => setMenu("mobile-app")}
            className={menu === "mobile-app" ? "active" : ""}
          >
            mobile-app
          </a>
          <a
            href="#footer"
            onClick={() => setMenu("contact")}
            className={menu === "contact" ? "active" : ""}
          >
            contact
          </a>
        </ul>
      </div>

      <div className="navbar-cart">
        <FontAwesomeIcon icon={faSearch} className="fontawesome-search" />
        <div className="search-icon">
          <Link to="/cart">
            <FontAwesomeIcon
              icon={faCartShopping}
              className="fontawesome-basket"
            />
          </Link>
          <div className={totalCartAmount === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button
            onClick={() => setShowLogin(true)}
            className="btn"
            type="button"
          >
            sign in
          </button>
        ) : (
          <div className="navbar-profile">
            <FontAwesomeIcon
              icon={faUserCircle}
              className="fontawesome-basket"
              data-testid="user-circle-icon"
            />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <FontAwesomeIcon
                  icon={faBagShopping}
                  className="fontawesome-basket"
                />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <FontAwesomeIcon
                  icon={faSignOut}
                  className="fontawesome-basket"
                />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
