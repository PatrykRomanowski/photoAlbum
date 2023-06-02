import {
    createSlice
} from "@reduxjs/toolkit";

const hiddenNavContext = createSlice({
    name: "loginData",
    initialState: {
        showNav: true
    },
    reducers: {
        hidden(state) {
            state.showNav = false;
        },
        show(state) {
            state.showNav = true;
        }
    },
});

export const hiddenNavActions = hiddenNavContext.actions;

export default hiddenNavContext;