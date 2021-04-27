import DataFieldError from "../models/errors/data-field-error";
import SignupRequestData from "../models/signup-request-data";
import { fromSnakeCaseString } from "../utils/from-snake-case";
import HTTPTransport from "../utils/http/http";
import HttpError from "../utils/http/http-error";
import toSnakeCase from "../utils/to-snake-case";
import { getApiBaseUrl } from "./api-settings";

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
                    default:
                        errorText = e.response.reason;
                }

                return new Error(errorText);
            }
        }

        return e;
    }
}
