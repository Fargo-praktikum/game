import AuthAPI from "../api/authApi";
import SignupRequestData from "../models/signupRequestData";
import SigninRequestData from "../models/signinRequestData";
import User from "../models/user";

const authApi: AuthAPI = new AuthAPI();

export async function signup(data: SignupRequestData): Promise<void> {
    await authApi.signup(data);
}

export async function signin(data: SigninRequestData): Promise<void> {
    await authApi.signin(data);
}

export async function getUser(): Promise<User> {
    return await authApi.getUser();
}

export async function logout(): Promise<void> {
    await authApi.logout();
}
