import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    },
    cartData: {
        type: Map,
        of: Number,
        default: {}
    },},{minimize:false})

const userModel = mongoose.model.users || mongoose.model("users", userSchema);

export default userModel;