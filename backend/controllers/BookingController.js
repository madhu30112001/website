import express from "express";
import moment from "moment";
import jwt from "jsonwebtoken";
import BookingModel from "../models/Book.js";

const Booking = async (req, res) => {
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

    // Destructure req.body safely
    const { place, checkIn, checkOut, noOfGuests, name, mobile, price } =
      req.body;

    // Basic validation checks
    if (!place || !checkIn || !checkOut || !name || !mobile) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all required fields: place, checkIn, checkOut, name, mobile.",
      });
    }

    try {
      // Create new booking instance
      const formattedCheckIn = moment(checkIn).format("YYYY-MM-DD HH:mm");
      const formattedCheckOut = moment(checkOut).format("YYYY-MM-DD HH:mm");
      const Bookplace = new BookingModel({
        place,
        checkIn: formattedCheckIn,
        checkOut: formattedCheckOut,
        noOfGuests,
        name,
        mobile,
        price,
        owner: userData.id,
      });

      // Save booking to the database
      const Booked = await Bookplace.save();

      // Send success response
      res.status(201).json({
        success: true,
        data: Booked,
        message: "User booked the place successfully",
      });
    } catch (error) {
      // Log the actual error for debugging
      console.error("Error occurred while booking the place:", error);

      // Send server error response
      res.status(500).json({
        success: false,
        message: "Server error while saving the place",
      });
    }
  });
};



const getBookings=async(req,res)=>{
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
        const getBookings=await BookingModel.find({owner: userData.id }).populate('place')

        res.status(201).json({success:true,data:getBookings,message:"fetched bookings"})
    } catch (error) {
        res.status(500).json({ message: "Error fetching places" });

    }
}
  )}
export {Booking,getBookings};
