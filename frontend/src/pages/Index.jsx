import React, { useContext, useState, useEffect } from "react";

import Header from "../components/Header";
import { StoreContext } from "../contextapi/contextapi";
import axios from "axios";
import { Link } from "react-router-dom";
const Index = () => {
  const { url } = useContext(StoreContext);

  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(url + "/api/places", {
          withCredentials: true,
        });

        setPlaces(response.data); // Assuming your response structure has 'data' containing the places
      } catch (error) {
        console.error("Error fetching places:", error);
        setError(error.message); // Store the error message
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchPlaces();
  }, [url]);
  if (loading) return <div>Loading...</div>; // Display a loading message
  if (error) return <div>Error: {error}</div>;
  return (
    
    <div className="mt-5 lg:mx-16 md:mx-6 gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={"/places/"+place._id} key={place._id}>
          <div className=" rounded-lg p-2 transition-transform hover:scale-105">
            <div className="flex items-center">
              {place.addedPhotos?.[0] ? (
                <img
                
                  src={"http://localhost:4000" + place.addedPhotos?.[0]}
                  alt={`Photo of ${place.title}`}
                  className="w-full h-[270px] object-cover rounded-2xl bg-slate-300 aspect-square"
                  onError={(e) => {
                    e.target.onerror = null; // Prevents looping
                    e.target.src = "/path/to/fallback/image.jpg"; // Provide a fallback image
                  }}
                />
              ) : (
                <div className="h-[250px] bg-slate-300 flex items-center justify-center rounded-2xl">
                  <p>No Image Available</p>{" "}
                  {/* Placeholder when no image is available */}
                </div>
              )}
            </div>
            <h3 className="text-[19px] font-bold mt-1"> {place.address}</h3>

            <h3 className="text-[19px] text-gray-600 truncate"> {place.title}</h3>
            <div className=" text-[19px]">
            <span className="font-semibold">{place.price} </span> per night

            </div>
          </div>
          </Link>
        ))}
    </div>
    
  );

};

export default Index;
