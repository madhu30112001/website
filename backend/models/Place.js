import mongoose from "mongoose";

const placescheme = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Users",required:true },
  title: String,
  address: String,
  addedPhotos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: Number,
  checkOut: Number,
  maxGuests: Number,
  price: Number,
});

const placeModel =
  mongoose.models.places || mongoose.model("places", placescheme);

export default placeModel;
