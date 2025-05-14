import { useContext, useEffect, useState } from 'react';
import { PostListContext } from '../store/post-list-store';
import { MdDeleteForever } from 'react-icons/md';
import { AuthContext } from '../store/AuthContext';
import axios from 'axios';

const Post = ({ post, canDelete = false }) => {
  const { deletePost } = useContext(PostListContext);
  const { isLoggedIn, token, user } = useContext(AuthContext);

  const [reactionCount, setReactionCount] = useState(
    post.reactions?.length || 0,
  );
  const [hasReacted, setHasReacted] = useState(false);

  useEffect(() => {
    if (user && post.reactions?.includes(user._id)) {
      setHasReacted(true);
    }
  }, [post.reactions, user]);

  const handleToggleReaction = async () => {
    if (!token) {
    }

    try {
      const API_BASE =
        import.meta.env.VITE_API_URL ||
        'https://silentpost-server.onrender.com';

      const res = await axios.post(
        `${API_BASE}/api/posts/${post._id}/toggle-reaction`,

        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: false,
        },
      );

      setReactionCount(res.data.reactionsCount);
      setHasReacted(res.data.reacted);
    } catch (err) {}
  };

  return (
    <div className="card post-card">
      <div className="card-body">
        <h5 className="card-title d-flex justify-content-between align-items-center">
          {post.title}
          {canDelete && (
            <span
              className="badge rounded-pill bg-danger"
              onClick={() => deletePost(post._id)}
              style={{ cursor: 'pointer' }}
              aria-label="Delete post"
            >
              <MdDeleteForever />
            </span>
          )}
        </h5>

        {post.photo && (
          <img
            src={post.photo}
            alt={post.title || 'Post image'}
            style={{
              maxWidth: '100%',
              height: '400px',
              borderRadius: '8px',
              marginBottom: '1rem',
            }}
          />
        )}

        <p className="card-text">{post.body}</p>

        {Array.isArray(post.tags) && post.tags.length > 0 ? (
          post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-sky-500 text-indiogo-900 text-xs font-bold mr-2 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))
        ) : (
          <span className="inline-block bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
            No tags
          </span>
        )}

        {isLoggedIn && (
          <button
            onClick={handleToggleReaction}
            className={`mt-2 px-3 py-1 rounded text-white transition ${
              hasReacted
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-gray-400 text-gray-800 hover:bg-gray-500'
            }`}
          >
            {hasReacted ? (
              <span role="img" aria-label="fire" className="text-xl">
                🔥
              </span>
            ) : (
              <span role="img" aria-label="thumbs-up" className="text-xl">
                👍
              </span>
            )}{' '}
            {reactionCount}
          </button>
        )}
      </div>
    </div>
  );
};

export default Post;
