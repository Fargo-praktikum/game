import DataFieldError from "../models/errors/dataFieldError";
import { fromSnakeCaseString } from "../utils/fromSnakeCase";
import HTTPTransport from "../utils/http/http";
import HttpError from "../utils/http/httpError";
import { getApiBaseUrl } from "./apiSettings";

export abstract class BaseApi {
    constructor() {
        this._http = new HTTPTransport(getApiBaseUrl());
    }

    protected _http: HTTPTransport;

    protected _processError(e: Error): Error {
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

                const errorText = this._processApiErrorTexts(e.response.reason) ?? e.response.reason;

                return new Error(errorText);
            }
        }
        else if (e instanceof TypeError && e.message.toLowerCase() === "failed to fetch") {
            return new Error("Не удалось отправить запрос");
        }

        return e;
    }

    protected abstract _processApiErrorTexts(apiErrorReason: string): string | null;
}
