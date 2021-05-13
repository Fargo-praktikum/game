import UserAPI from "../api/userApi";
import UserProfile from "../models/userProfile";
import { setUserInfoAC } from "../scripts/redux/authReducer";
import store from "../scripts/redux/store";

const usersApi: UserAPI = new UserAPI();

export async function changePassword(oldPassword: string, newPassword: string): Promise<void> {
    await usersApi.changePassword(oldPassword, newPassword);
}

export async function changeUserProfile(data: UserProfile): Promise<void> {
    const user = await usersApi.changeProfile(data);
    const userInfo = setUserInfoAC(user);
    store.dispatch(userInfo);
}

export async function changeUserAvatar(data: FormData): Promise<void> {
    const user = await usersApi.changeAvatar(data);
    const userInfo = setUserInfoAC(user);
    store.dispatch(userInfo);
}
