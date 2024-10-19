import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../contextapi/contextapi";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Account from "./Account";
import PlaceImg from "../components/PlaceImg";
import BookingDates from "../components/BookingDates";

const BookingsPage = () => {
  const { url } = useContext(StoreContext);
  const { id } = useParams();
  const [bookingsList, setBookingsList] = useState([]);

  useEffect(() => {
    async function fetchBookingDetails() {
      const response = await axios.get(url + "/api/getbookings", {
        withCredentials: true,
      });
      console.log(response.data.data);
      setBookingsList(response.data.data);
    }
    fetchBookingDetails();
  }, [url]);

  return (
    <>
      <Account />
      <div className="lg:px-20">
        {bookingsList?.length > 0 ? (
          bookingsList.map((book, index) => (
            <Link
              key={index}
              to={`/account/bookings/${book._id}`}
              className="block"
            >
              <div className="flex flex-col md:flex-row mb-4 border rounded-lg shadow gap-4 bg-slate-100 p-4">
                <div className="md:w-[150px] w-full">
                  {book.place ? (
                    <PlaceImg
                      place={book.place}
                      className="w-full h-[200px] md:w-[150px] md:h-[140px] object-cover rounded-md bg-slate-300"
                    />
                  ) : (
                    <p>Place information not available</p>
                  )}
                </div>
                <div className="w-full grid my-auto gap-2">
                  <p className="text-lg font-semibold">{book.place?.title}</p>
                  <hr className="w-full border" />
                  <BookingDates book={book} />
                  <div className="flex gap-1 items-center text-sm md:text-base">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                      />
                    </svg>
                    <p>Total price: $ {book.price}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No bookings available.</p>
        )}
      </div>
    </>
  );
};

export default BookingsPage;
