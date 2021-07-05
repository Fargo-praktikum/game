import UserAPI from "../api/userApi";

const usersApi: UserAPI = new UserAPI();

export async function getUserById(id: number) {
    const user = await usersApi.getUserById(id);
    return user;
}
