import { configureStore } from "@reduxjs/toolkit";

import loginContext from "./login-context";
import albumContext from "./album-context";

const store = configureStore({
  reducer: {
    login: loginContext.reducer,
    album: albumContext.reducer,
  },
});

export default store;
