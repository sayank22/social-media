import { createContext, useReducer } from "react";

// Create context
export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

// Reducer function
const postListReducer = (currPostList, action) => {
  if (action.type === "DELETE_POST") {
    return currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_POST") {
    return [action.payload, ...currPostList];
  }
  return currPostList;
};

// Provider component
const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST
  );

  const addPost = (post) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: post,
    });
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };

  return (
    <PostList.Provider value={{ postList, addPost, deletePost }}>
      {children}
    </PostList.Provider>
  );
};

// Default posts
const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "Going to Mumbai",
    body: `Hi friends, I'm going to Mumbai for vacations.`,
    reactions: 2,
    userId: "user-9",
    tags: ["vacation", "mumbai", "enjoy"],
  },
  {
    id: "2",
    title: "Passed",
    body: `Passed my B.Tech degree!`,
    reactions: 5,
    userId: "user-3",
    tags: ["graduating", "happy"],
  },
];

export default PostListProvider;
