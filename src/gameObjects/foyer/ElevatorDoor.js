import { Clickable } from "../base/Clickable";
import { IMAGES } from "../../game_data/AssetLoader";
import { Sign } from "../common/Sign";

export let joinMenuVisible = false;

export class ElevatorDoor extends Clickable {
    sign;
    hidden = false;

    constructor(displayFunc) {
        const doorX = 401;
        const doorY = 302;

        super(IMAGES['foyerElevator'], doorX, doorY, () => displayFunc(true));
        this.scale = 0.32;

        this.sign = new Sign(doorX, doorY, "Start a session");
    }
    
    draw(ctx) {
        if (!this.hidden) {
            super.draw(ctx);
            this.sign.draw(ctx);
        }
    }

    handleClickEvent(mouseX, mouseY) {
        if (!this.hidden) {
            super.handleClickEvent(mouseX, mouseY);
        }
    }
}