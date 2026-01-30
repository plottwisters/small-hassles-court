import { Backdrop } from "@gameObjects/common/Backdrop";
import { Avatar } from "@gameObjects/common/Avatar";
import { IMAGES } from "@game_data/AssetLoader";

import { extractAvatarData, extractPlayerData } from "@utils/GameStateHelper";
import { gameObjects } from "../../SceneManager";
import { ElevatorPanel } from "@gameObjects/elevator/ElevatorPanel";
import { Harry } from "@gameObjects/common/Harry";

export let elevatorPanelsDisabled = false;

let firstPlayer;
let panels = [];

export function buildElevator(gameState) {
    panels = [];
    gameObjects.push(new Backdrop(IMAGES['elevatorBG']));

    const { p1Avatar, p1Name, p2Avatar, p2Name } = extractAvatarData(gameState);
    const { isPlayer1 } = extractPlayerData(gameState);
    firstPlayer = isPlayer1;

    const elevatorAvatarScale = 0.8;

    panels.push(new ElevatorPanel(235, 270));
    panels.push(new ElevatorPanel(565, 270));

    gameObjects.push(...panels);

    gameObjects.push(new Avatar(p1Avatar, 190, 420, elevatorAvatarScale, p1Name));
    gameObjects.push(new Avatar(p2Avatar, 610, 420, elevatorAvatarScale, p2Name));
}

export function disableElevatorPanels() {
    for (const panel of panels) {
        panel.usable = false;
        panel.waiting = false;
        panel.img = IMAGES['elevatorPanel'];
    }
    elevatorPanelsDisabled = true;
}

export function enableElevatorPanel(gameState, setGameState) {
    if (firstPlayer) {
        panels[0].usable = true;
        panels[0].img = IMAGES['elevatorPanelSelected'];
        panels[0].gameState = gameState;
        panels[0].setGameState = setGameState;
        panels[0].resize();
    } else {
        panels[1].usable = true;
        panels[1].img = IMAGES['elevatorPanelSelected'];
        panels[1].gameState = gameState;
        panels[1].setGameState = setGameState;
        panels[1].resize();
    }
}

export function addHarry() {
    if (panels[0]) {
        gameObjects.push(new Harry(100, 470));
        firstPlayer = true;
        panels[0].isTour = true;
    } else {
        setTimeout(addHarry, 10);
    }
}