import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Global error logging middleware
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

app.use("/api/students", studentRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
