import React, { useRef, useLayoutEffect, useState, useMemo, useEffect } from "react";
import { useHistory } from "react-router";
import { GameInfo } from "../../game/gameInfo";
import { SceneBase } from "../../game/sceneBase";
import { EndGameScene } from "../../game/Scenes/endGameScene";
import { MainGameScene } from "../../game/Scenes/mainGameScene";
import { StartGameScene } from "../../game/Scenes/startGameScene";
import { useAppSelector } from "../../hooks/storeHooks";
import User from "../../models/user";
import { merge } from "../../scripts/utils/myDash/merge";
import "./game.scss";

const sceneOptions = {
    fullScreen: {
        key: "0",
        parameters: {
            x: 10,
            y: 10,
            scale: 0.3,
            strokeColor: "white",
        }
    },
    theme: "",
    sound: {
        key: "/"
    }
};
const sceneOptionsBlack = merge(sceneOptions, {});
sceneOptionsBlack.fullScreen.parameters.strokeColor = "black";

export const Game = (): JSX.Element => {
    const theme = useAppSelector((state): string => state.game.theme);
    sceneOptions.theme = theme;

    const user = useAppSelector((state): User | null => state.auth.userInfo);
    const history = useHistory();

    const isOnline = useAppSelector((state) => state.app.isOnline);

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
                        sceneOptions: sceneOptionsBlack
                    },
                    () => user
                    );
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
    }, [isOnline]);

    const [currentScene, setCurrentScene] = useState(sceneFactory("start", { currentTheme: null, needUpdateScore: isOnline }));

    //update canvas size if window resize happen
    const size = useWindowSize();

    let width = Math.floor(size[0] * 0.8);
    if (width > 1000) width = 1000;
    let height = Math.floor(size[1] * 0.8);
    if (height > 700) height = 700;
    const canvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {

        const keyHandler = ({ key }: { key: string }) => {
            currentScene.keyUpHandler(key);
        };

        const clickHandler = (e: any) => {
            currentScene.gameObjects.forEach(el => {
                if (clickInObj({ x1: el.x1, x2: el.x2, y1: el.y1, y2: el.y2 },{ x: e.layerX, y: e.layerY })) {
                    currentScene.keyUpHandler(el.key);
                }
            });
        };
        document.addEventListener("click", clickHandler );
        document.addEventListener("keyup", keyHandler);
        // Remove event listeners on cleanup
        return () => {
            document.removeEventListener("click", clickHandler );
            document.removeEventListener("keyup", keyHandler);
        };

    }, [currentScene]);

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

    return <canvas className="gameCanvas" ref={canvas} width={width} height={height} />;
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

function clickInObj({ x1, y1, x2, y2 }: {x1: number, y1: number, x2: number, y2: number}, { x, y }: {x: number, y: number}) {
    return (x > x1 && x < x2) && (y > y1 && y < y2);
}
