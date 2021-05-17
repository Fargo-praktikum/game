import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
    isOnline: boolean;
}

const initialState: AppState = {
    isOnline: navigator?.onLine
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
