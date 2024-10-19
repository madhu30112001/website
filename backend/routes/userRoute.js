import express from "express";
import { loginuser, registeruser } from "../controllers/userController.js";
const userrouter = express.Router();
userrouter.post("/register", registeruser);
userrouter.post("/login", loginuser);
// userrouter.post("/logout",LogOut)
export default userrouter;
