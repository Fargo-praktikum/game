import { GameInfo } from "./gameInfo";

export abstract class SceneBase {
    constructor(
        gameInfo: GameInfo,
        nextSceneCallback: (gameInfo: GameInfo) => void,
        endGameCallback?: () => void
    ) {
        this._nextSceneCallback = nextSceneCallback;
        this._endGameCallback = endGameCallback;
        this._gameInfo = gameInfo;
    }

    protected _nextSceneCallback: (gameInfo: GameInfo) => void;
    protected _endGameCallback?: () => void;
    protected _gameInfo: GameInfo;

    render(context: CanvasRenderingContext2D, width: number, height: number): void {
        this._drawBackground(context, width, height);

        this._drawGameObjects(context, width, height);
    }

    protected abstract _drawBackground(context: CanvasRenderingContext2D, width: number, height: number): void;

    protected abstract _drawGameObjects(context: CanvasRenderingContext2D, width: number, height: number): void;

    abstract keyDownHandler(key: string): void;

}
