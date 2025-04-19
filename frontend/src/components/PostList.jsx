import React, { useContext } from "react";
import { PostListContext } from "../store/post-list-store";
import { Spinner } from "react-bootstrap";

function PostList() {
  const { postList, loading, error } = useContext(PostListContext);

  // Loading state
  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading posts...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center mt-5 text-danger">
        <p>❌ {error}</p>
      </div>
    );
  }

  // No posts state
  if (postList.length === 0) {
    return (
      <div className="text-center mt-5">
        <p>No posts found. Be the first to post!</p>
      </div>
    );
  }

  // Display posts
  return (
    <div className="container mt-4">
      {postList.map((post) => (
        <div key={post._id} className="card mb-3 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.body}</p>

            {/* Display photo if available */}
            {post.photo && (
              <img
                src={post.photo}
                alt={post.title}
                style={{ width: "50%", borderRadius: "8px", marginBottom: "1rem" }}
              />
            )}

            {/* Display tags if available */}
            {post.tags && post.tags.length > 0 && (
              <div className="tags mt-2">
                {post.tags.map((tag, index) => (
                  <span key={index} className="badge text-bg-info me-1">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;
