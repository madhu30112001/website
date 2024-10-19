import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../contextapi/contextapi";
import axios from "axios";
import Widget from "./widget";
import PlaceImages from "./PlaceImages";
import AddressLink from "./AddressLink";

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
        console.log("place response", response);

        setPlace(response.data);
      } catch (error) {
        console.error("failed to get data in placeInfo file", error);
      }
    };
    fetchInfo();
  }, [id, url]);

  return (
    <div className="flex justify-center min-h-screen  md:mx-6 ">
      {place ? (
        <div className="relative ">
          <h1 className="text-[2em] ">{place.title}</h1>
          <AddressLink>{place.address}</AddressLink>
          <PlaceImages place={place} />
          <div className="md:flex lg:flex mt-2 text-gray-800">
            <div>
              <h1 className="mt-2 font-bold text-[1.3em]">Description</h1>
              <p className="w-full max-w-[515px] mt-2 text-[1em] text-gray-800">
                {place.description}
              </p>
              <p className="mt-2">Check In Time: {place.checkIn}</p>
              <p className="mt-2">Check Out Time: {place.checkOut}</p>

              <p className=" mt-2">
                Max Number of guests: {place.maxGuests} Guests
              </p>
            </div>
            <Widget place={place} />
          </div>
          <h1 className="mt-2 font-bold text-[1.3em]">Extra Info</h1>
          <p className="w-full max-w-[1000px]">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit neque
            unde, quasi illo, doloribus vero saepe quo rem numquam et recusandae
            dolore nostrum natus voluptatibus! Necessitatibus at non ut
            exercitationem!{place.extraInfo}
          </p>
        </div>
      ) : (
        <p>Loading...</p> // Show loading or fallback content
      )}
    </div>
  );
};

export default PlacesInfo;
