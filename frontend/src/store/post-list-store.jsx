import { createContext, useReducer, useEffect, useState, useCallback } from "react";
import { toast } from 'react-toastify';

// Default error thrower for context methods
const throwError = () => {
  throw new Error("PostListContext method called outside of provider");
};

// Create context for managing posts
export const PostListContext = createContext({
  postList: [],
  loading: true,
  error: null,
  isAuthenticated: false,
  addPost: throwError,
  refreshPosts: throwError,
});

// Reducer function to manage post state
const postListReducer = (state, action) => {
  switch (action.type) {
    case "SET_POSTS":
      return action.payload;
    case "ADD_POST":
      return [action.payload, ...state]; // Add new post to the top of the list
    default:
      return state;
  }
};

// API config (base URL)
const API_BASE = import.meta.env.VITE_API_URL || "https://silentpost-server.onrender.com";

// Helper function to retrieve token from localStorage
const getToken = () => localStorage.getItem("token");

// Helper function to build Authorization headers for requests
const getAuthHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Provider component for managing posts
const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to fetch posts from the API
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/api/posts`, {
        headers: getAuthHeaders(),
      });

      if (!res.ok) {
        if (res.status === 401) {
          setError("You are not authorized to view these posts.");
        } else {
          const errorData = await res.json();
          setError(errorData.message || "Failed to fetch posts.");
        }
        return;
      }

      const data = await res.json();
      dispatchPostList({ type: "SET_POSTS", payload: data });
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Check if token exists and fetch posts on initial load
  useEffect(() => {
    const token = getToken();
    setIsAuthenticated(!!token); // Set isAuthenticated based on token presence
    fetchPosts();
  }, [fetchPosts]);

  const addPost = useCallback(async (post) => {
    try {
      setError(null);
      const token = getToken();
      if (!token) {
        setError("You must be logged in to add a post.");
        return null;
      }

      const res = await fetch(`${API_BASE}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(post),
      });

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem("token");
          setError("Unauthorized. Please log in.");
          setIsAuthenticated(false);
          return null;
        }

        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to add post");
      }

      const savedPost = await res.json();
      dispatchPostList({ type: "ADD_POST", payload: savedPost });
      return savedPost;
    } catch (err) {
      setError(err.message);
      return null;
    }
  }, []);

  return (
    <PostListContext.Provider
      value={{
        postList,
        loading,
        error,
        isAuthenticated,
        addPost,
        refreshPosts: fetchPosts, // Allow manual refresh
      }}
    >
      {children}
    </PostListContext.Provider>
  );
};

export default PostListProvider;
