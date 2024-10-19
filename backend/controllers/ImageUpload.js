import express from "express";
import imageDownloader from "image-downloader"; // Assuming you're using the 'image-downloader' package
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import multer from "multer";
import path from "path";
import { log } from "console";
import placeModel from "../models/Place.js";
// To replace __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const imageUpload = async (req, res) => {
  const { link } = req.body;
  
  const uploadDir = `${__dirname}/Uploads`;
  // console.log(uploadDir);
  

  const newName = Date.now() + ".jpg"; // Generates a unique name using timestamp
  const destPath = `${uploadDir}/${newName}`; // Destination folder for the image

  try {
    // Ensure the Uploads directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    // Download the image
    await imageDownloader.image({
      url: link,
      dest: destPath,
    });
    const publicUrl = `/uploads/${newName}`; // Relative path for the image
    res.json({ path: publicUrl });
    
  } catch (error) {
    console.error("Failed to download image:", error);
    res.status(500).json({ error: "Failed to download image" });
  }
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'Uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir); // Save files to the Uploads directory
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() +path.extname(file.originalname); // Unique filename with timestamp
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });
const fileUpload=(req,res)=>{
  try {
    const uploadedFilePath = req.files.map(file => `/uploads/${file.filename}`);
    res.json({ paths: uploadedFilePath });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }  
}

const deleteimage =async (req, res) => {
  const { path: filePath } = req.body;
  
  // Prevent path traversal attacks
  
  const sanitizedPath = path.join(__dirname, 'Uploads', path.basename(filePath));  
  console.log("Attempting to delete:", sanitizedPath);

  
  try {
    // Check if the file exists before trying to delete it
    if (fs.existsSync(sanitizedPath)) {
    // Delete the image from the filesystem
    fs.unlink(sanitizedPath, async (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        return res.status(500).json({ error: "Failed to delete the file." });
      }

      // Delete the record from the database
      await placeModel.deleteOne({ path: filePath }); // Use the relative path stored in the database
      res.status(200).json({ message: "Image deleted successfully." });
    });
  } else {
    console.error("File not found:", sanitizedPath);
    res.status(404).json({ error: "File not found" });
  }}catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: "Failed to delete image." });
  }
}
export { imageUpload,fileUpload,upload ,deleteimage};
