import { createSlice } from "@reduxjs/toolkit";

import {
  commentPost,
  createPost,
  getPosts,
  likePost,
} from "../services/postservices";
import { setError, setLoading } from "./uiSlice";

const postSlice = createSlice({
  name: "post",
  initialState: [],
  reducers: {
    initializePosts(state, action) {
      return (state = action.payload);
    },
    createNewPost(state, action) {
      return (state = [action.payload, ...state]);
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
    try {
      dispatch(setLoading(true));
      let posts = await getPosts();
      posts = posts.reverse();
      console.log(posts);
      dispatch(initializePosts(posts));
      dispatch(setLoading(null));
      dispatch(setError(null));
    } catch (error) {
      console.log(error, "here");
      dispatch(setLoading(null));
      if (error.response) {
        dispatch(setError("something went wrong"));
      } else {
        dispatch(setError(error.message));
      }
    }
  };
};

export const handleCreatePost = (data) => {
  return async (dispatch) => {
    const post = await createPost(data);
    console.log(post);
    dispatch(createNewPost(post));
  };
};

export const handleLike = (id, data) => {
  return async (dispatch) => {
    const updatedPost = await likePost(id, data);
    console.log(updatedPost);
    dispatch(updatePost(updatedPost));
  };
};

export const handleComment = (id, data) => {
  return async (dispatch) => {
    const updatedPost = await commentPost(id, data);
    dispatch(updatePost(updatedPost));
  };
};

export const { initializePosts, updatePost, createNewPost } = postSlice.actions;
export default postSlice.reducer;
