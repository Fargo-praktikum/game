import roundRect from "./roundRect";
import { fullScreenButton } from "./fullScreenButton";


export const drawFullScreenButton = (
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    keyNumber?: string,
    scale?: number,
    strokeColor?: string
): void => {
    const mainColor = "#B7B7B7";

    fullScreenButton(context, keyNumber ? x + 20 : x, y, scale, strokeColor);

    if (keyNumber) {
        //Game with number near main card
        context.restore();
        roundRect(context, x, y, 15, 20, 3, false, false);
        context.fillStyle = "rgba(255, 255, 255, 0.5)";
        context.strokeStyle = mainColor;
        context.lineWidth = 1;
        context.stroke();

        //Text on little card
        const fontSizeLittleCard = 15;
        context.font = `${ fontSizeLittleCard }px Inter`;
        context.fillStyle = mainColor;
        context.textBaseline = "middle";
        context.textAlign = "center";
        context.fillText(`${ keyNumber }`, x + 7, y + 10);
    }
};
