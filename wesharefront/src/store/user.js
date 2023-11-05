import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setUser(state, payload) {
      console.log(state, payload);
    },
  },
});

export default userSlice.reducer;
