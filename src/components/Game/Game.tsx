import React, { useRef, useLayoutEffect, useState, useMemo, useEffect } from "react";
import { useHistory } from "react-router";
import { GameInfo } from "../../game/gameInfo";
import { SceneBase } from "../../game/sceneBase";
import { EndGameScene } from "../../game/Scenes/endGameScene";
import { MainGameScene } from "../../game/Scenes/mainGameScene";
import { StartGameScene } from "../../game/Scenes/startGameScene";

export const Game = (): JSX.Element => {

    const history = useHistory();

    const sceneFactory = useMemo(() => {
        return (sceneName: string, initialGameInfo: GameInfo): SceneBase => {
            switch (sceneName) {
                case "start":
                    return new StartGameScene(
                        initialGameInfo,
                        (gameInfo: GameInfo) => {
                            setCurrentScene(sceneFactory("main", gameInfo));
                        }
                    );
                case "main":
                    return new MainGameScene(
                        initialGameInfo,
                        (gameInfo: GameInfo) => {
                            setCurrentScene(sceneFactory("end", gameInfo));
                        }
                    );
                case "end":
                    return new EndGameScene(
                        initialGameInfo,
                        (gameInfo: GameInfo) => {
                            setCurrentScene(sceneFactory("start", gameInfo));
                        },
                        () => {
                            history.push("/leaderboard");
                        }
                    );
                default:
                    throw new Error("Invalid scene name");
            }
        };
    }, []);

    const [currentScene, setCurrentScene] = useState(sceneFactory("start", { currentTheme: null }));

    useEffect(() => {

        const handler = ({ key }: { key: string }) => {
            currentScene.keyDownHandler(key);
        };

        window.addEventListener("keydown", handler);
        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener("keydown", handler);
        };

    }, [currentScene]);

    const width = window.innerWidth;
    const height = window.innerHeight;
    const pixelRatio = window.devicePixelRatio;

    const canvas = useRef<HTMLCanvasElement>(null);

    useWindowSize();

    useLayoutEffect(() => {
        if (canvas.current === null) throw new Error("Could not get current canvas");
        const context = canvas.current.getContext("2d");
        if (context === null) throw new Error("Could not get context");

        let animationFrameId: number;
        const render = () => {
            currentScene.render(context, width, height);
            animationFrameId = window.requestAnimationFrame(render);
        };

        render();

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    });

    const dw = Math.floor(pixelRatio * width);
    const dh = Math.floor(pixelRatio * height);
    return <canvas ref={canvas} width={dw} height={dh} />;
};

function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
}
