import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    signInUser(state, action) {
      return (state = action.payload);
    },
  },
});

export const { signInUser } = userSlice.actions;
export default userSlice.reducer;
