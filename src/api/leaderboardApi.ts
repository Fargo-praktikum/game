import scoreData from "../models/scoreData";
import { fromSnakeCase } from "../utils/fromSnakeCase";
import { BaseApi } from "./baseApi";


export default class LeaderboardApi extends BaseApi {

    async addScore(scoreData: scoreData ): Promise<unknown> {
        try {
            return await this._http.post(
                "/leaderboard",
                {
                    data: {
                        data: scoreData,
                        ratingFieldName: "date",
                    },
                }
            );
        }
        catch (e) {
            const error = this._processError(e);

            throw error;
        }
    }

    async getLeaderboard(): Promise<{data: scoreData}[]> {
        try {
            return await this._http.post(
                "/leaderboard/all",
                {
                    data: {
                        "ratingFieldName": "date",
                        "cursor": 0,
                        "limit": 15
                    },
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
            case "wrong json format":
                return "Неверный формат данных";
            default:
                return null;
        }
    }
}
