import scoreData from "../models/scoreData";
import { fromSnakeCase } from "../utils/fromSnakeCase";
import { BaseApi } from "./baseApi";
import ScoreRequestData from "../models/scoreRequestData";


export default class LeaderboardApi extends BaseApi {

    async addScore(scoreData: scoreData ): Promise<void> {
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

    async getLeaderboard(): Promise<ScoreRequestData[]> {
        try {
            const usersInTheLeaderboard = 15;

            return await this._http.post(
                "/leaderboard/all",
                {
                    data: {
                        "ratingFieldName": "date",
                        "cursor": 0,
                        "limit": usersInTheLeaderboard
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
