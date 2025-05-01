import Post from "../models/postModel.js";
import mongoose from "mongoose";

// Utility for sending error responses
const sendErrorResponse = (res, message, statusCode = 500) => {
  return res.status(statusCode).json({ message });
};

// Create Post Function
export const createPost = async (req, res) => {
  try {
    const { title, body, tags, photo } = req.body;

    // Validate input
    if (!title || !body || !tags) {
      return sendErrorResponse(res, "Title, body, and tags are required", 400);
    }

    const newPost = new Post({
      title,
      body,
      tags,
      photo,
      userId: req.userId,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    sendErrorResponse(res, "Failed to create post");
  }
};

// Get All Posts Function
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    sendErrorResponse(res, "Failed to fetch posts");
  }
};

// Get Post by ID Function
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return sendErrorResponse(res, "Post not found", 404);
    res.json(post);
  } catch (err) {
    sendErrorResponse(res, "Failed to fetch post");
  }
};

// Delete Post Function
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return sendErrorResponse(res, "Post not found", 404);

    // Check if the post belongs to the user
    if (post.userId.toString() !== req.userId)
      return sendErrorResponse(res, "You can delete only your own posts", 403);

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    sendErrorResponse(res, "Server error");
  }
};

// Toggle Reaction Function
export const toggleReaction = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const hasReacted = post.reactions?.some(
      (id) => id.toString() === userId
    );

    if (hasReacted) {
      post.reactions = post.reactions.filter(
        (id) => id.toString() !== userId
      );
    } else {
      post.reactions.push(userId);
    }

    post.markModified("reactions");

    const updatedPost = await post.save({ validateBeforeSave: false });

    res.status(200).json({
      reactionsCount: updatedPost.reactions.length,
      reacted: !hasReacted,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to toggle reaction", error: err.message });
  }
};

// ✅ Get Posts by Logged-in User
export const getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json({ message: "Error fetching user posts" });
  }
};
