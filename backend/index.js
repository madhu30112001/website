import express from "express";
import cors from "cors";
import { connectdb } from "./config/db.js";
import "dotenv/config";
import session from "express-session"; 
import cookieParser from "cookie-parser";
import userrouter from "./routes/userRoute.js";
import profileRouter from "./routes/profileRoute.js";
import imageRouter from "./routes/imageRoute.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import placerouter from "./routes/placeroute.js";
import BookRouter from "./routes/BookingRouter.js";
const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);
// Serve the Uploads folder as static files

const app = express();

app.use(express.json());
//db connection
connectdb();
// Configure CORS
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173", // The frontend's origin
  })
);


app.use('/uploads', express.static(path.join(__dirname + '/controllers/Uploads')));

app.use("/api/user", userrouter);
app.use("/api", profileRouter);
app.use('/api/images',imageRouter); // Serve uploaded files
app.use('/api',placerouter)
app.use('/api',BookRouter)

app.get("/", (req, res) => {
  res.send("api is working");
});
// Start the server
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});

// mongodb+srv://madhu:Madhu30042001@cluster0.zxh2m.mongodb.net/?
