import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../contextapi/contextapi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as solidHeart,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const Index = () => {
  const { url } = useContext(StoreContext);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedPlaces, setLikedPlaces] = useState({});
  const [placeRatings, setPlaceRatings] = useState({});
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(`${url}/api/places`, {
          withCredentials: true,
        });
        setPlaces(response.data);
        const ratings = {};
        response.data.forEach((place) => {
          ratings[place._id] = (Math.random() * 4 + 1).toFixed(1); // e.g. 3.6
        });
        setPlaceRatings(ratings);
      } catch (error) {
        console.error("Error fetching places:", error);
        setError("Failed to load places.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [url]);

  const toggleLike = (e, placeId) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedPlaces((prev) => ({
      ...prev,
      [placeId]: !prev[placeId],
    }));
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="py-4 px-4 sm:px-6 md:px-8 lg:px-2 mx-4">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Homes in India</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-5 gap-5">
        {places.map((place) => (
          <Link
            to={`/places/${place._id}`}
            key={place._id}
            className="block group"
          >
            <div className="relative rounded-xl overflow-hidden transition-transform hover:scale-105 bg-white">
              {/* Heart Icon */}
              <div
                onClick={(e) => toggleLike(e, place._id)}
                className="absolute top-2 right-2 z-10 cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={likedPlaces[place._id] ? solidHeart : regularHeart}
                  className={`w-5 h-5 ${
                    likedPlaces[place._id] ? "text-red-500" : "text-white"
                  }`}
                  style={{ stroke: "white" }}
                />
              </div>

              {/* Place Image */}
              {place.addedPhotos?.[0] ? (
                <img
                  src={`http://localhost:4000${place.addedPhotos[0]}`}
                  alt={`Photo of ${place.title}`}
                  className="w-full h-48 sm:h-44 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/fallback.jpg";
                  }}
                />
              ) : (
                <div className="h-44 bg-slate-300 flex items-center justify-center text-sm text-gray-600">
                  No Image Available
                </div>
              )}

              {/* Place Info */}
              <div className="p-2">
                <h3 className="text-sm font-semibold truncate">
                  {place.address}
                </h3>
                <div className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                  ₹{place.price} per night
                  <FontAwesomeIcon
                    icon={faStar}
                    className="w-3 h-3 text-yellow-400"
                  />
                  <span className="text-[.7em]">{placeRatings[place._id]}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Index;
