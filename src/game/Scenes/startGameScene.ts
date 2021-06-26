import { SceneBase, SceneBaseConstructorInterface } from "../sceneBase";
import { BackGroundStar, drawBackground, generateStars } from "../utils/drawBackground";
import { drawPlayCard } from "../utils/drawPlayCard";
import { cardsData } from "../cardsData/cardsData";
import { sound } from "../utils/soundEffects";
import store from "../../store/store";

export class StartGameScene extends SceneBase {

    constructor({ gameInfo, nextSceneCallback, sceneOptions }: SceneBaseConstructorInterface) {
        super({ gameInfo, nextSceneCallback, sceneOptions });
    }

    private backgroundStars: { width: number, height: number, stars: BackGroundStar[] } | null = null;
    // TODO должно будет либо приходить снаружи, либо откуда-то вытаскиваться здесь
    private _gameThemes: Record<string, string> = {
        1: "capitals",
        2: "chemistry",
        3: "history",
        4: "english"
    };


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
            x: width - 550,
            y: height - 650
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
        context.fillText("Выберите тему, чтобы начать играть", screenLocation.x + 190, screenLocation.y - 20);

        const themeCard1 = { x: screenLocation.x + 20, y: screenLocation.y + 20 };
        const themeCard2 = { x: screenLocation.x + 220, y: screenLocation.y + 20 };
        const themeCard3 = { x: screenLocation.x + 20, y: screenLocation.y + 240 };
        const themeCard4 = { x: screenLocation.x + 220, y: screenLocation.y + 240 };

        const cardParameters = {
            width: 160,
            height: 190
        };

        if (this.gameObjects.length < 4) {
            this.gameObjects.push({ name: cardsData.capitals.themeName, key: "1", x1: themeCard1.x,
                x2:themeCard1.x + cardParameters.width, y1: themeCard1.y, y2: themeCard1.y + cardParameters.height });
            this.gameObjects.push({ name: cardsData.chemistry.themeName, key: "2", x1: themeCard2.x,
                x2:themeCard2.x + cardParameters.width, y1: themeCard2.y, y2: themeCard2.y + cardParameters.height });
            this.gameObjects.push({ name: cardsData.history.themeName, key: "3", x1: themeCard3.x,
                x2: themeCard3.x + cardParameters.width, y1: themeCard3.y, y2: themeCard3.y + cardParameters.height });
            this.gameObjects.push({ name: cardsData.english.themeName, key: "4", x1: themeCard4.x,
                x2: themeCard4.x + cardParameters.width, y1: themeCard4.y, y2: themeCard4.y + cardParameters.height });
        }

        drawPlayCard(context, themeCard1.x, themeCard1.y, cardsData.capitals.themeName, "1", cardParameters);
        drawPlayCard(context, themeCard2.x, themeCard2.y, cardsData.chemistry.themeName, "2", cardParameters);
        drawPlayCard(context, themeCard3.x, themeCard3.y, cardsData.history.themeName, "3", cardParameters);
        drawPlayCard(context, themeCard4.x, themeCard4.y, cardsData.english.themeName, "4", cardParameters);
    }

    keyUpHandler(key: string): void {
        super.keyUpHandler(key);

        if (key in this._gameThemes) {
            // TODO пока закоментил, непонятно, нужен ли нам стор для игры
            //Добавляю в стейт "тему"
            // const gameInfo = setGameInfo( { theme: `${ targetKey[key] }` } );
            // store.dispatch(gameInfo);
            console.log(store.getState().game.theme);
            //TODO Временно, чтобы было видно, что работает
            console.log(`Pressed ${key} go to ${this._gameThemes[key]} theme`);
            sound.playSelect();
            this._nextSceneCallback({
                ...this._gameInfo,
                currentTheme: this._gameThemes[key]
            });
        }

    }
}
