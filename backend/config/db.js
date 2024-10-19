import mongoose from "mongoose";

export const connectdb=async()=>{
    (await mongoose.connect('your mongo db uri').then(()=>console.log("DB Connected")));

    
}