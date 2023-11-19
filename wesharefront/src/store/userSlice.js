import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    initializeUser(state, action) {
      return (state = action.payload);
    },
  },
});

export const { initializeUser } = userSlice.actions;
export default userSlice.reducer;
