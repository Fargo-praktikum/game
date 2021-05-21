import React, { useRef, useLayoutEffect, useState, useMemo, useEffect } from "react";
import { useHistory } from "react-router";
import { GameInfo } from "../../game/gameInfo";
import { SceneBase } from "../../game/sceneBase";
import { EndGameScene } from "../../game/Scenes/endGameScene";
import { MainGameScene } from "../../game/Scenes/mainGameScene";
import { StartGameScene } from "../../game/Scenes/startGameScene";
import { useAppSelector } from "../../hooks/storeHooks";

export const Game = (): JSX.Element => {

    const history = useHistory();

    const isOnline = useAppSelector((state) => state.app.isOnline);

    const sceneFactory = useMemo(() => {
        return (sceneName: string, initialGameInfo: GameInfo): SceneBase => {
            switch (sceneName) {
                case "start":
                    return new StartGameScene(
                        initialGameInfo,
                        (gameInfo: GameInfo) => {
                            setCurrentScene(sceneFactory("main", { ...gameInfo, needUpdateScore: isOnline }));
                        }
                    );
                case "main":
                    return new MainGameScene(
                        initialGameInfo,
                        (gameInfo: GameInfo) => {
                            setCurrentScene(sceneFactory("end", { ...gameInfo, needUpdateScore: isOnline }));
                        }
                    );
                case "end":
                    return new EndGameScene(
                        initialGameInfo,
                        (gameInfo: GameInfo) => {
                            setCurrentScene(sceneFactory("start", { ...gameInfo, needUpdateScore: isOnline }));
                        },
                        (currentTheme?: string) => {
                            if (typeof currentTheme === "undefined") {
                                history.push(`/leaderboard`);
                            } else {
                                history.push(`/leaderboard/${currentTheme}`);
                            }
                        }
                    );
                default:
                    throw new Error("Invalid scene name");
            }
        };
    }, [isOnline]);

    const [currentScene, setCurrentScene] = useState(sceneFactory("start", { currentTheme: null, needUpdateScore: isOnline }));

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
