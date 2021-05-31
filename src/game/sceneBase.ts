import { GameInfo } from "./gameInfo";
import { drawFullScreenButton } from "./utils/drawFullScreenButton";
import { toggleFullScreen } from "./utils/toggleFullScreen";
import { sound } from "./utils/soundEffects";

export type SceneOptions = {
    fullScreen?: {
        key: string;
        parameters: {
            x: number;
            y: number;
            scale: number;
            strokeColor: string;
        }
    },
    sound: {
        key: string;
    }
};

export type endGameCallbackType = (currentTheme: GameInfo["currentTheme"]) => void;


export interface SceneBaseConstructorInterface {
    gameInfo: GameInfo;
    nextSceneCallback: (gameInfo: GameInfo) => void;
    endGameCallback?: endGameCallbackType;
    sceneOptions?: SceneOptions;
}

export abstract class SceneBase {
    context?: CanvasRenderingContext2D;
    width?: number;
    height?: number;

    constructor({ gameInfo, nextSceneCallback, endGameCallback, sceneOptions }: SceneBaseConstructorInterface) {
        this._nextSceneCallback = nextSceneCallback;
        this._endGameCallback = endGameCallback;
        this._gameInfo = gameInfo;
        this._sceneOptions = sceneOptions;
    }

    protected _nextSceneCallback: (gameInfo: GameInfo) => void;
    protected _endGameCallback?: endGameCallbackType;
    protected _gameInfo: GameInfo;
    private _sceneOptions?: SceneOptions;

    render(context: CanvasRenderingContext2D, width: number, height: number): void {
        this.context = context;
        this.width = width;
        this.height = height;

        this._drawBackground(context, width, height);

        this._drawGameObjects(context, width, height);

        if (this._sceneOptions?.fullScreen) {
            const { key, parameters: { x, y, scale, strokeColor } } = this._sceneOptions.fullScreen;
            drawFullScreenButton(context, x, y, key, scale, strokeColor);
        }
    }

    protected abstract _drawBackground(context: CanvasRenderingContext2D, width: number, height: number): void;

    protected abstract _drawGameObjects(context: CanvasRenderingContext2D, width: number, height: number): void;

    keyUpHandler(key: string): void {
        if (this._sceneOptions?.fullScreen) {
            if (key === this._sceneOptions.fullScreen.key) {
                toggleFullScreen();
            }
            if (key === this._sceneOptions.sound.key) {
                sound.mute();
            }
        }
    }

}
