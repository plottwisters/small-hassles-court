import { GAME_WIDTH, GAME_HEIGHT } from "../../game_data/config";
import { GameObject } from "../base/GameObject";

export class Backdrop extends GameObject {
    constructor(img) {
        super(img);
        this.resize();
    }

    resize() {
        this.x = GAME_WIDTH / 2;
        this.y = GAME_HEIGHT / 2;
        super.resize();
        this.width = GAME_WIDTH * window.devicePixelRatio;
        this.height = GAME_HEIGHT * window.devicePixelRatio;
    }
}