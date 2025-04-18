import { createContext, useReducer, useEffect } from "react";

// Create context
export const PostListContext = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

// Reducer function
const postListReducer = (currPostList, action) => {
  switch (action.type) {
    case "SET_POSTS":
      return action.payload;
    case "ADD_POST":
      return [action.payload, ...currPostList];
    case "DELETE_POST":
      return currPostList.filter((post) => post._id !== action.payload.postId);
    default:
      return currPostList;
  }
};

// Get API base URL from environment
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Provider component
const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/posts`);
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        dispatchPostList({ type: "SET_POSTS", payload: data });
      } catch (err) {
        console.error("Failed to fetch posts", err);
      }
    };

    fetchPosts();
  }, []);

  const addPost = async (post) => {
    try {
      const res = await fetch(`${API_BASE}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      if (!res.ok) throw new Error("Failed to add post");

      const savedPost = await res.json();
      dispatchPostList({ type: "ADD_POST", payload: savedPost });
    } catch (err) {
      console.error("Failed to add post", err);
    }
  };

  const deletePost = async (postId) => {
    try {
      const res = await fetch(`${API_BASE}/api/posts/${postId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete post");

      dispatchPostList({ type: "DELETE_POST", payload: { postId } });
    } catch (err) {
      console.error("Failed to delete post", err);
    }
  };

  return (
    <PostListContext.Provider value={{ postList, addPost, deletePost }}>
      {children}
    </PostListContext.Provider>
  );
};

export default PostListProvider;
