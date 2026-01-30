import { GameObject } from "./GameObject";

export class Clickable extends GameObject {
    clickEvent = () => {};

    constructor(img, x, y, clickCallback) {
        super(img);
        this.x = x;
        this.y = y;

        this.resize();
        this.clickEvent = clickCallback;
    }

    resize() {
        this.width = this.img.width * window.devicePixelRatio;
        this.height = this.img.height * window.devicePixelRatio;
        super.resize();
    }

    handleClickEvent(mouseX, mouseY) {
        if (((Math.abs(mouseX - this.scaledX) < this.width / 2 * this.scale) &&
            (Math.abs(mouseY - this.scaledY) < this.height / 2 * this.scale)) || 
            (this.sign && Math.abs(mouseX - this.sign.scaledX) < this.sign.width / 2 &&
            Math.abs(mouseY - this.sign.scaledY) < this.sign.height / 1.5)) {
                this.clickEvent();
        }
    }
}