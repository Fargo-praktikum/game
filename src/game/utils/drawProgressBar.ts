import roundRect from "./roundRect";

interface CommonProgress {
    context: CanvasRenderingContext2D;
    x: number;
    y: number;
}

interface ProgressLayerRectArgs extends CommonProgress {
    width: number;
    height: number;
    radius: number;
}

interface ProgressTextArgs extends CommonProgress {
    answers: boolean[];
    commonCount: number;
    textColor: string;
}

interface ProgressFill extends ProgressLayerRectArgs {
    answers: boolean[];
    commonCount: number;
}

interface ProgressBarArgs extends CommonProgress, ProgressLayerRectArgs, ProgressTextArgs {}

export const progressLayerRect = ({ context, x, y, width, height, radius }: ProgressLayerRectArgs): void => {
    context.save();
    // Определяем тени
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowBlur = 5;
    context.shadowColor = "#666";
    // контур
    roundRect(context, x, y, width, height, radius);
    context.restore();
};

export const progressText = ({ context, x, y, answers, commonCount, textColor }: ProgressTextArgs): void => {
    const fontSize = 15;
    context.save();
    context.font = `${ fontSize }px Inter`;
    context.fillStyle = textColor;
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.fillText(`${answers.length} / ${commonCount}`, x - 13, y + 10);
    context.restore();
};

export const progressBarRect = ({ context, x, y, width, height, radius, answers, commonCount }: ProgressFill): void => {
    const answerWidth = width / commonCount;

    answers.forEach((answer, ind) => {
        const startX = x + answerWidth * ind;
        const fillColor = answer ? "green" : "red";
        context.save();
        context.fillStyle = fillColor;
        roundRect(context, startX, y, answerWidth, height, radius, true);
        context.restore();
    });

};

export const drawProgressBar = ({ context, x, y, width, height, radius, answers, commonCount, textColor }: ProgressBarArgs): void => {
    progressLayerRect({ context, x, y, width, height, radius });
    progressBarRect({ context, x, y, width, height, radius, answers, commonCount });
    progressText({ context, x: x + width + 40, y, answers, commonCount, textColor });
};
