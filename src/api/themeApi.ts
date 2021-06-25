import User from "../models/user";
import { OwnServerApi } from "./ownServerApi";

export default class ThemeApi extends OwnServerApi {

    async getUserTheme(id: number): Promise<unknown> {
        try {
            return await this._http.get(
                "/api/theme",
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

    async changeTheme(data: number): Promise<User> {
        try {
            return await this._http.put<User>(
                "/api/theme",
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
}
