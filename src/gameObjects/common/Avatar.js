import { GameObject } from '../base/GameObject';
import { IMAGES } from '../../game_data/AssetLoader';
import { Sign } from './Sign';

const AVATAR_IMAGES = ['cucumber', 'glass', 'racket', 'cactus', 'fire', 'harry'];

const responseColorMap = {
    "*Good vibes*": "#FFD09F",
    "I'm sorry": "#AEE5FF"
};

export class Avatar extends GameObject {
    pic;
    playerName;

    responseSign;
    displayingResponseSign = false;

    constructor(pic, x, y, scale, playerName = '') {
        super(IMAGES[AVATAR_IMAGES[pic]]);

        this.x = x;
        this.y = y;
        this.pic = pic;

        this.scale = scale;

        if (pic === 5) {
            this.scale *= 0.73;
        }
        this.playerName = playerName;

        this.resize();
    }

    draw(ctx) {
        super.draw(ctx);
        if (this.playerName !== '') {

            const fontSize = 14 * window.devicePixelRatio;

            ctx.font = `${fontSize}px Medium`;
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';

            ctx.fillText(this.playerName, this.scaledX, this.scaledY + this.height * this.scale * 0.6);
        }

        if (this.displayingResponseSign) {
            this.responseSign.draw(ctx);
        }
    }

    resize() {
        super.resize();
        this.width = this.img.width * window.devicePixelRatio / 3;
        this.height = this.img.height * window.devicePixelRatio / 3;
    }

    addResponse(response) {
        this.displayingResponseSign = true;
        this.responseSign = new Sign(this.x, this.y - this.height * 0.2 * (this.pic === 5 ? 0.7 : 1), response, responseColorMap[response]);
        this.responseSign.resize();
    }
}