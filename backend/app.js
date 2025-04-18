import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

// Fix __dirname when using ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Static files - ensure this comes after API routes
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Wildcard route for SPA - this should be the last route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI || process.env.CONNECTION_STRING)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

export default app;