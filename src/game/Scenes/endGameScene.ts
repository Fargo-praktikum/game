import { SceneBase, SceneBaseConstructorInterface } from "../sceneBase";
import { BackGroundStar, drawBackground, generateStars } from "../utils/drawBackground";
import { drawPlayCard } from "../utils/drawPlayCard";


export class EndGameScene extends SceneBase {
    constructor({ gameInfo, nextSceneCallback, endGameCallback, sceneOptions }: SceneBaseConstructorInterface) {
        super({ gameInfo, nextSceneCallback, endGameCallback, sceneOptions });
    }

    private backgroundStars: { width: number, height: number, stars: BackGroundStar[] } | null = null;


    protected _drawBackground(context: CanvasRenderingContext2D, width: number, height: number): void {
        if (this._sceneOptions?.theme === "STARS") {
            if (!this.backgroundStars || this.backgroundStars.width !== width || this.backgroundStars?.height !== height) {
                const stars = generateStars(width, height);
                this.backgroundStars = {
                    width,
                    height,
                    stars
                };
            }
            drawBackground(context, width, height, this.backgroundStars.stars);
        } else {
            context.fillStyle = "white";
            context.fillRect(0, 0, width, height);
        }
    }

    protected _drawGameObjects(context: CanvasRenderingContext2D, width: number, height: number): void {
        const screenLocation = {
            x: width / 2,
            y: height / 2
        };

        const fontSizeLittleCard = 23;
        context.font = `bold ${fontSizeLittleCard}px Inter`;
        if (this._sceneOptions?.theme === "STARS") {
            context.fillStyle = "white";
        } else {
            context.fillStyle = "black";
        }

        context.textBaseline = "middle";
        context.textAlign = "center";
        context.shadowBlur = 2;
        if (typeof this._gameInfo.score !== "undefined" && typeof this._gameInfo.gameLength !== "undefined") {
            const winPercentage = Math.floor(100 / (this._gameInfo.gameLength / this._gameInfo.score));
            const scoreMultByTen = this._gameInfo.score * 10;

            context.fillText(`Вы набрали - ${scoreMultByTen} очков (${winPercentage}% правильных ответов)`,
                screenLocation.x, screenLocation.y - 100);
        }
        context.fillText("Игра завершена, хотите начать заново?", screenLocation.x, screenLocation.y - 50);

        const menuCardEnd = { x: screenLocation.x - 300, y: screenLocation.y };
        const menuCardContinue = { x: screenLocation.x + 50, y: screenLocation.y };
        const cardParameters = { width: 250, height: 80, radius: 20, color: "#B7B7B7" };

        if (this.gameObjects.length < 2) {
            this.gameObjects.push({ name: "Завершить (esc)", key: "Escape", x1: menuCardEnd.x,
                x2:menuCardEnd.x + cardParameters.width, y1: menuCardEnd.y, y2: menuCardEnd.y + cardParameters.height });
            this.gameObjects.push({ name: "Начать (enter)", key: "Enter", x1: menuCardContinue.x,
                x2:menuCardContinue.x + cardParameters.width, y1: menuCardContinue.y, y2: menuCardContinue.y + cardParameters.height });
        }

        drawPlayCard(context, menuCardEnd.x, menuCardEnd.y,
            "Завершить (esc)", undefined, cardParameters);
        drawPlayCard(context, menuCardContinue.x, menuCardContinue.y,
            "Начать (enter)", undefined, cardParameters);
    }

    keyUpHandler(key: string): void {
        super.keyUpHandler(key);

        if (key === "Escape") {
            this._endGameCallback?.(this._gameInfo.currentTheme);
        } else if (key === "Enter") {
            this._nextSceneCallback({
                ...this._gameInfo,
                currentTheme: null
            });
        }
    }

}
