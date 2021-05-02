import User from "../models/user";
import UserProfile from "../models/userProfile";
import { fromSnakeCase } from "../utils/fromSnakeCase";
import toSnakeCase from "../utils/toSnakeCase";
import { BaseApi } from "./baseApi";

export default class UserAPI extends BaseApi {

    async changePassword(oldPassword: string, newPassword: string): Promise<unknown> {
        try {
            return await this._http.put(
                "/user/password",
                {
                    data: { oldPassword, newPassword }
                }
            );
        }
        catch (e) {
            const error = this._processError(e);

            throw error;
        }
    }

    async changeProfile(data: UserProfile): Promise<User> {
        try {
            return await this._http.put<User>(
                "/user/profile",
                {
                    data: toSnakeCase(data),
                    responseTransformer: fromSnakeCase
                }
            );
        }
        catch (e) {
            const error = this._processError(e);

            throw error;
        }
    }

    protected _processApiErrorTexts(apiErrorReason: string): string | null {
        switch (apiErrorReason.toLowerCase()) {
            case "password is incorrect":
                return "Неверно указан старый пароль";
            case "login already exists":
                return "Логин уже используется";
            case "email already exists":
                return "Email уже используется";
            default:
                return null;
        }
    }
}
