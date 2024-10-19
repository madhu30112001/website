import mongoose from "mongoose";

const BookingSchema=new mongoose.Schema({
    place:{type:mongoose.Schema.Types.ObjectId,ref:'places',required:true},
    owner:{type:mongoose.Schema.Types.ObjectId,ref:'Users'},
    checkIn:{type:String,required:true },
    checkOut:{type:String,required:true },
    noOfGuests:{type:Number},
    name:{type:String,required:true },
    mobile:{type:String,required:true },
    price:{type:Number}
},{ timestamps: true },{
    toObject: { getters: true }
  })

const BookingModel=mongoose.models.Booking||mongoose.model("Booking",BookingSchema)
export default BookingModel