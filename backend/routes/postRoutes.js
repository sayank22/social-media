import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { createPost, getAllPosts, deletePost, getPostById, toggleReaction, getPostsByUser } from "../controllers/postController.js";

const router = express.Router();

// Public routes
router.get("/", getAllPosts);
router.get("/:id", verifyToken, getPostById);
router.get("/user/:userId", verifyToken, getPostsByUser);


// Protected routes
router.post("/", verifyToken, createPost);
router.delete("/:id", verifyToken, deletePost); // User can delete only their own post

router.post("/:id/toggle-reaction", verifyToken, toggleReaction);
export default router;
