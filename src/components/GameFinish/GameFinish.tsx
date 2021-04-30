import React, { useRef, useLayoutEffect, useState } from "react";
import { drawPlayCard } from "./forTest/drawPlayCard";
import { gameStatusType, setGameStatus } from "../../scripts/redux/gameReducer";
import store from "../../scripts/redux/store";

export const GameFinish = (): JSX.Element => {
    const keyPressData = {
        Escape: "main",
        Enter: "start",
    };
    useKeyPress(keyPressData);

    const width = window.innerWidth;
    const height = window.innerHeight;
    const pixelRatio = window.devicePixelRatio;

    const canvas = useRef<HTMLCanvasElement>(null);

    useWindowSize();

    useLayoutEffect(() => {
        if (canvas.current === null) throw new Error("Could not get current canvas");
        const context = canvas.current.getContext("2d");
        if (context === null) throw new Error("Could not get context");

        const gradient = context.createLinearGradient((width/2),(height/2), 0,0);
        gradient.addColorStop(0, "#033d5e");
        gradient.addColorStop(.5, "#00111e");
        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);

        stars(context, width, height);

        const screenLocation = {
            x: width / 2,
            y: height / 2
        };

        const fontSizeLittleCard = 23;
        context.font = `bold ${fontSizeLittleCard}px Inter`;
        context.fillStyle = "white";
        context.textBaseline = "middle";
        context.textAlign = "center";
        context.shadowBlur = 2;
        context.fillText("Игра завершена, хотите начать заново?", screenLocation.x, screenLocation.y - 90);

        drawPlayCard(context, screenLocation.x - 300, screenLocation.y,
            "Завершить", undefined, { width: 250, height: 80, radius: 20, color: "#B7B7B7" });
        drawPlayCard(context, screenLocation.x + 50, screenLocation.y,
            "Начать", undefined, { width: 250, height: 80, radius: 20, color: "#B7B7B7" });
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

function stars(context: CanvasRenderingContext2D, width: number, height: number): void {
    const xMax = width;
    const yMax = height;

    const hmTimes = Math.round(xMax + yMax);

    for(let i=0; i<=hmTimes; i++) {
        const randomX = Math.floor((Math.random()*xMax)+1);
        const randomY = Math.floor((Math.random()*yMax)+1);
        const randomSize = Math.floor((Math.random()*2)+1);
        const randomOpacityOne = Math.floor((Math.random()*9)+1);
        const randomOpacityTwo = Math.floor((Math.random()*9)+1);
        const randomHue = Math.floor((Math.random()*360)+1);
        if(randomSize>1) {
            context.shadowBlur = Math.floor((Math.random()*15)+5);
            context.shadowColor = "white";
        }
        context.fillStyle = `hsla(${ randomHue }, 30%, 80%, .${ randomOpacityOne + randomOpacityTwo })`;
        context.fillRect(randomX, randomY, randomSize, randomSize);
    }
}

const useKeyPress = (targetKey: { [key: string]: string; }): void => {
    const downHandler = ({ key }: { key: string }) => {
        if (key in targetKey){
            // меняем статус игры
            store.dispatch(setGameStatus( targetKey[key] as gameStatusType ));

            //TODO Тут будет логика для очистки канваса и загрузки игры
            console.log(`Pressed ${key} go to ${targetKey[key]}`);
        }
    };

    React.useEffect(() => {
        window.addEventListener("keydown", downHandler);
        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener("keydown", downHandler);
        };
    }, []);
};

