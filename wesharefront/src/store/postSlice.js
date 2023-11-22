import { createSlice } from "@reduxjs/toolkit";

import { getPosts, likePost } from "../services/postservices";

const postSlice = createSlice({
  name: "post",
  initialState: [],
  reducers: {
    initializePosts(state, action) {
      return (state = action.payload);
    },
    updatePost(state, action) {
      const updatedPost = action.payload;

      return (state = state.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      ));
    },
  },
});

export const fetchPosts = () => {
  return async (dispatch) => {
    const posts = await getPosts();
    console.log(posts);
    dispatch(initializePosts(posts));
  };
};

export const handleLike = (id, data) => {
  return async (dispatch) => {
    const updatedPost = await likePost(id, data);
    console.log(updatedPost);
    dispatch(updatePost(updatedPost));
  };
};

export const { initializePosts, updatePost } = postSlice.actions;
export default postSlice.reducer;
