import { useContext } from "react";
import { PostList } from "../store/post-list-store";
import { MdDeleteForever } from "react-icons/md";

const Post = ({ post }) => {
  const { deletePost } = useContext(PostList);

  return (
    <div className="card post-card" style={{ width: "27rem" }}>
      <div className="card-body">
        <h5 className="card-title d-flex justify-content-between align-items-center">
          {post.title}
          <span
            className="badge rounded-pill bg-danger"
            onClick={() => deletePost(post.id)}
            style={{ cursor: "pointer" }}
          >
            <MdDeleteForever />
          </span>
        </h5>

        {/* Optional image display */}
        {post.photo && (
          <img
            src={post.photo}
            alt="Post"
            style={{
              maxWidth: "100%",
              borderRadius: "8px",
              marginBottom: "1rem",
            }}
          />
        )}

        {/* Post content */}
        <p className="card-text">{post.body}</p>

        {/* Tags display */}
        {Array.isArray(post.tags) &&
          post.tags.map((tag) => (
            <span
              key={tag}
              className="badge rounded-pill text-bg-info hashtag me-1"
            >
              {tag}
            </span>
          ))}

        {/* Reactions button */}
        <button type="button" className="btn btn-primary mt-2">
          Reactions{" "}
          <span className="badge text-bg-secondary">{post.reactions}</span>
        </button>
      </div>
    </div>
  );
};

export default Post;
