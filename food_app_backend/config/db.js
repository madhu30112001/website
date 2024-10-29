import mongoose from "mongoose";

// const mongoose = require("mongoose");

export const connectDB = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/FoodDel')
    .then(() => {
      console.log('DB connected');
    })
    .catch((error) => {
      console.error('DB connection error:', error);
    });
};

