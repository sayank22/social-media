import { useContext, useEffect, useState } from "react";
import { PostListContext } from "../store/post-list-store";
import { MdDeleteForever } from "react-icons/md";
import { AuthContext } from "../store/AuthContext";
import axios from "axios";

const Post = ({ post }) => {
  console.log("🔄 Post component loaded:", post.title);

  const { deletePost } = useContext(PostListContext);
  const { isLoggedIn, token, user } = useContext(AuthContext);
  console.log("📦 Token from AuthContext:", token);
  
console.log("🧪 AuthContext Test:");
console.log("🔐 isLoggedIn:", isLoggedIn);
console.log("🪪 token:", token);
console.log("👤 user:", user);


  const [reactionCount, setReactionCount] = useState(post.reactions?.length || 0);
  const [hasReacted, setHasReacted] = useState(false);

  useEffect(() => {
    console.log("📌 useEffect running for reactions check");
    if (user && post.reactions?.includes(user._id)) {
      console.log("✅ User has already reacted");
      setHasReacted(true);
    }
  }, [post.reactions, user]);

  const handleToggleReaction = async () => {
    console.log("🟢 Toggling reaction for post:", post._id);
    console.log("📤 Attempting to toggle reaction with token:", token);

    if (!token) {
      console.warn("⚠️ No token found, cannot toggle reaction");
      return;
    }
    console.log("📤 Sending token:", token);

    try {
      console.log("📤 Sending token:", token);
      const API_BASE = import.meta.env.VITE_API_URL || "https://silentpost-server.onrender.com";

const res = await axios.post(
  `${API_BASE}/api/posts/${post._id}/toggle-reaction`,

        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: false,
        }
      );
  
      console.log("✅ Reaction toggle success:", res.data);
  
      setReactionCount(res.data.reactionsCount);
      setHasReacted(res.data.reacted);
    } catch (err) {
      console.error("❌ Reaction toggle failed:", err.response?.data || err.message);
    }
  };  

  return (
    <div className="card post-card">
      <div className="card-body">
        <h5 className="card-title d-flex justify-content-between align-items-center">
          {post.title}
          <span
            className="badge rounded-pill bg-danger"
            onClick={() => deletePost(post._id)}
            style={{ cursor: "pointer" }}
            aria-label="Delete post"
          >
            <MdDeleteForever />
          </span>
        </h5>

        {post.photo && (
          <img
            src={post.photo}
            alt={post.title || "Post image"}
            style={{
              maxWidth: "100%",
              height: "400px",
              borderRadius: "8px",
              marginBottom: "1rem",
            }}
          />
        )}

        <p className="card-text">{post.body}</p>

        {Array.isArray(post.tags) && post.tags.length > 0 ? (
          post.tags.map((tag) => (
            <span key={tag} className="badge rounded-pill text-bg-info hashtag me-1">
              {tag}
            </span>
          ))
        ) : (
          <span className="badge rounded-pill text-bg-secondary">No tags</span>
        )}

        {isLoggedIn && (
          <button
            onClick={handleToggleReaction}
            className={`btn mt-3 ${hasReacted ? "btn-success" : "btn-outline-success"}`}
          >
            {hasReacted ? "Reaction" : "React"} ({reactionCount})
          </button>
        )}
      </div>
    </div>
  );
};

export default Post;
