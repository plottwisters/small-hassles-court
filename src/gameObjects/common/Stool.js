import { IMAGES } from "../../game_data/AssetLoader";
import { GameObject } from "../base/GameObject";

export class Stool extends GameObject {

    constructor(x, y) {
        super(IMAGES['stool']);

        this.x = x;
        this.y = y;

        this.scale = 0.15;

        this.resize();
    }
}