import jwt from "jsonwebtoken";
import userModel from "../models/Users.js";
const profile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userdata) => {
      if (err) throw err;
      const {email,name,_id} = await userModel.findById(userdata.id);
      res.json({email,name,_id});
    });
  } else {
    res.json(null);
  }
};
const logout=(req,res)=>{
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure cookie in production
    sameSite: "Strict", // Prevent CSRF attacks
  });

  res.json({ success: true, message: "Logged out successfully" });}
export { profile,logout };
