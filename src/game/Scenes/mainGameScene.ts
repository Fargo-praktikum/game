import { GameInfo } from "../gameInfo";
import { SceneBase } from "../sceneBase";
import { drawPlayCard } from "../utils/drawPlayCard";
import { cardsData } from "../cardsData/cardsData";
import LeaderboardApi from "../../api/leaderboardApi";
import store from "../../store/store";
import { merge } from "../../scripts/utils/myDash/merge";
import { shuffle } from "../utils/shuffle";
import scoreData from "../../models/scoreData";

interface Stage {
    question: string;
    answer: string;
    options: string[];
}

type cardParametersType = {
    width?: number,
    height?: number,
    radius?: number,
    color?: string,
};

type Indexed<T = unknown> = {
    [key in string]: T;
};

export class MainGameScene extends SceneBase {
    private _currentPressedCard?: { answer: boolean; card: number };
    private _currentScore: number;

    constructor(
        gameInfo: GameInfo,
        nextSceneCallback: (gameInfo: GameInfo) => void
    ) {
        super(gameInfo, nextSceneCallback);

        this._currentStageIndex = 0;
        this._currentPressedCard = undefined;
        this._currentScore = 0;

        // пока выбранная тема не используется, просто выведем на консоль. чтобы проверить правильность установки
        console.log(`Current game theme is ${gameInfo.currentTheme ?? ""}`);
    }

    private _currentStageIndex: number;
    private _stages: Stage[] = shuffleCards(cardsData, this._gameInfo.currentTheme).questions;

    protected _drawBackground(context: CanvasRenderingContext2D, width: number, height: number): void {
        context.fillStyle = "white";
        context.fillRect(0, 0, width, height);
    }

    protected _drawGameObjects(context: CanvasRenderingContext2D, width: number, height: number): void {

        const currentStage = this._stages[this._currentStageIndex];
        // плашка с вопросом
        drawPlayCard(context, 150, height / 2 - 95, currentStage.question);

        this._drawAnswerCards(context, width, height, 1, this._currentPressedCard);
        this._drawAnswerCards(context, width, height, 2, this._currentPressedCard);
        this._drawAnswerCards(context, width, height, 3, this._currentPressedCard);
    }

    private _drawAnswerCards(context: CanvasRenderingContext2D, width: number, height: number, cardNumber: number, isCorrect?: any): void {

        const currentStage = this._stages[this._currentStageIndex];

        // плашки с ответами
        const answerCardGap = 15;
        const answerCardHeight = 50;
        let cardParameters: cardParametersType = { width: 200, height: answerCardHeight };

        if (isCorrect) {
            if (isCorrect.card === cardNumber && isCorrect.answer) {
                cardParameters = { ...cardParameters, color: "green" };
            } else if (isCorrect.card === cardNumber) {
                cardParameters = { ...cardParameters, color: "red" };
            }
        }

        if (cardNumber === 1) {
            drawPlayCard(
                context,
                width / 2,
                (height / 2) - (answerCardHeight * 1.5) - answerCardGap,
                currentStage.options[0],
                "1",
                cardParameters
            );
        }
        if (cardNumber === 2) {
            drawPlayCard(
                context,
                width / 2,
                (height / 2) - (answerCardHeight / 2),
                currentStage.options[1],
                "2",
                cardParameters
            );
        }

        if (cardNumber === 3) {
            drawPlayCard(
                context,
                width / 2,
                (height / 2) + (answerCardHeight / 2) + answerCardGap,
                currentStage.options[2],
                "3",
                cardParameters
            );
        }
    }

    keyUpHandler(key: string): void {
        console.log(`Your answer is ${this._stages[this._currentStageIndex].options[parseInt(key) - 1]}`);
        const userAnswer = this._stages[this._currentStageIndex].options[parseInt(key) - 1];
        const questionAnswer = this._stages[this._currentStageIndex].answer;

        if (userAnswer === questionAnswer) {
            console.log("Correct!");
            this._currentPressedCard = { card: parseInt(key), answer: true };
            this._currentScore++;

        } else if (parseInt(key) === 1 || parseInt(key) === 2 || parseInt(key) === 3) {
            this._currentPressedCard = { card: parseInt(key), answer: false };
        }

        const nextPage = () => {
            this._currentPressedCard = undefined;
            this._currentStageIndex++;

            if (this._currentStageIndex >= this._stages.length) {

                const leaderboard = new LeaderboardApi();
                leaderboard.getLeaderboard().then((res ) => {

                    const userId = store.getState().auth.userInfo.id;

                    const currentScore = {
                        date: new Date().getTime(),
                        userId: userId,
                        name: store.getState().auth.userInfo.firstName,
                        themes: {
                            [this._gameInfo.currentTheme as string]: {
                                score: this._currentScore * 10,
                            }
                        },
                    };

                    let sendScore;
                    if (typeof res === "undefined" || typeof res[0].data === "undefined" || typeof res[0].data.userId === "undefined") {
                        sendScore = currentScore;
                    } else {
                        const oldScore = res.find(el => el.data.userId === userId);
                        sendScore = merge(oldScore?.data as unknown as Indexed<scoreData>, currentScore);
                    }
                    leaderboard.addScore(sendScore as unknown as scoreData);
                });


                this._gameInfo = { ...this._gameInfo,
                    gameLength: this._stages.length,
                    score: this._currentScore
                };
                this._nextSceneCallback(this._gameInfo);
            }
        };

        setTimeout(nextPage, 500);

    }

}

function shuffleCards(cardsData: any, theme: string | number | null | undefined) {
    if (typeof theme === "string") {
        const shuffleCardsData = { ...cardsData };
        shuffleCardsData[theme].questions = shuffle(shuffleCardsData[theme].questions);
        shuffleCardsData[theme].questions.forEach((key: {[key: string]: string[]}) => {
            key.options = <string[]>shuffle(key.options);
        });

        return shuffleCardsData[theme];
    } else {
        throw new Error("Theme is not string.");
    }

}
