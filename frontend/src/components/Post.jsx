import { useContext } from "react";
import { PostListContext } from "../store/post-list-store"; // ✅ FIXED NAME
import { MdDeleteForever } from "react-icons/md";

const Post = ({ post }) => {
  const { deletePost } = useContext(PostListContext); // ✅ FIXED CONTEXT

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

        {post.photo ? (
          <img
            src={post.photo}
            alt={post.title || "Post image"} // More descriptive alt text
            style={{
              maxWidth: "100%",
              height: "400px",
              borderRadius: "8px",
              marginBottom: "1rem",
            }}
          />
        ) : (
          <p className="text-muted"></p> // Fallback text if no photo
        )}

        <p className="card-text">{post.body}</p>

        {Array.isArray(post.tags) && post.tags.length > 0 ? (
          post.tags.map((tag) => (
            <span
              key={tag}
              className="badge rounded-pill text-bg-info hashtag me-1"
            >
              {tag}
            </span>
          ))
        ) : (
          <span className="badge rounded-pill text-bg-secondary">No tags</span> // Fallback text if no tags
        )}
      </div>
    </div>
  );
};

export default Post;
