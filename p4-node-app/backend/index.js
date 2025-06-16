import express from "express";
import dotEnv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import connectDB from "./configs/db.js";

//ROUTES
import authRoute from "./routes/authRoute.js";
import dashboardRoute from "./routes/dashboardRoute.js"
import guestDashboardRoute from "./routes/guestDashboardRoute.js"
import productRoute from "./routes/productRoute.js";
import profileRoute from "./routes/profileRoute.js"
import brandRoute from "./routes/brandRoute.js"
import categoryRoute from "./routes/categoryRoute.js"
import wishlistRoute from "./routes/wishlistRoute.js"

dotEnv.config();
const port = process.env.port || 3000;
const app = express();

const allowedOrigins = [
    "http://localhost:5174",
    "https://motohunt-4wzp.onrender.com" //RENDER FRONT END LIVE SITE
];

//DB CONNECTION
connectDB();

//MIDDLEWARE
app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

//ROUTES
app.use("/api/auth", authRoute);
app.use("/api/guest-dashboard", guestDashboardRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/products", productRoute);
app.use("/api/profile", profileRoute);
app.use("/api/brands", brandRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/wishlist", wishlistRoute);

//START SERVER
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})