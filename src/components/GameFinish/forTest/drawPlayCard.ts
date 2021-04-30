import roundRect from "./roundRect";

type cardParametersType = {
    width: number,
    height: number,
    radius: number,
    color: string,
};

export const drawPlayCard = (context: CanvasRenderingContext2D, x: number, y: number, text?: string,
    keyNumber?: string, cardParameters?: cardParametersType): void => {
    let width = 160;
    let height = 190;
    let radius = 20;
    let lightGrey = "#B7B7B7";

    if (cardParameters) {
        width = cardParameters.width;
        height = cardParameters.height;
        radius = cardParameters.radius;
        lightGrey = cardParameters.color;
    }

    //Main card
    roundRect(context, x, y, width, height, radius, false, false);
    context.save();
    context.fillStyle = "white";
    context.shadowColor = lightGrey;
    context.shadowBlur = 6;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 1;
    context.fill();

    //Game with number near main card
    if (keyNumber) {
        context.restore();
        roundRect(context, x - 20, y, 15, 20, 3, true, false);
        context.fillStyle = "rgba(255, 255, 255, 0.5)";
        context.strokeStyle = lightGrey;
        context.lineWidth = 1;
        context.stroke();
    }

    //Main text
    if (text) {
        const fontSize = 20;
        context.font = `${fontSize}px Inter`;
        context.fillStyle = "black";
        context.textBaseline = "middle";
        context.textAlign = "center";
        const textTest: string[] = divideIntoLines(context, text, width - 20);
        if (textTest.length > 1) {
            for (let i = 0; i < textTest.length; i++)
                context.fillText(textTest[i], x + (width / 2),
                    y + (i * fontSize) + (height / 2) - ((fontSize * (textTest.length - 1)) / 2));
        } else {
            context.fillText(`${text}`, x + (width / 2), y + (height / 2));
        }
    }

    //Text on little card
    if (keyNumber) {
        const fontSizeLittleCard = 15;
        context.font = `${fontSizeLittleCard}px Inter`;
        context.fillStyle = lightGrey;
        context.textBaseline = "middle";
        context.textAlign = "center";
        context.fillText(`${keyNumber}`, x - 13, y + 10);
    }
};

function divideIntoLines(context: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
    const words = text.split(" ");
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = context.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}
