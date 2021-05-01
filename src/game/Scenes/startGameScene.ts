import { SceneBase } from "../sceneBase";
import { drawBackground } from "../utils/drawBackground";
import { drawPlayCard } from "../utils/drawPlayCard";

export class StartGameScene extends SceneBase {

    constructor(
        nextSceneCallback: () => void,
        needUpdateCallback: () => void
        ) {
        super(nextSceneCallback, needUpdateCallback);
    }

    // TODO должно будет либо приходить снаружи, либо откуда-то вытаскиваться здесь
    private _gameThemes: Record<string, string> = {
        1: "capitals",
        2: "periodic",
        3: "history",
        4: "english"
    };

    protected _drawBackground(context: CanvasRenderingContext2D, width: number, height: number): void {
        drawBackground(context, width, height);
    }

    protected _drawGameObjects(context: CanvasRenderingContext2D, width: number, height: number): void {
        const screenLocation = {
            x: width - 550,
            y: height - 650
        };

        const fontSizeLittleCard = 23;
        context.font = `bold ${fontSizeLittleCard}px Inter`;
        context.fillStyle = "white";
        context.textBaseline = "middle";
        context.textAlign = "center";
        context.shadowBlur = 2;
        context.fillText("Выберите тему, чтобы начать играть", screenLocation.x + 190, screenLocation.y - 20);

        drawPlayCard(context, screenLocation.x + 20, screenLocation.y + 20, "Столицы", "1");
        drawPlayCard(context, screenLocation.x + 220, screenLocation.y + 20, "Химические элементы", "2");
        drawPlayCard(context, screenLocation.x + 20, screenLocation.y + 240, "История", "3");
        drawPlayCard(context, screenLocation.x + 220, screenLocation.y + 240, "Английский язык", "4");
    }

    keyDownHandler(key: string): void {
        if (key in this._gameThemes){
            //Добавляю в стейт "тему"
            // const gameInfo = setGameInfo( { theme: `${ targetKey[key] }` } );
            // store.dispatch(gameInfo);

            //TODO Тут будет логика для очистки канваса и загрузки игры
            console.log(`Pressed ${key} go to ${this._gameThemes[key]} theme`);
            this._nextSceneCallback();
        }
    }
}
