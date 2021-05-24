import React, { useRef, useLayoutEffect, useState, useMemo, useEffect } from "react";
import { useHistory } from "react-router";
import { GameInfo } from "../../game/gameInfo";
import { SceneBase } from "../../game/sceneBase";
import { EndGameScene } from "../../game/Scenes/endGameScene";
import { MainGameScene } from "../../game/Scenes/mainGameScene";
import { StartGameScene } from "../../game/Scenes/startGameScene";

const sceneOptions = {
    fullScreen: {
        key: "0",
        parameters: {
            x: 10,
            y: 10,
            scale: 0.3,
            strokeColor: "white",
        }
    }
};

export const Game = (): JSX.Element => {

    const history = useHistory();

    const sceneFactory = useMemo(() => {
        return (sceneName: string, initialGameInfo: GameInfo): SceneBase => {
            switch (sceneName) {
                case "start":
                    return new StartGameScene({
                        gameInfo: initialGameInfo,
                        nextSceneCallback: (gameInfo: GameInfo) => {
                            setCurrentScene(sceneFactory("main", gameInfo));
                        },
                        sceneOptions
                    });
                case "main":
                    return new MainGameScene({
                        gameInfo: initialGameInfo,
                        nextSceneCallback: (gameInfo: GameInfo) => {
                            setCurrentScene(sceneFactory("end", gameInfo));
                        },
                        sceneOptions
                    });
                case "end":
                    return new EndGameScene({
                        gameInfo: initialGameInfo,
                        nextSceneCallback: (gameInfo: GameInfo) => {
                            setCurrentScene(sceneFactory("start", gameInfo));
                        },
                        endGameCallback: (currentTheme) => {
                            if (typeof currentTheme === "undefined" || currentTheme === null) {
                                history.push(`/leaderboard`);
                            } else {
                                history.push(`/leaderboard/${currentTheme}`);
                            }
                        },
                        sceneOptions
                    });
                default:
                    throw new Error("Invalid scene name");
            }
        };
    }, []);

    const [currentScene, setCurrentScene] = useState(sceneFactory("start", { currentTheme: null }));

    useEffect(() => {

        const handler = ({ key }: { key: string }) => {
            currentScene.keyUpHandler(key);
        };

        window.addEventListener("keyup", handler);
        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener("keyup", handler);
        };

    }, [currentScene]);

    const width = window.innerWidth;
    const height = window.innerHeight;
    const canvas = useRef<HTMLCanvasElement>(null);

    //update canvas size if window resize happen
    useWindowSize();

    useLayoutEffect(() => {
        if (canvas.current === null) throw new Error("Could not get current canvas");
        const context = canvas.current.getContext("2d");
        if (context === null) throw new Error("Could not get context");

        let animationFrameId: number;
        const render = () => {
            currentScene.render(context, width, height);
            animationFrameId = requestAnimationFrame(render);
        };
        render();
        //TODO запускать и останавливать рендер только когда происходит событие ?
        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    });

    return <canvas ref={canvas} width={width} height={height} />;
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
