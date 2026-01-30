import { Clickable } from "../base/Clickable";
import { IMAGES } from "../../game_data/AssetLoader";
import { Sign } from "../common/Sign";
import { nextAction } from "../../game_data/SceneHelper";

const PANEL_NEXT_ACTION = 'tags';

const onClick = (panel) => {
    panel.usable = false;
    panel.img = IMAGES['elevatorPanel'];
        
    if (panel.setGameState && !panel.isTour) {
        panel.setGameState({
            ...panel.gameState,
            currentAction: PANEL_NEXT_ACTION
        });
    }

    if (panel.isTour) {
        panel.setGameState(nextAction(panel.gameState));
    }
}

export class ElevatorPanel extends Clickable {

    waiting = false;
    usable = false;
    sign;
    isTour = false;

    gameState;
    setGameState;

    constructor(x, y) {
        super(IMAGES['elevatorPanel'], x, y, () => onClick(this));

        this.scale = 0.4; 

        this.sign = new Sign(x, y - (this.width * this.scale * 0.18), "Click me");
    }
    
    draw(ctx) {
        super.draw(ctx);
        if (this.usable) {
            this.sign.draw(ctx);
        }
    }
}