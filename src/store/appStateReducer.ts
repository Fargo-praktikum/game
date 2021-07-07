import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import isServer from "../utils/isServer";

export interface AppState {
    isOnline: boolean;
}

const initialState: AppState = {
    isOnline: isServer || navigator?.onLine
};

const appStateSlice = createSlice({
    name: "appState",
    initialState,
    reducers: {
        setOnline(state, action: PayloadAction<boolean>) {
            state.isOnline = action.payload;
        }
    }
});

export const { setOnline }  = appStateSlice.actions;

export default appStateSlice.reducer;
