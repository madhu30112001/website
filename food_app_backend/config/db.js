import mongoose from "mongoose";

// const mongoose = require("mongoose");

export const connectDB = async () => {
  await mongoose.connect('')
    .then(() => {
      console.log('DB connected');
    })
    .catch((error) => {
      console.error('DB connection error:', error);
    });
};

