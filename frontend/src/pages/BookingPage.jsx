import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../contextapi/contextapi";
import axios from "axios";
import AddressLink from "../components/AddressLink";
import PlaceImages from "../components/PlaceImages";
import BookingDates from "../components/BookingDates";

const BookingPage = () => {
  const { id } = useParams();
  const { url } = useContext(StoreContext);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    async function fetchbook() {
      if (id) {
        try {
          const response = await axios.get(url + "/api/getbookings", {
            withCredentials: true,
          });


          const getdata = response.data.data.find((item) => item._id === id);


          if (getdata) {
            setBooking(getdata);
          }
        } catch (error) {
          console.error("Error fetching booking:", error);
        }
      }
    }
    fetchbook();
  }, [id]);

  return (
    <>
      {booking ? (
        <div className="mx-auto">
          <h1 className="text-[2em] mt-4">
            <strong>{booking.place.title}</strong>
          </h1>
          <AddressLink>{booking.place.address}</AddressLink>
          <div className="bg-slate-100 p-4 mt-4 flex items-center justify-between rounded-2xl">
            <div className="flex flex-col gap-2">
              <h1>Your Booking Information</h1>
              <BookingDates book={booking} />
            </div>
            <div className="bg-primary p-3 rounded-2xl text-white">
              <h2>Total Price:</h2>
              <p className="text-center">${booking.price}</p>
            </div>
          </div>
          <PlaceImages place={booking.place} />
        </div>
      ) : (
        <p>Loading booking details...</p>
      )}
    </>
  );
};

export default BookingPage;
