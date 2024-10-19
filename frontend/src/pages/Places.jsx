import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Placeform from "../components/Placeform";
import axios from "axios";
import { StoreContext } from "../contextapi/contextapi";
import Account from "./Account";
import PlaceImg from "../components/PlaceImg";

const Places = () => {
  const { url } = useContext(StoreContext);
  const [placeData, setPlaceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { action } = useParams();
  const [error, setError] = useState("");

  // Fetch places on component mount
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(url + "/api/places", {
          withCredentials: true,
        });
        console.log("Response Data:", response.data);
        setPlaceData(response.data);
      } catch (error) {
        setError("Failed to load places. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, [url]);
  
  return (
    <div>
      {/* Button to add new place */}
      <Account />
      {action !== "new" && (
        <div className="text-center lg:px-20">
          <div className="relative bottom-3">

          <Link
            className="bg-primary inline-flex gap-1 text-white py-2 px-6 rounded-full"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add New Place
          </Link>
          </div>
          

          {loading ? (
            <p>Loading places...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="text-left">
              <h2 className="text-3xl mb-3 font-medium">Your Places</h2>
              {placeData.map((place) => (
                <Link
                  to={"/account/places/" + place._id}
                  key={place._id}
                  className="flex flex-col md:flex-row mb-4 border p-4 rounded-lg shadow gap-4 bg-slate-100"
                  >
                  
                  {place.addedPhotos && place.addedPhotos.length > 0 ? (
                    // place.addedPhotos.map((photo, index) => (
                      <PlaceImg place={place} className={"m-auto w-full h-[200px] md:w-[200px] md:h-[150px] lg:w-[230px] lg:h-[160px] object-cover rounded-md bg-slate-300"}
/>
                    
                  ) : (
                    <p>No photos available.</p>
                  )}
                  <div className="flex flex-col m-auto">
                    <h3 className="font-normal text-[18px] md:text-[20px] lg:text-[24px]">{place.title}</h3>

                    <p className="text-[14px] md:text-[16px] lg:text-[18px] text-gray-600 mt-1">{place.address}</p>
                    {/* <p className="text-sm">Max Guests: {place.maxGuests}</p> */}
                    <p className="text-[12px] md:text-[14px] lg:text-[16px] text-gray-600 mt-2">
                      {place.description}
                    </p>
                  </div>

                  {/* Display perks */}
                  {/* <div className="mt-2">
          <h4 className="font-semibold">Perks:</h4>
          <ul className="list-disc pl-5">
            {place.perks && place.perks.length > 0 ? (
              place.perks.map((perk, index) => (
                <li key={index} className="text-sm text-gray-600">
                  {perk}
                </li>
              ))
            ) : (
              <p>No perks available.</p>
            )}
          </ul>
        </div>*/}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Place form */}
      {action === "new" && <Placeform />}
    </div>
  );
};

export default Places;
