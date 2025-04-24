import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";  // for logging requests
import connectDB from "./config/db.js";

dotenv.config();
connectDB(); // 🔗 MongoDB connected from config/db.js

const app = express();

// CORS options
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://silentpost-client.vercel.app"
  ],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
};

app.use(cors(corsOptions));
app.use(morgan("tiny")); // Logger

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// API routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Serve static files from frontend
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Wildcard route for SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

export default app;
