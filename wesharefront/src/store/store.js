import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./postSlice";
import userSlice from "./userSlice";
import uiSlice from "./uiSlice";

const store = configureStore({
  reducer: {
    post: postSlice,
    user: userSlice,
    ui: uiSlice,
  },
});

export default store;
