import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { createPost, getAllPosts, deletePost, getPostById } from "../controllers/postController.js";

const router = express.Router();

// Public routes
router.get("/", getAllPosts);
router.get("/:id", verifyToken, getPostById);

// Protected routes
router.post("/", verifyToken, createPost);
router.delete("/:id", verifyToken, deletePost); // User can delete only their own post

export default router;
