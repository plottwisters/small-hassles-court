import { IMAGES } from "../../game_data/AssetLoader";
import { nextAction, startTour } from "../../game_data/SceneHelper";
import { Clickable } from "../base/Clickable";
import { Sign } from "./Sign";


export class Harry extends Clickable {
    selectable = false;
    sign;

    constructor(x, y) {
        super(IMAGES['harry'], x, y, () => {});
        this.scale = 0.2;
        this.sign = new Sign(x + 15, y + 40, "Take a tour");
    }

    makeSelectable(gameState, setGameState) {
        this.img = IMAGES['harry-selected'];
        this.selectable = true;
        this.resize();

        this.clickEvent = () => {
            startTour();
            setGameState(nextAction(gameState));
        };
    }

    makeUnselectable() {
        this.img = IMAGES['harry'];
        this.selectable = false;
        this.resize();
    }

    draw(ctx) {
        super.draw(ctx);
        if (this.selectable) {
            this.sign.draw(ctx);
        }
    }
}