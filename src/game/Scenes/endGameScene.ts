import { GameInfo } from "../gameInfo";
import { SceneBase } from "../sceneBase";
import { BackGroundStar, drawBackground, generateStars } from "../utils/drawBackground";
import { drawPlayCard } from "../utils/drawPlayCard";
import { drawFullScreenButton } from "../utils/drawFullScreenButton";
import { toggleFullScreen } from "../utils/toggleFullScreen";

export class EndGameScene extends SceneBase {
    constructor(
        gameInfo: GameInfo,
        nextSceneCallback: (gameInfo: GameInfo) => void,
        endGameCallback?: (currentTheme?: string) => void
    ) {
        super(gameInfo, nextSceneCallback, endGameCallback);
    }

    private backgroundStars: { width: number, height: number, stars: BackGroundStar[] } | null = null;
    private _toggleFullScreenKey = "0";

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
            x: width / 2,
            y: height / 2
        };

        const fontSizeLittleCard = 23;
        context.font = `bold ${fontSizeLittleCard}px Inter`;
        context.fillStyle = "white";
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

        drawPlayCard(context, screenLocation.x - 300, screenLocation.y,
            "Завершить (esc)", undefined, { width: 250, height: 80, radius: 20, color: "#B7B7B7" });
        drawPlayCard(context, screenLocation.x + 50, screenLocation.y,
            "Начать (enter)", undefined, { width: 250, height: 80, radius: 20, color: "#B7B7B7" });

        drawFullScreenButton(context,10, 10, "0", 0.3, "white");
    }

    keyUpHandler(key: string): void {
        if (key === "Escape") {
            this._endGameCallback?.(this._gameInfo.currentTheme);
        } else if (key === "Enter") {
            this._nextSceneCallback({
                ...this._gameInfo,
                currentTheme: null
            });
        }

        if (key === this._toggleFullScreenKey) {
            toggleFullScreen();
        }

    }

}
