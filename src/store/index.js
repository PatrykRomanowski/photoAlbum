import {
  configureStore
} from "@reduxjs/toolkit";

import loginContext from "./login-context";
import albumContext from "./album-context";
import hiddenNavContext from "./hiddenNav-context";

const store = configureStore({
  reducer: {
    login: loginContext.reducer,
    album: albumContext.reducer,
    showHiddenNav: hiddenNavContext.reducer,
  },
});

export default store;