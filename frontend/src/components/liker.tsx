import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../store/AuthContext';
import { ThumbsUp } from 'lucide-react';

interface LikeButtonProps {
  postId: string;
  className?: string;
}

const Liker = ({ postId, className = '' }: LikeButtonProps) => {
  const { isLoggedIn, token, user } = useContext(AuthContext);
  const [reactionCount, setReactionCount] = useState<number>(0);
  const [hasReacted, setHasReacted] = useState<boolean>(false);

  console.log(reactionCount, 'ppppppppppppppppppppppp');
  // Fetch reactions when component mounts or postId/user changes
  useEffect(() => {
    const fetchReactions = async () => {
      try {
        const API_BASE =
          import.meta.env.VITE_API_URL ||
          'https://silentpost-server.onrender.com';
        const response = await axios.get(`${API_BASE}/api/posts/${postId}`);

        // Update both reaction count and user's reaction status
        setReactionCount(response.data.reactions.length);
        setHasReacted(response.data.reactions.includes(user?._id));
      } catch (error) {
        console.error('Error fetching reactions:', error);
      }
    };

    fetchReactions();
  }, [postId, user?._id]); // Removed reactionCount from dependencies

  const handleToggleReaction = async () => {
    if (!isLoggedIn || !token) return;

    try {
      const API_BASE =
        import.meta.env.VITE_API_URL ||
        'https://silentpost-server.onrender.com';
      const res = await axios.post(
        `${API_BASE}/api/posts/${postId}/toggle-reaction`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: false,
        },
      );

      // Update state based on server response
      setReactionCount(res.data.reactionsCount);
      setHasReacted(res.data.reacted);

      // Force refresh of reactions data
      const refreshResponse = await axios.get(
        `${API_BASE}/api/posts/${postId}`,
      );
      setReactionCount(refreshResponse.data.reactions.length);
      setHasReacted(refreshResponse.data.reactions.includes(user?._id));
    } catch (err) {
      console.error('Error toggling reaction:', err);
    }
  };

  return (
    <div className="flex items-center gap-1" id={postId}>
      <button
        onClick={handleToggleReaction}
        disabled={!isLoggedIn}
        className={`flex items-center gap-1 ${className}`}
      >
        {hasReacted ? (
          <ThumbsUp className="fill-slate-950" size={18} />
        ) : (
          <ThumbsUp size={18} />
        )}
      </button>
      <span className="text-sm">{reactionCount}</span>
    </div>
  );
};

export default Liker;
