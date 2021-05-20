import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import SigninRequestData from "../models/signinRequestData";
import SignupRequestData from "../models/signupRequestData";
import User from "../models/user";
import {
    getUser as getUserService,
    signup as signupService,
    signin as signinService,
    logout as logoutService
} from "../services/authService";

export interface AuthState {
    userInfo: User | null;
}

const initialState: AuthState = {
    userInfo: null
};

const sliceName = "auth";

export const getUser = createAsyncThunk(
    `${sliceName}/getUser`,
    async (_, thunkApi) => {
        const user = await getUserService();
        return thunkApi.dispatch(setUser(user));
    }
);

export const signUp = createAsyncThunk(
    `${sliceName}/signUp`,
    async (data: SignupRequestData, thunkApi) => {
        await signupService(data);

        return thunkApi.dispatch(getUser());
    }
);

export const signIn = createAsyncThunk(
    `${sliceName}/signIn`,
    async (data: SigninRequestData, thunkApi) => {
        await signinService(data);

        return thunkApi.dispatch(getUser());
    }
);

export const logout = createAsyncThunk(
    `${sliceName}/logout`,
    async (_, thunkApi) => {
        await logoutService();

        return thunkApi.dispatch(clearUser());
    }
);

const authSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        clearUser(state) {
            state.userInfo = null;
        },
        setUser(state, action: PayloadAction<User>) {
            if (typeof action.payload.avatar === "string") {
                action.payload.avatar = `https://ya-praktikum.tech/api/v2/resources${action.payload.avatar }`;
            }
            state.userInfo = action.payload;
        },
    }
});

export const { setUser, clearUser }  = authSlice.actions;

export default authSlice.reducer;
