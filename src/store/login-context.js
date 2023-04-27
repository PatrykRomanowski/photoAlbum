import { createSlice } from "@reduxjs/toolkit";

const loginContext = createSlice({
  name: "loginData",
  initialState: { email: "" },
  reducers: {
    login(state, action) {
      state.email = action.payload.value;
    },
    logout(state) {
      state.email = "";
    },
  },
});

export const loginActions = loginContext.actions;

export default loginContext;
