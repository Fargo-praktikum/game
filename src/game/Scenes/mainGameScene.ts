import { GameInfo } from "../gameInfo";
import { SceneBase } from "../sceneBase";
import { drawPlayCard } from "../utils/drawPlayCard";

interface Stage {
    question: string;
    answer: string;
    options: string[];
}

export class MainGameScene extends SceneBase {

    constructor(
        gameInfo: GameInfo,
        nextSceneCallback: (gameInfo: GameInfo) => void
    ) {
        super(gameInfo, nextSceneCallback);

        this._currentStageIndex = 0;

        // пока выбранная тема не используется, просто выведем на консоль. чтобы проверить правильность установки
        console.log(`Current game theme is ${gameInfo.currentTheme ?? ""}`);
    }

    private _currentStageIndex: number;
    private _stages: Stage[] = [
        {
            question: "Россия",
            answer: "Москва",
            options: [
                "Берлин",
                "Москва",
                "Пекин"
            ]
        },
        {
            question: "Германия",
            answer: "Берлин",
            options: [
                "Пекин",
                "Москва",
                "Берлин"
            ]
        }

    ];

    protected _drawBackground(context: CanvasRenderingContext2D, width: number, height: number): void {
        context.fillStyle = "white";
        context.fillRect(0, 0, width, height);
    }

    protected _drawGameObjects(context: CanvasRenderingContext2D, width: number, height: number): void {

        const currentStage = this._stages[this._currentStageIndex];

        // плашка с вопросом
        drawPlayCard(context, 150, height / 2 - 95, currentStage.question);

        // плашки с ответами
        const answerCardGap = 15;
        const answerCardHeight = 50;

        drawPlayCard(
            context,
            width / 2,
            (height / 2) - (answerCardHeight * 1.5) - answerCardGap,
            currentStage.options[0],
            "1",
            { width: 200, height: answerCardHeight }
        );
        drawPlayCard(
            context,
            width / 2,
            (height / 2) - (answerCardHeight / 2),
            currentStage.options[1],
            "2",
            { width: 200, height: answerCardHeight }
        );
        drawPlayCard(
            context,
            width / 2,
            (height / 2) + (answerCardHeight / 2) + answerCardGap,
            currentStage.options[2],
            "3",
            { width: 200, height: answerCardHeight }
        );
    }

    keyDownHandler(key: string): void {
        console.log(`Your answer is ${this._stages[this._currentStageIndex].options[parseInt(key) - 1]}`);

        this._currentStageIndex++;

        if (this._currentStageIndex >= this._stages.length) {
            this._nextSceneCallback(this._gameInfo);
        }
    }

}
