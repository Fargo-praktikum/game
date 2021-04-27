import AuthAPI from "../api/auth-api";
import SignupRequestData from "../models/signup-request-data";

const authApi: AuthAPI = new AuthAPI();

export async function signup(data: SignupRequestData): Promise<void> {
    await authApi.signup(data);
}
