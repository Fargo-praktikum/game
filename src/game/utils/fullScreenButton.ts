export function fullScreenButton(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    scale?: number,
    strokeColor?: string
): void {
    if (typeof scale === "undefined") {
        scale = 1;
    }
    if (typeof strokeColor === "undefined") {
        strokeColor = "white";
    }

    ctx.save();

    if (scale > 1) ctx.translate(- (scale - 1) * x, - (scale - 1) * y);
    else ctx.translate((1 - scale) * x, (1 - scale) * y);
    ctx.scale(scale,scale);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 100 / 3, y);
    ctx.moveTo(x + 2 * 100 / 3, y);
    ctx.lineTo(x + 100, y);
    ctx.lineTo(x + 100, y + 100 / 3);
    ctx.moveTo(x + 100, y + 2 * 100 / 3);
    ctx.lineTo(x + 100, y + 100);
    ctx.lineTo(x + 2 * 100 / 3, y + 100);
    ctx.moveTo(x + 100 / 3, y + 100);
    ctx.lineTo(x, y + 100);
    ctx.lineTo(x, y + 2 * 100 / 3);
    ctx.moveTo(x, y + 100 / 3);
    ctx.lineTo(x, y);
    ctx.strokeStyle = strokeColor;
    ctx.stroke();

    ctx.restore();
}
