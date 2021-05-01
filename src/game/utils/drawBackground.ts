export function drawBackground(context: CanvasRenderingContext2D, width: number, height: number): void {

    // TODO цвета нужно вынести в какие-то "стили"
    const gradient = context.createLinearGradient((width / 2), (height / 2), 0,0);
    gradient.addColorStop(0, "#033d5e");
    gradient.addColorStop(.5, "#00111e");
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    drawStars(context, width, height);

}

function drawStars(context: CanvasRenderingContext2D, width: number, height: number): void {
    const xMax = width;
    const yMax = height;

    const hmTimes = Math.round(xMax + yMax);

    for(let i = 0; i <= hmTimes; i++) {
        const randomX = Math.floor((Math.random() * xMax) + 1);
        const randomY = Math.floor((Math.random() * yMax) + 1);
        const randomSize = Math.floor((Math.random() * 2) + 1);
        const randomOpacityOne = Math.floor((Math.random() * 9) + 1);
        const randomOpacityTwo = Math.floor((Math.random() * 9) + 1);
        const randomHue = Math.floor((Math.random() * 360)+1);
        if(randomSize>1) {
            context.shadowBlur = Math.floor((Math.random() * 15) + 5);
            context.shadowColor = "white";
        }
        context.fillStyle = `hsla(${ randomHue }, 30%, 80%, .${ randomOpacityOne + randomOpacityTwo })`;
        context.fillRect(randomX, randomY, randomSize, randomSize);
    }
}
