export abstract class SceneBase {
    constructor(nextSceneCallback: () => void, needUpdateCallback: () => void) {
        this._nextSceneCallback = nextSceneCallback;
        this._needUpdateCallback = needUpdateCallback;
    }

    needUpdate: boolean = false;
    protected _needUpdateCallback: () => void;
    protected _nextSceneCallback: () => void;

    render(context: CanvasRenderingContext2D, width: number, height: number) {
        this._drawBackground(context, width, height);

        this._drawGameObjects(context, width, height);
    }

    protected abstract _drawBackground(context: CanvasRenderingContext2D, width: number, height: number): void;

    protected abstract _drawGameObjects(context: CanvasRenderingContext2D, width: number, height: number): void;

    abstract keyDownHandler(key: string): void;

}
