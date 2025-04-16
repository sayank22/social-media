import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);

mongoose.connect("mongodb+srv://sayank10023:SKm09042002@cluster0.ulowj.mongodb.net/socialmedia?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.log(err));
