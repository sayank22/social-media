
import React, { useContext } from "react";
import { PostListContext } from "../store/post-list-store";
import { Spinner } from "react-bootstrap";
import Post from "./Post"; // 👈 import Post component

function PostList() {
  const { postList, loading, error } = useContext(PostListContext);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5 text-danger">
        <p>❌ {error}</p>
      </div>
    );
  }

  if (postList.length === 0) {
    return (
      <div className="text-center mt-5">
        <p>No posts found. Be the first to post!</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {postList.map((post) => (
        <Post key={post._id} post={post} /> // 👈 reuse Post component
      ))}
    </div>
  );
}

export default PostList;
