import React, { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { StoreContext } from "../contextapi/contextapi";
import axios from "axios";
import { differenceInCalendarDays } from "date-fns";

const Widget = ({ place }) => {
  const { url } = useContext(StoreContext);

  const [checkIn, setcheckIn] = useState("");
  const [checkOut, setcheckOut] = useState("");
  const [noOfGuests, setnoOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [redirect, setRedirect] = useState("");

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function handlebooking() {
    if (numberOfNights < 1) {
      alert("please book atleast 1 Night");
      return;
    }

    try {
      const response = await axios.post(
        url + "/api/bookplace",
        {
          place: place._id,
          checkIn,
          checkOut,
          noOfGuests,
          name,
          mobile,
          price: numberOfNights * place.price,
        },
        { withCredentials: true }
      );
      console.log(response);
      const bookingId = response?.data?.data?._id; // Optional chaining to safely access _id
      if (bookingId) {
        setRedirect(`/account/bookings/${bookingId}`);
      } else {
        console.log("Booking ID not returned");
      }
    } catch (error) {
      console.error(
        error.response?.data?.message || "Error occurred while booking"
      );
    }
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div className=" border flex flex-col p-4 h-auto mt-2 bg-white md:w-full lg:relative lg:left-5 md:justify-center lg:w-1/2 shadow-xl shadow-slate-200 rounded-3xl">
      <p className="text-center text-primary text-[1.5em]">
        Price: ${place.price} / per night
      </p>
      <div className=" flex flex-col lg:flex-row md:flex-col gap-2 text-gray-800">
        <div className="w-full flex flex-col">
          <label htmlFor="checkin" className="text-sm font-medium mb-1">
            Check-in
          </label>
          <input
            type="datetime-local"
            value={checkIn}
            onChange={(ev) => setcheckIn(ev.target.value)}
            className=" h-10 border border-gray-300 rounded-lg px-2"
          />
        </div>

        <div className="w-full flex flex-col">
          <label htmlFor="checkout" className="text-sm font-medium mb-1">
            Check-out
          </label>
          <input
            type="datetime-local"
            value={checkOut}
            onChange={(ev) => setcheckOut(ev.target.value)}
            className="h-10 border border-gray-300 rounded-lg px-2"
          />
        </div>
      </div>
      <div>
        <label htmlFor="">Guests</label>
        <input
          type="number"
          className="h-10 !mt-1 border border-gray-300 !rounded-lg !px-2 "
          value={noOfGuests}
          min="1"
          onChange={(ev) => {
            setnoOfGuests(ev.target.value);
          }}
        />
      </div>
      {numberOfNights > 0 && (
        <>
          <div className="">
            <label htmlFor="">Your full name</label>
            <input
              type="text"
              className="h-10 !mt-1 border border-gray-300 !rounded-lg !px-2 "
              value={name}
              min="1"
              onChange={(ev) => {
                setName(ev.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="">Mobile number</label>
            <input
              type="tel"
              className="w-full h-10 !mt-1 border border-gray-300 !rounded-lg !px-2 "
              value={mobile}
              min="1"
              onChange={(ev) => {
                setMobile(ev.target.value);
              }}
            />
          </div>
        </>
      )}
      <div>
        <button
          type="submit"
          className="w-full rounded-2xl mt-3 bg-primary py-2 px-4 text-white"
          onClick={handlebooking}
        >
          Book this place
          {numberOfNights > 0 && (
            <span> - Total: ${numberOfNights * place.price}</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Widget;
