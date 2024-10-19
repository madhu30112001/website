import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/Users.js";

//user registration

const registeruser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //checking user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "user already exists" });
    }
    //validate email and strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "please enter valid email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "please enter strong password",
      });
    }
    // hashing the password
    const bcryptsalt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, bcryptsalt);
    const newuser = await userModel.create({
      name,
      email,
      password: hashedpassword,
    });
    const user = await newuser.save();
    const token = createToken(user._id);
    res
      .cookie("token", token)
      .json({ success: true, message: "user registered successfully" });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error Occured in registration",
    });
  }
};

// user login

const loginuser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userlogin = await userModel.findOne({ email });
    if (!userlogin) {
      return res.json({ success: false, message: "user doesn't exist" });
    }
    const isMatched = await bcrypt.compare(password, userlogin.password);
    if (!isMatched) {
      return res.json({ success: false, message: "invalid creds" });
    }

    const token = createToken(userlogin._id, userlogin.email);
    // res.json({ success: true,token,message:"user logged In Successfully" });
    res
      .cookie("token", token, {
        httpOnly: true, // Prevents client-side JavaScript from accessing the token
        secure: process.env.NODE_ENV === "production", // Ensures the token is only sent over HTTPS
        sameSite: "Strict", // Prevents CSRF attacks by not sending the token with cross-site requests
      })
      .json({
        success: true,
        message: "user logged In Successfully",
        token,
        userlogin,
      });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Occured in login" });
  }
};
//token creation
const createToken = (id, email) => {
  return jwt.sign({ id, email}, process.env.JWT_SECRET,
  //    {
  //   expiresIn: "2d",
  // }
);
};

// const LogOut=(req,res)=>{
//   if (req.session) {
//     req.session.destroy((err) => {
//       if (err) {
//         console.error("Failed to destroy session during logout", err);
//         return res.status(500).json({ message: "Logout failed" });
//       }
//       res.clearCookie("token"); // Clear the token cookie, adjust the name if necessary
//       res.status(200).json({ message: "Logout successful" });
//     });
//   } else {
//     res.status(400).json({ message: "No session found to log out" });
//   }
//}
export { registeruser, loginuser};
