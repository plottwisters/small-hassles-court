import { socket } from "../../socket";
import { Clickable } from "../base/Clickable";
import { IMAGES } from "@game_data/AssetLoader";
import { Sign } from "../common/Sign";
import { nextAction } from "../../game_data/SceneHelper";

const handleClick = (tapestry) => {
    if (!tapestry.waiting && tapestry.selectable && !tapestry.isTour) {
        socket.emit('game:input', null, false);
        tapestry.waiting = true;
        tapestry.sign.text = "...";
    } else if (tapestry.isTour && tapestry.selectable) {
        tapestry.setGameState(nextAction(tapestry.gameState));
    }
}

export class Tapestry extends Clickable {
    selectable = false;
    waiting = false;
    isTour;

    gameState;
    setGameState;

    constructor(isTour) {
        const tapestryX = 400;
        const tapestryY = 420;

        super(IMAGES['tapestry'], tapestryX, tapestryY, () => handleClick(this));

        this.isTour = isTour;
        this.scale = 0.14;
        this.sign = new Sign(tapestryX, tapestryY - this.height * this.scale * 0.05, "Click me");
    }

    draw(ctx) {
        super.draw(ctx);
        if (this.selectable) {
            this.sign.draw(ctx);
        }
    }
}