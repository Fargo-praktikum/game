import UserAPI from "../api/userApi";
import UserProfile from "../models/userProfile";
import { setUser } from "../store/authReducer";
import store from "../store/store";

const usersApi: UserAPI = new UserAPI();

export async function changePassword(oldPassword: string, newPassword: string): Promise<void> {
    await usersApi.changePassword(oldPassword, newPassword);
}

export async function changeUserProfile(data: UserProfile): Promise<void> {
    const user = await usersApi.changeProfile(data);

    const userInfo = setUser(user);
    store.dispatch(userInfo);
}
