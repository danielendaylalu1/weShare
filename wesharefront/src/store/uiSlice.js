import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    loading: null,
    error: null,
  },
  reducers: {
    setLoading(state, action) {
      return (state = { ...state, loading: action.payload });
    },
    setError(state, action) {
      return (state = { ...state, error: action.payload });
    },
  },
});

export const { setLoading, setError } = uiSlice.actions;
export default uiSlice.reducer;
