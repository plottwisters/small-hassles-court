import { GameObject } from "../base/GameObject";

export class Sign extends GameObject {
    text;
    color = "#fff";

    constructor (x, y, text, color) {
        super();
        this.x = x;
        this.y = y;
        this.text = text;
        if (color) this.color = color;
    }

    draw(ctx) {
        this.resize();
        const fontSize = 14;
        ctx.font = `${fontSize * window.devicePixelRatio}px Medium`;
        ctx.textAlign = 'center';
        const textSize = ctx.measureText(this.text);

        const boxWidth = textSize.width + 20 * window.devicePixelRatio;
        const boxHeight = 34 * window.devicePixelRatio;

        this.width = boxWidth;
        this.height = boxHeight;

        ctx.save();
        ctx.translate(this.scaledX, this.scaledY);

        ctx.fillStyle = this.color;
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2 * window.devicePixelRatio;
        ctx.beginPath();
        ctx.roundRect(
            -boxWidth / 2, 
            -boxHeight / 2 - ((fontSize - 4) * 0.4 * window.devicePixelRatio), 
            boxWidth, 
            boxHeight, 
            3 * window.devicePixelRatio
        );
        ctx.stroke();
        ctx.beginPath();
        ctx.roundRect(
            -boxWidth / 2, 
            -boxHeight / 2 - fontSize * 0.4 * window.devicePixelRatio, 
            boxWidth, 
            boxHeight, 
            3 * window.devicePixelRatio
        );
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#000";
        ctx.fillText(this.text, 0, 0);

        ctx.restore();
    }


} 
