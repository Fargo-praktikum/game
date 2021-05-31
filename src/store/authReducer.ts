import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import AuthAPI from "../api/authApi";
import UserAPI from "../api/userApi";

import User from "../models/user";
import SigninRequestData from "../models/signinRequestData";
import SignupRequestData from "../models/signupRequestData";
import ChangePasswordRequestData from "../models/changePasswordRequestData";
import UserProfile from "../models/userProfile";
import { TAppDispatch } from "./store";


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

export const getUser = () => {
    return async (dispatch: TAppDispatch): Promise<PayloadAction<User>> => {
        const user = await authApi.getUser();

        return dispatch(setUser(user));
    };
};

export const signUp = (data: SignupRequestData) => {
    return async (dispatch: TAppDispatch) => {
        await authApi.signup(data);

        return dispatch(getUser());
    };
};

export const signIn = (data: SigninRequestData) => {
    return async (dispatch: TAppDispatch) => {
        await authApi.signin(data);

        return dispatch(getUser());
    };
};

export const logout = () => {
    return async (dispatch: TAppDispatch) => {
        await authApi.logout();

        return dispatch(clearUser());
    };
};

export const changePassword = (data: ChangePasswordRequestData) => {
    return async () => {
        const { oldPassword, newPassword } = data;

        return usersApi.changePassword(oldPassword, newPassword);
    };
};

export const changeUserProfile = (data: UserProfile) => {
    return async (dispatch: TAppDispatch) => {
        const user = await usersApi.changeProfile(data);

        dispatch(setUser(user));
    };
};

export const changeUserAvatar =  (data: FormData) => {
    return async (dispatch: TAppDispatch) => {
        const user = await usersApi.changeAvatar(data);

        dispatch(setUser(user));
    };
};
