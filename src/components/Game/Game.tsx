import React, { useRef, useLayoutEffect, useState, useMemo, useEffect } from "react";
import { SceneBase } from "../../game/sceneBase";
import { MainGameScene } from "../../game/Scenes/mainGameScene";
//import { MainGameScene } from "../../game/Scenes/mainGameScene";
import { StartGameScene } from "../../game/Scenes/startGameScene";
//import { StartGameScene } from "../../game/Scenes/startGameScene";
//import { drawPlayCard } from "../../game/drawPlayCard/drawPlayCard";
//import { setGameInfo } from "../../scripts/redux/gameReducer";
//import store from "../../scripts/redux/store";

export const Game = (): JSX.Element => {

    //const [currentScene] = useState(new MainGameScene());//(new StartGameScene());
    const [currentSceneName, setCurrentSceneName] = useState("start");
    const [ ,setNeedUpdate] = useState(false);
    //const [currentGameTheme, setCurrentGameTheme] = useState(null);

    const sceneFactory = useMemo(() => {
        return (sceneName: string): SceneBase => {
            switch (sceneName) {
                case "start":
                    return new StartGameScene(
                        () => {
                            setCurrentSceneName("main");
                        },
                        () => {
                            setNeedUpdate(true);
                        }
                    );
                case "main":
                    return new MainGameScene(
                        () => {
                            setCurrentSceneName("start");
                        },
                        () => {
                            setNeedUpdate(true);
                        }
                    );
                default:
                    throw new Error("Invalid scene name");
            }
        };
    }, []);

    const [currentScene, setCurrentScene] = useState(sceneFactory(currentSceneName));

    useEffect(() => {

        const scene = sceneFactory(currentSceneName);

        setCurrentScene(scene);

        const handler = ({ key }: { key: string }) => {
            scene.keyDownHandler(key);
        }

        window.addEventListener("keydown", handler);
        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener("keydown", handler);
        };

    }, [currentSceneName]);

    const width = window.innerWidth;
    const height = window.innerHeight;
    const pixelRatio = window.devicePixelRatio;

    const canvas = useRef<HTMLCanvasElement>(null);

    useWindowSize();

    useLayoutEffect(() => {

        console.log("CURRENT SCENE", currentSceneName);

        if (canvas.current === null) throw new Error("Could not get current canvas");
        const context = canvas.current.getContext("2d");
        if (context === null) throw new Error("Could not get context");

        currentScene.render(context, width, height);
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
