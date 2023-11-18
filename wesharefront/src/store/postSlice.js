import { createSlice } from "@reduxjs/toolkit";

import { getPosts } from "../services/postservices";

const postSlice = createSlice({
  name: "post",
  initialState: [],
  reducers: {
    initializePosts(state, action) {
      return (state = action.payload);
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

export const { initializePosts } = postSlice.actions;
export default postSlice.reducer;
