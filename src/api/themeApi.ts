import User from "../models/user";
import { BaseApi } from "./baseApi";

interface ThemeData {
    themeId: number,
    userId: number
}

export default class ThemeApi extends BaseApi {
    constructor() {
        super(true);
    }

    async getUserTheme(id: number): Promise<unknown> {
        try {
            return await this._http.get(
                "/theme",
                {
                    data: { id }
                }
            );
        }
        catch (e) {
            const error = this._processError(e);

            throw error;
        }
    }

    async changeTheme(data: ThemeData): Promise<User> {
        try {
            return await this._http.put<User>(
                "/theme",
                {
                    data: { data }
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
            case "cannot create theme":
                return "Не удалось создать тему";
            case "cannot update theme":
                return "Не удалось обновить тему";
            case "cannot get theme":
                return "Не удалось получить тему";
            default:
                return null;
        }
    }
}
