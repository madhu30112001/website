import {
  Route,
  Routes,
  BrowserRouter as Router,
  useParams,
} from "react-router-dom";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import axios from "axios";
import Register from "./components/Register";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Account from "./pages/Account";
import Places from "./pages/Places";
import Placeform from "./components/Placeform";
import ProfileComp from "./components/ProfileComp";
import PlacesInfo from "./components/PlacesInfo";
import BookingsPage from "./pages/BookingsPage";
import BookingPage from "./pages/BookingPage";
function App() {
  return (
    <>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<ProfileComp />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
          <Route path="/account/places" element={<Places />} />
          <Route path="/account/places/new" element={<Placeform />} />
          <Route path="/account/places/:id" element={<Placeform />} />
          <Route path="/places/:id" element={<PlacesInfo/>} />

        </Route>
      </Routes>
    </>
  );
}

export default App;
