import { divideTextIntoLines } from "./divideTextIntoLines";
import roundRect from "./roundRect";

export const drawPlayCard = (context: CanvasRenderingContext2D, x: number, y: number, text?: string, keyNumber?: string):void => {
    const width = 160;
    const height = 190;
    const radius = 20;
    const lightGrey = "#B7B7B7";

    //Main card
    roundRect(context, x, y, width, height, radius, false, false);
    context.save();
    context.fillStyle = "white";
    context.shadowColor = lightGrey;
    context.shadowBlur = 6;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 1;
    context.fill();

    if (keyNumber) {
        //Game with number near main card
        context.restore();
        roundRect(context, x - 20, y, 15, 20, 3, false, false);
        context.fillStyle = "rgba(255, 255, 255, 0.5)";
        context.strokeStyle = lightGrey;
        context.lineWidth = 1;
        context.stroke();

        //Text on little card
        const fontSizeLittleCard = 15;
        context.font = `${ fontSizeLittleCard }px Inter`;
        context.fillStyle = lightGrey;
        context.textBaseline = "middle";
        context.textAlign = "center";
        context.fillText(`${ keyNumber }`, x - 13, y + 10);
    }

    //Main text
    if (text) {
        const fontSize = 20;
        context.font = `${ fontSize }px Inter`;
        context.fillStyle = "black";
        context.textBaseline = "middle";
        context.textAlign = "center";
        const textTest: string[] = divideTextIntoLines(context, text, width - 20);
        if( textTest.length > 1 ) {
            for (let i = 0; i<textTest.length; i++)
                context.fillText(textTest[i], x + (width / 2),
                    y + (i * fontSize) + (height / 2) - ((fontSize * (textTest.length - 1)) / 2));
        } else {
            context.fillText(`${ text }`, x + (width / 2), y + (height / 2));
        }
    }

    //Text on little card
    if (keyNumber) {
        const fontSizeLittleCard = 15;
        context.font = `${ fontSizeLittleCard }px Inter`;
        context.fillStyle = lightGrey;
        context.textBaseline = "middle";
        context.textAlign = "center";
        context.fillText(`${ keyNumber }`, x - 13, y + 10);
    }
};
