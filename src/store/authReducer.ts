import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import AuthAPI from "../api/authApi";
import UserAPI from "../api/userApi";
import User from "../models/user";
import {
    getUser as getUserService,
    signup as signupService,
    // signin as signinService,
    logout as logoutService
} from "../services/authService";
import SigninRequestData from "../models/signinRequestData";
import SignupRequestData from "../models/signupRequestData";
import ChangePasswordRequestData from "../models/changePasswordRequestData";

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
        try {
            await authApi.signin(data);
            return thunkApi.dispatch(getUser());
        }
        catch (e) {
            console.log(e);
            // debugger
            throw e;
        }
    }
);

export const logout = createAsyncThunk(
    `${sliceName}/logout`,
    async (_, thunkApi) => {
        await logoutService();

        return thunkApi.dispatch(clearUser());
    }
);

export const changePassword = createAsyncThunk(
    `${sliceName}/changePassword`,
    async (data: ChangePasswordRequestData) => {
        const { oldPassword, newPassword } = data;

        return await usersApi.changePassword(oldPassword, newPassword);
    }
);
