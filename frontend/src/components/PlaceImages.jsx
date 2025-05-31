import React, { useState } from "react";

const PlaceImages = ({ place }) => {
  const [showMore, setShowMore] = useState(false);

  if (showMore) {
    return (
      <div className="fixed inset-0 z-50 bg-white overflow-auto p-4">
        <button
          className="absolute top-4 left-4 bg-white p-2 rounded shadow"
          onClick={() => setShowMore(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <h1 className="text-xl font-semibold text-gray-900 text-center mt-12 mb-6">
          Photo tour
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {place?.addedPhotos?.map((photo, index) => (
            <img
              key={index}
              src={`http://localhost:4000${photo}`}
              alt={`Photo of ${place.title}`}
              className="w-full h-48 object-cover rounded"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 relative flex flex-col lg:flex-row gap-2 items-center justify-center">
      {place.addedPhotos && place.addedPhotos.length > 0 ? (
        <>
          {/* Main photo */}
          <img
            src={`http://localhost:4000${place.addedPhotos[0]}`}
            alt={`Photo of ${place.title}`}
            onClick={() => setShowMore(true)}
            className="w-full lg:w-[60%] h-[320px] lg:h-[391px] object-cover cursor-pointer rounded-s-lg"
          />

          {/* Thumbnail grid (only on md and up) */}
          <div className="hidden md:grid grid-cols-2 gap-2 w-full lg:w-[40%]">
            {[1, 2, 3, 4].map((i) =>
              place.addedPhotos[i] ? (
                <img
                  key={i}
                  src={`http://localhost:4000${place.addedPhotos[i]}`}
                  alt={`Photo of ${place.title}`}
                  onClick={() => setShowMore(true)}
                  className={`w-full h-36 lg:h-[191px] object-cover ${
                    i === 2 || i === 4 ? "rounded-e-lg" : ""
                  }`}
                />
              ) : null,
            )}
          </div>

          {/* Show all button */}
          <button
            type="button"
            onClick={() => setShowMore(true)}
            className="absolute right-2 bottom-2 bg-white text-black text-sm px-3 py-1 rounded shadow flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                clipRule="evenodd"
              />
            </svg>
            Show all photos
          </button>
        </>
      ) : (
        <p>No photos available.</p>
      )}
    </div>
  );
};

export default PlaceImages;
