import React from "react";
import { useState } from "react";
const PlaceImages = ({ place }) => {
  const [showMore, setShowMore] = useState(false); // State to toggle the display of more photos
  if (showMore) {
    return (
      <div className="absolute inset-0 items-center justify-center bg-white min-h-screen z-50 lg:w-[1050px] md:w-[700px]">
        <button className="relative top-9 mt-6 ml-6 px-10" onClick={() => setShowMore(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <h1 className="text-[1.5em] text-[#141414] px-24 font-semibold">
            Photo tour
          </h1>
        <div className="px-24 mt-10">
          
          <div className="w-full gap-2 grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 ">
            {place?.addedPhotos?.length > 0 &&
              place.addedPhotos.map((photo, index) => (
                <img
                  key={index}
                  src={`http://localhost:4000${photo}`}
                  alt={`Photo of ${place.title}`}
                  className=" w-[200px] h-[150px] items-center justify-center lg:h-[220px] lg:w-[350px] md:h-[200px] object-cover"
                />
              ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="mt-4 relative flex flex-col md:flex-row lg:flex-row gap-2 items-center justify-center ">
      {place.addedPhotos && place.addedPhotos.length > 0 ? (
        <>
          <img
            src={`http://localhost:4000${place.addedPhotos[0]}`}
            alt={`Photo of ${place.title}`}
            onClick={() => {
              setShowMore(true);
            }}
            className="w-full cursor-pointer h-[320px] lg:h-[391px] lg:w-[550px] md:w-[400px] md:h-[330px] object-cover rounded-s-lg"
          />
          <div className="gap-2 cursor-pointer hidden md:grid grid-cols-2 md:grid-cols-2 ">
            <img
              src={`http://localhost:4000${place.addedPhotos[1]}`}
              alt={`Photo of ${place.title}`}
              onClick={() => {
                setShowMore(true);
              }}
              className="w-full lg:h-[191px] lg:w-[250px] md:w-[200px] md:h-[161px] object-cover  "
            />
            <img
              src={`http://localhost:4000${place.addedPhotos[2]}`}
              alt={`Photo of ${place.title}`}
              onClick={() => {
                setShowMore(true);
              }}
              className="w-full lg:h-[191px] lg:w-[250px] md:w-[200px] md:h-[161px] object-cover rounded-e-lg  "
            />
            <img
              src={`http://localhost:4000${place.addedPhotos[3]}`}
              alt={`Photo of ${place.title}`}
              onClick={() => {
                setShowMore(true);
              }}
              className="w-full lg:h-[191px] lg:w-[250px] md:w-[200px] md:h-[161px] object-cover "
            />

            <img
              src={`http://localhost:4000${place.addedPhotos[4]}`}
              alt={`Photo of ${place.title}`}
              onClick={() => {
                setShowMore(true);
              }}
              className="w-full lg:h-[191px] lg:w-[250px] md:w-[200px] md:h-[161px] object-cover rounded-e-lg  "
            />
          </div>
          <button
            type="button"
            className="p-1 flex gap-1 items-center px-3 absolute right-2 bottom-2 bg-white text-black text-[.7em] rounded-md"
            onClick={() => setShowMore(true)}
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
