import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/AuthContext";
import axios from "axios";

const Profile = () => {
  const { user, token } = useContext(AuthContext);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await axios.get(`/api/posts/user/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserPosts(res.data.posts);
      } catch (err) {
        console.error("Failed to fetch user posts:", err);
      }
    };

    if (user) fetchUserPosts();
  }, [user, token]);

  if (!user) return <p>Loading user data...</p>;

  return (
    <div className="container mt-4">
      <h2>👤 {user.name}'s Profile</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <hr />
      <h4>📚 Your Posts</h4>
      {userPosts.length === 0 ? (
        <p>You haven't posted anything yet.</p>
      ) : (
        userPosts.map((post) => (
          <div key={post._id} className="card mb-3 p-3">
            <h5>{post.title}</h5>
            <p>{post.body}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Profile;
