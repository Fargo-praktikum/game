import { SceneBase, SceneBaseConstructorInterface } from "../sceneBase";
import { drawPlayCard } from "../utils/drawPlayCard";
import { cardsData } from "../cardsData/cardsData";
import { shuffle } from "../utils/shuffle";
import { updateScore } from "../../services/leaderboardService";
import { sound } from "../utils/soundEffects";
import { drawProgressBar } from "../utils/drawProgressBar";

interface Stage {
    question: string;
    answer: string;
    options: string[];
}

type cardParametersType = {
    width: number,
    height: number,
    radius?: number,
    color?: string,
};


export class MainGameScene extends SceneBase {
    private _currentPressedCard?: { answer: boolean; card: number };
    private _currentScore: number;
    private _currentStageIndex: number;
    private _answersHistory: boolean[] = [];
    private _gameObjects: any = [];

    constructor({ gameInfo, nextSceneCallback, sceneOptions }: SceneBaseConstructorInterface) {
        super({ gameInfo, nextSceneCallback, sceneOptions });

        this._currentStageIndex = 0;
        this._currentPressedCard = undefined;
        this._currentScore = 0;

        // пока выбранная тема не используется, просто выведем на консоль. чтобы проверить правильность установки
        console.log(`Current game theme is ${gameInfo.currentTheme ?? ""}`);
    }


    private _stages: Stage[] = shuffleCards(cardsData, this._gameInfo.currentTheme).questions;

    protected _drawBackground(context: CanvasRenderingContext2D, width: number, height: number): void {
        context.fillStyle = "white";
        context.fillRect(0, 0, width, height);
    }

    protected _drawGameObjects(context: CanvasRenderingContext2D, width: number, height: number): void {
        drawProgressBar({
            context,
            x: 150,
            y: 50,
            width: width * .65,
            height: 20,
            radius: 5,
            answers: this._answersHistory,
            commonCount: this._stages.length,
            textColor: "black"
        });

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

        const answCard1 = { x: width / 2, y: (height / 2) - (answerCardHeight * 1.5) - answerCardGap };
        const answCard2 = { x: width / 2, y: (height / 2) - (answerCardHeight / 2) };
        const answCard3 = { x: width / 2, y: (height / 2) + (answerCardHeight / 2) + answerCardGap };

        if (this._gameObjects.length < 3) {
            this._gameObjects.push({ name: cardsData.capitals.themeName, key: "1", x1: answCard1.x,
                x2:answCard1.x + cardParameters.width, y1: answCard1.y, y2: answCard1.y + cardParameters.height });
            this._gameObjects.push({ name: cardsData.chemistry.themeName, key: "2", x1: answCard2.x,
                x2:answCard2.x + cardParameters.width, y1: answCard2.y, y2: answCard2.y + cardParameters.height });
            this._gameObjects.push({ name: cardsData.history.themeName, key: "3", x1: answCard3.x,
                x2: answCard3.x + cardParameters.width, y1: answCard3.y, y2: answCard3.y + cardParameters.height });
        }

        switch (cardNumber) {
            case 1:
                return drawPlayCard(context, answCard1.x, answCard1.y,
                    currentStage.options[0],"1", cardParameters);
            case 2:
                return drawPlayCard(context,answCard2.x,answCard2.y,
                    currentStage.options[1],"2", cardParameters);
            case 3:
                return drawPlayCard(context,answCard3.x,answCard3.y,
                    currentStage.options[2],"3", cardParameters);
        }

    }

    keyUpHandler(key: string): void {
        super.keyUpHandler(key);

        const keyNumber = parseInt(key);
        console.log(`Your answer is ${this._stages[this._currentStageIndex].options[keyNumber - 1]}`);
        const userAnswer = this._stages[this._currentStageIndex].options[keyNumber - 1];
        const questionAnswer = this._stages[this._currentStageIndex].answer;
        const timeToNextPage = 500;

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

        if (userAnswer === questionAnswer) {
            console.log("Correct!");
            sound.playCorrect();
            this._currentPressedCard = { card: keyNumber, answer: true };
            // здесь можно пушить не только boolean, а сам еще и сам вопрос, чтобы потом показать,
            // где были совершены ошибки, но пока ограничимся true/false
            this._answersHistory.push(true);
            this._currentScore++;
            setTimeout(nextPage, timeToNextPage);
        } else if (keyNumber === 1 || keyNumber === 2 || keyNumber === 3) {
            sound.playIncorrect();
            this._currentPressedCard = { card: keyNumber, answer: false };
            this._answersHistory.push(false);
            setTimeout(nextPage, timeToNextPage);
        }
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
