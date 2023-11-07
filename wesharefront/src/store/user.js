import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: window.localStorage.getItem("user"),
  message: null,
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    signInUser(state, action) {
      return (state = {
        ...state,
        user: action.payload,
        message: "in",
      });
    },
    logoutUser(state, action) {
      return (state = {
        ...state,
        user: action.payload,
        message: "out",
      });
    },
  },
});

export const { signInUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
