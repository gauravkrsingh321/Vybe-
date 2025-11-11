import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { connectToDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import cors from "cors"
dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000;

//Middlewares
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true
}))
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Routes
app.use('/api/auth',authRoutes)
app.use('/api/user',userRoutes)

// Wait for DB connection before starting the server
const startServer = async () => {
  try {
    await connectToDB();
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
};

startServer();
