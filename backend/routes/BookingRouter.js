import express, { Router } from "express"
import {Booking,  getBookings } from "../controllers/BookingController.js"
const BookRouter=express.Router()

BookRouter.post("/bookplace",Booking)
BookRouter.get("/getbookings",getBookings)
export default BookRouter