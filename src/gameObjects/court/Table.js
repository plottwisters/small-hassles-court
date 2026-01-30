import { socket } from "../../socket";
import { IMAGES } from "@game_data/AssetLoader";
import { GameObject } from "../base/GameObject";

const TABLE_SCALE = 0.14;

const handleClick = (tapestry) => {
    if (tapestry.state === 'down') {
        tapestry.state = 'up';
        tapestry.img = IMAGES['tapestrySelected'];

        tapestry.width = tapestry.img.width * window.devicePixelRatio;
        tapestry.height = tapestry.img.height * window.devicePixelRatio;

        tapestry.waiting = true;
        socket.emit('game:input');
    }
}

export class Table extends GameObject {
    state = 'down';
    waiting = false;

    constructor() {
        super(IMAGES['table']);
        this.x = 400;
        this.y = 520;

        this.resize();
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.scaledX, this.scaledY);
        ctx.scale(TABLE_SCALE, TABLE_SCALE);
        ctx.drawImage(this.img, -this.width / 2, -this.height, this.width, this.height);
        ctx.restore();

        if (this.waiting) {
            ctx.fillText('Waiting...', this.scaledX, this.scaledY - this.height / 1.6 * TABLE_SCALE);
        }
    }

    // adjust hitbox on handleClickEvent because this component is rendered differently
    handleClickEvent(mouseX, mouseY) {
        if ((Math.abs(mouseX - this.scaledX) < this.width / 2 * TABLE_SCALE) &&
            (mouseY < this.scaledY && mouseY > this.scaledY - this.height * TABLE_SCALE)) {
                this.clickEvent();
        }
    }
}