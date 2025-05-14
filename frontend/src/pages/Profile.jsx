import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../store/AuthContext';
import axios from 'axios';
import { MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';
import ConfirmModal from '../components/ConfirmModal.jsx';

const Profile = () => {
  const { user, token } = useContext(AuthContext);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await axios.get(
          `https://silentpost-server.onrender.com/api/posts/user/${user._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setUserPosts(res.data.posts);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchUserPosts();
  }, [user, token]);

  const confirmDelete = (postId) => {
    setPostToDelete(postId); // Set the post to be deleted
    setShowModal(true); // Show the modal
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(
        `https://silentpost-server.onrender.com/api/posts/${postToDelete}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setUserPosts((prev) => prev.filter((post) => post._id !== postToDelete));
      toast.success('🗑️ Post deleted successfully!');
    } catch (err) {
      toast.error('❌ Failed to delete post.');
    } finally {
      setShowModal(false);
      setPostToDelete(null);
    }
  };

  if (!user) return <p>Loading user data...</p>;

  return (
    <div className="container mt-4">
      <h2>👤 {user.name}'s Profile</h2>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <hr />
      <h4>📚 Your Posts</h4>

      {/* Show loading message while posts are being fetched */}
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <>
          {userPosts.length === 0 ? (
            <p>You haven't posted anything yet.</p>
          ) : (
            userPosts.map((post) => (
              <div
                key={post._id}
                className="card mb-3 p-3 post-card relative"
                style={{ position: 'relative' }}
              >
                <h5>{post.title}</h5>
                <p>{post.body}</p>

                {/* Delete Button */}
                <button
                  className="post-delete-btn hidden absolute top-2 right-2"
                  onClick={() => confirmDelete(post._id)}
                >
                  <MdDeleteForever size={20} />
                </button>
              </div>
            ))
          )}
        </>
      )}
      <ConfirmModal
        isOpen={showModal}
        title="Delete Post?"
        message="Are you sure you want to delete this post? This cannot be undone."
        onConfirm={handleDeletePost}
        onCancel={() => {
          setShowModal(false);
          setPostToDelete(null);
        }}
      />
    </div>
  );
};

export default Profile;
