import { configureStore } from "@reduxjs/toolkit";

import loginContext from "./login-context";

const store = configureStore({
  reducer: {
    login: loginContext.reducer,
  },
});

export default store;
