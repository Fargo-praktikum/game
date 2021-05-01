import { GameInfo } from "../gameInfo";
import { SceneBase } from "../sceneBase";
import { BackGroundStar, drawBackground, generateStars } from "../utils/drawBackground";
import { drawPlayCard } from "../utils/drawPlayCard";

export class StartGameScene extends SceneBase {

    constructor(
        gameInfo: GameInfo,
        nextSceneCallback: (gameInfo: GameInfo) => void
    ) {
        super(gameInfo, nextSceneCallback);
    }

    private backgroundStars: { width: number, height: number, stars: BackGroundStar[] } | null = null;
    // TODO должно будет либо приходить снаружи, либо откуда-то вытаскиваться здесь
    private _gameThemes: Record<string, string> = {
        1: "capitals",
        2: "periodic",
        3: "history",
        4: "english"
    };

    protected _drawBackground(context: CanvasRenderingContext2D, width: number, height: number): void {
        if (!this.backgroundStars || this.backgroundStars.width !== width || this.backgroundStars?.height !== height) {
            const stars = generateStars(width, height);
            this.backgroundStars = {
                width,
                height,
                stars
            };
        }

        drawBackground(context, width, height, this.backgroundStars.stars);
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
            // TODO пока закоментил, непонятно, нужен ли нам стор для игры
            //Добавляю в стейт "тему"
            // const gameInfo = setGameInfo( { theme: `${ targetKey[key] }` } );
            // store.dispatch(gameInfo);

            //TODO Временно, чтобы было видно, что работает
            console.log(`Pressed ${key} go to ${this._gameThemes[key]} theme`);
            this._nextSceneCallback({
                ...this._gameInfo,
                currentTheme: this._gameThemes[key]
            });
        }
    }
}
