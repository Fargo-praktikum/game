import { GameInfo } from "./gameInfo";

export abstract class SceneBase {
    context?: CanvasRenderingContext2D;
    width?: number;
    height?: number;

    constructor(
        gameInfo: GameInfo,
        nextSceneCallback: (gameInfo: GameInfo) => void,
        endGameCallback?: () => void,

    ) {
        this._nextSceneCallback = nextSceneCallback;
        this._endGameCallback = endGameCallback;
        this._gameInfo = gameInfo;

    }

    protected _nextSceneCallback: (gameInfo: GameInfo) => void;
    protected _endGameCallback?: (currentTheme?: string | null | undefined) => void;
    protected _gameInfo: GameInfo;

    render(context: CanvasRenderingContext2D, width: number, height: number): void {
        this.context = context;
        this.width = width;
        this.height = height;

        this._drawBackground(context, width, height);

        this._drawGameObjects(context, width, height);
    }

    protected abstract _drawBackground(context: CanvasRenderingContext2D, width: number, height: number): void;

    protected abstract _drawGameObjects(context: CanvasRenderingContext2D, width: number, height: number): void;

    abstract keyUpHandler(key: string): void;

}
