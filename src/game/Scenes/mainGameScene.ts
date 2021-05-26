import { SceneBase, SceneBaseConstructorInterface } from "../sceneBase";
import { drawPlayCard } from "../utils/drawPlayCard";
import { cardsData } from "../cardsData/cardsData";
import { shuffle } from "../utils/shuffle";
import { updateScore } from "../../services/leaderboardService";


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


export class MainGameScene extends SceneBase {
    private _currentPressedCard?: { answer: boolean; card: number };
    private _currentScore: number;

    constructor({ gameInfo, nextSceneCallback, sceneOptions }: SceneBaseConstructorInterface) {
        super({ gameInfo, nextSceneCallback, sceneOptions });

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
        super.keyUpHandler(key);

        const keyNumber = parseInt(key);
        console.log(`Your answer is ${this._stages[this._currentStageIndex].options[keyNumber - 1]}`);
        const userAnswer = this._stages[this._currentStageIndex].options[keyNumber - 1];
        const questionAnswer = this._stages[this._currentStageIndex].answer;

        if (userAnswer === questionAnswer) {
            console.log("Correct!");
            this._currentPressedCard = { card: keyNumber, answer: true };
            this._currentScore++;

        } else if (keyNumber === 1 || keyNumber === 2 || keyNumber === 3) {
            this._currentPressedCard = { card: keyNumber, answer: false };
        }

        const nextPage = () => {

            this._currentPressedCard = undefined;
            this._currentStageIndex++;

            if (this._currentStageIndex >= this._stages.length) {
                if (this._gameInfo.currentTheme) {
                    if (this._gameInfo.needUpdateScore) {
                        updateScore(this._gameInfo.currentTheme, this._currentScore);
                    }
                } else {
                    console.log("CurrentTheme undefined");
                }

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
