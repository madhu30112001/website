import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Placeform from "../components/Placeform";
import axios from "axios";
import { StoreContext } from "../contextapi/contextapi";
import Account from "./Account";
import PlaceImg from "../components/PlaceImg";
import TruncateTooltip from "../Tooltip/tooltip";

const Places = () => {
  const { url } = useContext(StoreContext);
  const [placeData, setPlaceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { action } = useParams();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(url + "/api/places", {
          withCredentials: true,
        });
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
    <div className="min-h-screen">
      {/* <Account /> */}

      {action !== "new" && (
        <div className="max-w-6xl mx-auto">
          <div className="my-6 text-center">
            <Link
              to="/account/places/new"
              className="bg-primary hover:bg-red-600 transition text-white py-2 px-6 rounded-full inline-flex items-center gap-2 shadow-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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
            <p className="text-center text-gray-500">Loading places...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <div className="m-2">
              <h2 className="text-xl font-semibold mb-4">Your Places</h2>

              <div className="flex flex-col gap-4">
                {placeData.map((place) => (
                  <Link
                    to={`/account/places/${place._id}`}
                    key={place._id}
                    className="flex flex-col md:flex-row items-start gap-4 p-2 border border-gray-300 rounded-lg bg-gray-100 shadow-sm hover:shadow-md transition"
                  >
                    {place.addedPhotos && place.addedPhotos.length > 0 ? (
                      <PlaceImg
                        place={place}
                        className="w-full md:w-[200px] h-[150px] object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-[200px] h-[150px] bg-gray-200 flex items-center justify-center text-gray-500">
                        No photo
                      </div>
                    )}
                    <div>
                      <h3>{place.title}</h3>
                      <p className="text-gray-500">{place.address}</p>
                      <p className="max-w-xs lg:max-w-4xl">
                        {" "}
                        <TruncateTooltip
                          color={"text-gray-500"}
                          text={place.description}
                          width={1000}
                        />
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {action === "new" && <Placeform />}
    </div>
  );
};

export default Places;
