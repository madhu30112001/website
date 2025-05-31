import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../contextapi/contextapi";
import axios from "axios";
import Widget from "./widget";
import PlaceImages from "./PlaceImages";
import AddressLink from "./AddressLink";
import TruncateTooltip from "../Tooltip/tooltip";

const PlacesInfo = () => {
  const { url } = useContext(StoreContext);
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchInfo = async () => {
      try {
        const response = await axios.get(url + `/api/places/${id}`, {
          withCredentials: true,
        });
        setPlace(response.data);
      } catch (error) {
        console.error("Failed to get data in PlacesInfo", error);
      }
    };
    fetchInfo();
  }, [id, url]);

  return (
    <div className="flex justify-center items-center min-h-screen w-full p-2">
      {place ? (
        <div className="w-full max-w-5xl">
          <h1 className=" text-2xl sm:text-3xl font-semibold mb-2">
            {place.title}
          </h1>
          <h1 className="">
            {" "}
            <AddressLink>{place.address}</AddressLink>
          </h1>

          <PlaceImages place={place} />

          <div className="flex flex-col lg:flex-row justify-between gap-6 mt-4 text-gray-800">
            <div className="flex-1 ">
              <h2 className="font-bold text-lg sm:text-xl mb-2">Description</h2>
              <p className="whitespace-normal max-w-96 break-words">
                {place.description}{" "}
              </p>
              <p className="mt-3">Check-In Time: {place.checkIn}</p>
              <p className="mt-1">Check-Out Time: {place.checkOut}</p>
              <p className="mt-1">Max Guests: {place.maxGuests}</p>
            </div>

            <div className="">
              <Widget place={place} />
            </div>
          </div>

          <div className="mt-6 ">
            <h2 className="font-bold text-lg sm:text-xl mb-2">Extra Info</h2>
            <p className="text-gray-700 leading-relaxed whitespace-normal break-words">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit neque
              unde, quasi illo, doloribus vero saepe quo rem numquam et
              recusandae dolore nostrum natus voluptatibus! Necessitatibus at
              non ut exercitationem!{place.extraInfo}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PlacesInfo;
