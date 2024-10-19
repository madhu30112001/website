import express from "express"
import {placecontroller,  getplaces, specificplacedetails, updateExistone, getindexplaces } from "../controllers/placeController.js"
const placerouter=express.Router()
placerouter.post("/places",placecontroller)
placerouter.get("/places",getplaces)
placerouter.get("/places/:id",specificplacedetails)
placerouter.put("/places/:id",updateExistone)
placerouter.get("/places/index",getindexplaces)

export default placerouter