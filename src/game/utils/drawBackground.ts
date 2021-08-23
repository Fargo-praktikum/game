export function drawBackground(context: CanvasRenderingContext2D, width: number, height: number, stars?: BackGroundStar[]): void {

    // TODO цвета нужно вынести в какие-то "стили"
    const gradient = context.createLinearGradient((width / 2), (height / 2), 0,0);
    gradient.addColorStop(0, "#033d5e");
    gradient.addColorStop(.5, "#00111e");
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    if (stars) {
        drawStars(context, stars);
    }
}

export interface BackGroundStar {
    hue: number;
    x: number;
    y: number;
    size: number;
    opacityOne: number;
    opacityTwo: number;
}

export function generateStars(width: number, height: number): BackGroundStar[] {

    const result: BackGroundStar[] = [];

    const xMax = width;
    const yMax = height;

    const hmTimes = Math.round(xMax + yMax);

    for (let i = 0; i <= hmTimes; i++) {

        const star: BackGroundStar = {
            x: Math.floor((Math.random() * xMax) + 1),
            y: Math.floor((Math.random() * yMax) + 1),
            size: Math.floor((Math.random() * 2) + 1),
            opacityOne: Math.floor((Math.random() * 9) + 1),
            opacityTwo: Math.floor((Math.random() * 9) + 1),
            hue: Math.floor((Math.random() * 360)+1)
        };

        result.push(star);
    }

    return result;
}

function drawStars(context: CanvasRenderingContext2D, stars: BackGroundStar[]): void {

    stars.forEach((star) => {
        if (star.size > 1) {
            context.shadowBlur = Math.floor((Math.random() * 15) + 5);
            context.shadowColor = "white";
        }
        context.fillStyle = `hsla(${ star.hue }, 30%, 80%, .${ star.opacityOne + star.opacityTwo })`;
        context.fillRect(star.x, star.y, star.size, star.size);
    });
}
