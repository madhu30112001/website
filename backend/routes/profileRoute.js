import express from "express"
import {logout, profile} from "../controllers/profileController.js"
const profileRouter=express.Router()
profileRouter.get("/profile",profile)
profileRouter.post("/logout",logout)
export default profileRouter