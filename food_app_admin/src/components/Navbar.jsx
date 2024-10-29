import React from "react";
import { assets } from '../../src/assets/assets';

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={assets.logo} alt="logo" className="logo"/>
      <img src={assets.profile_image} alt="profile" className="profile" />
    </div>
  );
};

export default Navbar;
