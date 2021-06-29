import store from "../store/store";
import { merge } from "../scripts/utils/myDash/merge";
import scoreData from "../models/scoreData";
import LeaderboardApi from "../api/leaderboardApi";
import { UserScore } from "../models/userScore";
import ScoreRequestData from "../models/scoreRequestData";

type Indexed<T = unknown> = {
    [key in string]: T;
};

const leaderboardApi = new LeaderboardApi();

export async function updateScore(currentTheme: string, updatedScore: number): Promise<void> {
    const leaderboadData = await leaderboardApi.getLeaderboard();
    const userInfo = store?.getState().auth.userInfo;
    const userId = userInfo?.id;
    const firstName = userInfo?.firstName;
    console.log(userInfo, 'userInfouserInfouserInfouserInfo');
    console.log(currentTheme, updatedScore, 'userInfouserInfouserInfouserInfo');
    const currentScore = {
        date: new Date().getTime(),
        userId: userId,
        name: firstName,
        themes: {
            [currentTheme]: {
                score: updatedScore * 10,
            }
        },
    };

    let sendScore;
    //If there is no previous data set it to current, or update score
    if (typeof leaderboadData === "undefined" || typeof leaderboadData[0] === "undefined"
        || typeof leaderboadData[0].data === "undefined"
        || typeof leaderboadData[0].data.userId === "undefined") {
        sendScore = currentScore;
        console.log(leaderboadData, "im here!");
        leaderboardApi.addScore(sendScore as unknown as scoreData);
    } else {
        const oldScore = leaderboadData.find(el => el.data.userId === userId);
        console.log("or here");
        if (currentTheme) {
            //Check if current score greater than previous
            const currentScoreNumber = currentScore.themes[currentTheme].score;
            const oldScoreScoreNumber = oldScore?.data?.themes[currentTheme]?.score || 0;
            console.log(currentScore, currentScoreNumber, oldScoreScoreNumber, "mb im here?");
            if (oldScoreScoreNumber === 0 || typeof oldScoreScoreNumber === "undefined") {
                sendScore = currentScore;
                leaderboardApi.addScore(sendScore as unknown as scoreData);
            } else if (currentScoreNumber > oldScoreScoreNumber) {
                console.log("better be here1111111");
                //merge чтобы добавлять поля разных "тем", а не перезаписывать с одним полем каждый раз
                sendScore = merge(oldScore?.data as unknown as Indexed<scoreData>, currentScore);
                console.log(sendScore, "better be here2222222");
                sendScore.themes[currentTheme] = { score: currentScoreNumber };
                console.log(sendScore, 'sendScore TEST!!____');
                leaderboardApi.addScore(sendScore as unknown as scoreData);
            }
        }
    }
}

export async function getLeaderboardData(currentTheme: string): Promise<ScoreRequestData[]> {
    const result = await leaderboardApi.getLeaderboard();
    let scoresByTheme;

    if (typeof currentTheme === "undefined") {
        scoresByTheme = [...result];
        scoresByTheme.forEach((el: any) => {
            el.data.theme = currentTheme;
            el.data.score = Object.keys(el.data.themes).reduce((sum, key) => {
                return sum + parseInt(el.data.themes[key].score);
            }, 0);
            delete el.data.themes;
        });
    } else {
        scoresByTheme = result.filter(el => typeof el.data.themes[currentTheme] !== "undefined");
        scoresByTheme.forEach((el: any) => {
            el.data.theme = currentTheme;
            el.data.score = el.data.themes[currentTheme].score;
            delete el.data.themes;
        });
    }

    const leaderboardScore: any = [...scoresByTheme];
    leaderboardScore.sort((a: {data: UserScore},b: {data: UserScore}) => b.data.score - a.data.score);
    return leaderboardScore;
}
