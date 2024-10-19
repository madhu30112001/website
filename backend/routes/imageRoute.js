import express from "express"
import { deleteimage, fileUpload, imageUpload, upload } from "../controllers/ImageUpload.js"
const imageRouter=express.Router()
imageRouter.post('/uploadlink',imageUpload)
imageRouter.post('/fileupload',upload.array("files"),fileUpload)
imageRouter.delete('/delete',deleteimage)
export default imageRouter