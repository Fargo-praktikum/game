import AuthAPI from "../api/authApi";
import SignupRequestData from "../models/signupRequestData";
import SigninRequestData from "../models/signinRequestData";
import store from "../store/store";
import { setUser, clearUser } from "../store/authReducer";

const authApi: AuthAPI = new AuthAPI();

export async function signup(data: SignupRequestData): Promise<void> {
    await authApi.signup(data);

    await getUserAndSetToStore();
}

export async function signin(data: SigninRequestData): Promise<void> {
    await authApi.signin(data);

    await getUserAndSetToStore();
}

export async function getUserAndSetToStore(): Promise<void> {
    const user = await authApi.getUser();
    const userInfo = setUser(user);
    store.dispatch(userInfo);
}

export async function logout(): Promise<void> {
    await authApi.logout();

    // TODO после нормльной типизации стора сделать тут просто передачу null
    const userInfo = clearUser();
    store.dispatch(userInfo);
}
