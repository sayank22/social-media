import React, { useContext } from 'react';
import { PostListContext } from '../store/post-list-store';
import InfiniteMenu from '../lib/ui/infinitemenu';

export function InfinitePosts() {
  const { postList, loading } = useContext(PostListContext);

  const formattedItems = React.useMemo(() => {
    return postList.map(
      (post: { photo: any; _id: any; title: any; body: string }) => ({
        image: post.photo || 'https://picsum.photos/300/300?grayscale',
        link: `${post._id}`,
        title: post.title,
        description: post.body.substring(0, 1000) + '...',
      }),
    );
  }, [postList, loading]);

  return (
    <div className="post-list-container">
      <InfiniteMenu items={formattedItems} />
    </div>
  );
}
