import DataFieldError from "../models/errors/dataFieldError";
import SignupRequestData from "../models/signupRequestData";
import SigninRequestData from "../models/signinRequestData";
import UserRequestData from "../models/userRequestData";
import { fromSnakeCaseString } from "../utils/fromSnakeCase";
import HTTPTransport from "../utils/http/http";
import HttpError from "../utils/http/httpError";
import toSnakeCase from "../utils/toSnakeCase";
import { getApiBaseUrl } from "./apiSettings";

const http: HTTPTransport = new HTTPTransport(getApiBaseUrl());

export default class AuthAPI {

    async signup(data: SignupRequestData): Promise<{ id: number }> {
        try {
            return await http.post<{ id: number}>(
                "/auth/signup",
                { data: toSnakeCase(data) }
            );
        }
        catch (e) {
            const error = AuthAPI._processError(e);

            throw error;
        }
    }

    async signin(data: SigninRequestData): Promise<string> {
        try {
            return await http.post<string>(
                "/auth/signin",
                { data: toSnakeCase(data) }
            );
        }
        catch (e) {
            const error = AuthAPI._processError(e);

            throw error;
        }
    }

    async user(): Promise<UserRequestData> {
        try {
            return await http.get<UserRequestData>(
                "/auth/user"
            );
        }
        catch (e) {
            const error = AuthAPI._processError(e);

            throw error;
        }
    }

    private static _processError(e: Error): Error {
        if (e instanceof HttpError) {

            // тут нужно попытаться получить имя поля
            if ("error" in e.response && e.response.error.toLowerCase() === "bad format") {
                const fieldNameExec = /^([a-z_]+)\s/.exec(e.response.reason);

                if (fieldNameExec) {
                    return new DataFieldError(
                        "Некорректное значение",
                        fromSnakeCaseString(fieldNameExec[1])
                    );
                }
            }
            else if ("reason" in e.response) {

                let errorText;

                switch (e.response.reason.toLowerCase()) {
                    case "login already exists":
                        errorText = "Логин уже используется";
                        break;
                    case "email already exists":
                        errorText = "Email уже используется";
                        break;
                    case "user already in system":
                        errorText = "Пользователь уже в системе";
                        break;
                    case "login or password is incorrect":
                        errorText = "Введен неверный логин или пароль";
                        break;
                    case "cookie is not valid":
                        errorText = "Необходима авторизация";
                        break;
                    default:
                        errorText = e.response.reason;
                }

                return new Error(errorText);
            }
        }

        return e;
    }
}
