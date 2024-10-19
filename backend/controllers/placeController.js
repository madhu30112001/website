import express from "express";
import jwt from "jsonwebtoken";
import placeModel from "../models/Place.js";
import mongoose from "mongoose";
const placecontroller = async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res
      .status(401)
      .json({ error: "No token provided, authorization denied" });
  }

  // Verify the JWT
  jwt.verify(token, process.env.JWT_SECRET, async (err, userData) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }

    const {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body;

    try {
      const newPlace = new placeModel({
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
        owner: userData.id,
      });
      const savedPlace = await newPlace.save();
      res.status(201).json(savedPlace);
      // console.log(savedPlace);
    } catch (error) {
      console.error("Error saving place:", error);
      res.status(500).json({ error: "Server error while saving place" });
    }
  });
};
const getplaces = async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res
      .status(401)
      .json({ error: "No token provided, authorization denied" });
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, userData) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }
    try {
      const places = await placeModel.find({ owner: userData.id });

      res.json(places);
    } catch (error) {
      res.status(500).json({ message: "Error fetching places" });
    }
  });
};
const updateExistone = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPlace = await placeModel.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Validate the updated fields
    });

    if (!updatedPlace) {
      return res.status(404).json({ message: "Place not found" });
    }
    res.status(200).json(updatedPlace);
  } catch (error) {
    console.error("Error updating place:", error);
    res.status(500).json({ message: "Failed to update place" });
  }
};

const specificplacedetails = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid place ID" });
  }
  try {
    const place = await placeModel.findById(id);
    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }
    res.status(200).json(place);
  } catch (error) {
    console.error("Error fetching place:", error);
    res.status(500).json({ message: "Failed to fetch place" });
  }
};

const getindexplaces = async (req, res) => {
  try {
    const places = await placeModel.find();
    res
      .status(200)
      .json({
        status: 200,
        message: "successfully fetched the places data",
        data: places,
      });
  } catch (error) {
    console.error("failed to fetch", error);

    res
      .status(500)
      .json({ status: 500, message: "Failed to fetch the places data" });
  }
};

export {
  getindexplaces,
  placecontroller,
  getplaces,
  updateExistone,
  specificplacedetails,
};
