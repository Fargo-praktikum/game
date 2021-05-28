import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import AuthAPI from "../api/authApi";
import UserAPI from "../api/userApi";

import User from "../models/user";
import SigninRequestData from "../models/signinRequestData";
import SignupRequestData from "../models/signupRequestData";
import ChangePasswordRequestData from "../models/changePasswordRequestData";
import UserProfile from "../models/userProfile";


const authApi: AuthAPI = new AuthAPI();
const usersApi: UserAPI = new UserAPI();


export interface AuthState {
    userInfo: User | null;
}

const initialState: AuthState = {
    userInfo: null
};

const sliceName = "auth";

const authSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        clearUser(state) {
            state.userInfo = null;
        },
        setUser(state, action: PayloadAction<User>) {
            if (typeof action.payload.avatar === "string") {
                action.payload.avatar = `https://ya-praktikum.tech/api/v2/resources${action.payload.avatar}`;
            }
            state.userInfo = action.payload;
        },
    }
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;


export const getUser = createAsyncThunk(
    `${sliceName}/getUser`,
    async (_, thunkApi) => {
        try {
            const user = await authApi.getUser();
            return thunkApi.dispatch(setUser(user));
        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    }
);

interface ValidationErrors {
    message: string;
    stack: string;
}

export const signUp = createAsyncThunk<any, any, { rejectValue: ValidationErrors }>(
    `${sliceName}/signUp`,
    async (data: SignupRequestData, thunkApi) => {
        try {
            await authApi.signup(data);
            return thunkApi.dispatch(getUser());
        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    }
);

export const signIn = createAsyncThunk<any, any, { rejectValue: ValidationErrors }>(
    `${sliceName}/signIn`,
    async (data: SigninRequestData, thunkApi) => {
        try {
            await authApi.signin(data);
            return thunkApi.dispatch(getUser());
        } catch (e) {
            // throw e;
            return thunkApi.rejectWithValue(e);
        }
    }
);

export const logout = createAsyncThunk(
    `${sliceName}/logout`,
    async (_, thunkApi) => {
        try {
            await authApi.logout();
            return thunkApi.dispatch(clearUser());
        } catch (e) {
            // throw e;
            return thunkApi.rejectWithValue(e);
        }
    }
);

export const changePassword = createAsyncThunk<any, any, { rejectValue: ValidationErrors }>(
    `${sliceName}/changePassword`,
    async (data: ChangePasswordRequestData, thunkApi) => {
        // в data можно передавать action из компоненты и всю логику здесь прописть например
        const { oldPassword, newPassword } = data;
        try {
            const result = await usersApi.changePassword(oldPassword, newPassword);
            return result;
        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    }
);

export const changeUserProfile = createAsyncThunk<any, any, { rejectValue: ValidationErrors }>(
    `${sliceName}/changeUserProfile`,
    async (data: UserProfile, thunkApi) => {
        try {
            const user = await usersApi.changeProfile(data);
            return thunkApi.dispatch(setUser(user));
        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    }
);

export const changeUserAvatar = createAsyncThunk<any, any, { rejectValue: ValidationErrors }>(
    `${sliceName}/changeUserAvatar`,
    async (data: FormData, thunkApi) => {
        try {
            const user = await usersApi.changeAvatar(data);
            return thunkApi.dispatch(setUser(user));
        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    }
);
