import mongoose from "mongoose";

export const connectdb=async()=>{
    (await mongoose.connect('mongodb+srv://madhu:Madhu30042001@cluster0.zxh2m.mongodb.net/booking-app').then(()=>console.log("DB Connected")));

    
}