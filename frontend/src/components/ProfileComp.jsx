import React, { useContext, useState } from "react";
import { StoreContext } from "../contextapi/contextapi";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Places from "../pages/Places";
import Account from "../pages/Account";
import BookingPage from "../pages/BookingsPage";

const ProfileComp = () => {
  const [redirect, setRedirect] = useState(false);
  const { url, user, ready, setUser } = useContext(StoreContext);
  const location = useLocation();
  const pathname = location.pathname;
  let subpage = pathname.split('/')?.[2];
  
  if (subpage === undefined) {
    subpage = "profile";
  }

  const logout = async () => {
    try {
      const response = await axios.post(url + "/api/logout", {}, {
        withCredentials: true,
      });
      setRedirect("/");
      toast.success(response.data.message);
      setUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <>
      <Account />
      {subpage === "profile" && (
        <div className="max-w-lg mx-auto text-center md:max-w-3xl lg:max-w-4xl">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Profile
          </h1>
          <p className="text-sm md:text-lg lg:text-xl mb-4">
            Logged in as <strong>{user.name}</strong> ({user.email})
          </p>
          <button
            onClick={logout}
            className="w-full md:w-1/2 lg:w-1/3 mx-auto mt-2 py-2 px-4 bg-primary text-white rounded-full transition-transform transform hover:scale-105"
          >
            Log Out
          </button>
        </div>
      )}
      {subpage === "bookings" && <BookingPage />}
      {subpage === "places" && <Places />}
    </>
  );
};

export default ProfileComp;
