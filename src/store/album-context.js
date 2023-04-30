import { createSlice } from "@reduxjs/toolkit";

const albumContext = createSlice({
  name: "albumData",
  initialState: { actualAlbumID: "" },
  reducers: {
    setActualID(state, action) {
      state.actualAlbumID = action.payload.value;
    },
  },
});

export const albumActions = albumContext.actions;

export default albumContext;
