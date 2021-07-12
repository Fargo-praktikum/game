import SignupRequestData from "../models/signupRequestData";
import SigninRequestData from "../models/signinRequestData";
import User from "../models/user";
import { fromSnakeCase } from "../utils/fromSnakeCase";
import toSnakeCase from "../utils/toSnakeCase";
import { BaseApi } from "./baseApi";
import { appUrl } from "../constants";

export default class AuthAPI extends BaseApi {

    async signup(data: SignupRequestData): Promise<{ id: number }> {
        try {
            return await this._http.post<{ id: number}>(
                "/auth/signup",
                { data: toSnakeCase(data) }
            );
        }
        catch (e) {
            const error = this._processError(e);

            throw error;
        }
    }

    async signin(data: SigninRequestData): Promise<void> {
        try {
            const result = await this._http.post<void>(
                "/auth/signin",
                { data: toSnakeCase(data) }
            );
            return result;
        }
        catch (e) {
            const error = this._processError(e);
            throw error;
        }
    }

    async getUser(): Promise<User> {
        try {
            return await this._http.get<User>(
                "/auth/user",
                { responseTransformer: fromSnakeCase }
            );
        }
        catch (e) {
            const error = this._processError(e);

            throw error;
        }
    }

    logout(): Promise<unknown> {
        return this._http.post(
            "/auth/logout"
        );
    }

    async oauthYandex(code: string): Promise<unknown> {
        return this._http.post(
            "/oauth/yandex",
            {
                data: {
                    code,
                    redirect_uri: appUrl
                }
            }
        );
    }

    async getOauthYandexServiceId(urlFromWindow: string): Promise<string> {
        const data = await this._http.get<{ service_id: string }>(
            "/oauth/yandex/service-id",
            {
                data: {
                    redirect_uri: urlFromWindow
                }
            }
        );

        return data.service_id;
    }

    protected _processApiErrorTexts(apiErrorReason: string): string | null {
        switch (apiErrorReason.toLowerCase()) {
            case "login already exists":
                return "Логин уже используется";
            case "email already exists":
                return "Email уже используется";
            case "user already in system":
                return "Пользователь уже в системе";
            case "login or password is incorrect":
                return "Введен неверный логин или пароль";
            case "cookie is not valid":
                return "Необходима авторизация";
            default:
                return null;
        }
    }
}
