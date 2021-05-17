import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../models/user";

export interface AuthState {
    userInfo: User | null;
}

const initialState: AuthState = {
    userInfo: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            if (typeof action.payload.avatar === "string") {
                action.payload.avatar = `https://ya-praktikum.tech/api/v2/resources${action.payload.avatar as string}`;
            }
            state.userInfo = action.payload;
        },
        clearUser(state) {
            state.userInfo = null;
        }
    }
});

export const { setUser, clearUser }  = authSlice.actions;

export default authSlice.reducer;
