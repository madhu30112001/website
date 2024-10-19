import React from "react";

const PlaceImg = ({ place, className }) => {
  return (
    <img
      src={`http://localhost:4000${place.addedPhotos[0]}`}
      alt={`Photo of ${place.title}`}
      className={className}
    />
  );
};

export default PlaceImg;
