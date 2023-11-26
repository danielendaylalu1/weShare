import { createSlice } from "@reduxjs/toolkit";
import { signUser } from "../services/userservices";
import { setTocken } from "../services/postservices";
import { setError, setLoading } from "./uiSlice";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    initializeUser(state, action) {
      return (state = action.payload);
    },
    logOutUser(state, action) {
      window.localStorage.removeItem("user");
      return (state = action.payload);
    },
  },
});

export const SignInUser = (data) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const user = await signUser(data);
      const userToStore = {
        tocken: user.tocken,
        id: user.user.id,
        name: user.user.username,
      };
      window.localStorage.setItem("user", JSON.stringify(userToStore));
      const userData = window.localStorage.getItem("user");
      setTocken(user.tocken);
      dispatch(initializeUser(userData));
      dispatch(setLoading(null));
    } catch (error) {
      console.log(error);
      dispatch(setLoading(null));
      if (error.response) {
        dispatch(setError(error.response.data.message));
      } else {
        dispatch(setError(error.message));
      }
    }
  };
};

export const { initializeUser, logOutUser } = userSlice.actions;
export default userSlice.reducer;
