import { createSlice } from "@reduxjs/toolkit";
import { signUser } from "../services/userservices";
import { setTocken } from "../services/postservices";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    initializeUser(state, action) {
      return (state = action.payload);
    },
  },
});

export const SignInUser = (data) => {
  return async (dispatch) => {
    const user = await signUser(data);
    const userToStore = { tocken: user.tocken };
    window.localStorage.setItem("user", JSON.stringify(userToStore));
    const userData = window.localStorage.getItem("user");
    setTocken(user.tocken);
    dispatch(initializeUser(userData));
  };
};

export const { initializeUser } = userSlice.actions;
export default userSlice.reducer;
