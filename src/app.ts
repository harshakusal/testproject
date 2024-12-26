import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";

// Load environment variables
dotenv.config();

// MongoDB connection string for MongoDB Atlas
const mongoUri = process.env.MONGO_URI || "mongodb+srv://harshakusalmayuri:Kp68V7gCMfKeVlT3@cluster0.b8nas.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB Atlas
mongoose.connect(mongoUri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();

// Middleware to parse JSON
app.use(express.json());

// API Routes
app.use("/api/users", userRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
