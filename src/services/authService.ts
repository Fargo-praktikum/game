import AuthAPI from "../api/authApi";
import SignupRequestData from "../models/signupRequestData";

const authApi: AuthAPI = new AuthAPI();

export async function signup(data: SignupRequestData): Promise<void> {
    await authApi.signup(data);
}
