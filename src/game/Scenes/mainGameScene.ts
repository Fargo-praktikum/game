import { SceneBase } from "../sceneBase";
import { drawPlayCard } from "../utils/drawPlayCard";
//import roundRect from "../utils/roundRect";

interface Stage {
    question: string;
    answer: string;
    options: string[];
}

export class MainGameScene extends SceneBase {

    constructor(
        nextSceneCallback: () => void,
        needUpdateCallback: () => void
        ) {
        super(nextSceneCallback, needUpdateCallback);

        this._currentStageIndex = 0;
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

    protected _drawGameObjects(context: CanvasRenderingContext2D, _width: number, height: number): void {
        // const screenLocation = {
        //     x: width - 550,
        //     y: height - 650
        // };
        //const color = "#00c2ff";

        const currentStage = this._stages[this._currentStageIndex];

        // плашка с вопросом
        drawPlayCard(context, 150, height / 2 - 95, currentStage.question);
    }

    keyDownHandler(key: string): void {
        console.log(`Your answer is ${key}`);

        this._currentStageIndex++;

        if (this._currentStageIndex < this._stages.length) {
            //this.needUpdate = true;
            this._needUpdateCallback();
        }
        else {
            this._nextSceneCallback();
        }

    }

}
