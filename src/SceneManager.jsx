import { StartMenu } from "./scenes/react/StartMenu";

import { Foyer } from "./scenes/react/Foyer";
import { buildFoyer } from "./scenes/vanilla/Foyer";

import { Elevator } from "./scenes/react/Elevator";
import { buildElevator } from "./scenes/vanilla/Elevator";

import { Court } from './scenes/react/Court';
import { buildCourt } from "./scenes/vanilla/Court";
import { buildTapestry } from "./scenes/vanilla/Tapestry";
import { AdLib } from "./components/tapestry/AdLib";
import { Tapestry } from "./scenes/react/Tapestry";

export let gameObjects = [];
export let backgroundColor = "#888888";

export function initializeScene(sceneName, gameState) {
    gameObjects = [];

    switch (sceneName) {
        case 'menu':
            backgroundColor = "#2D1A83";
            break;
        case 'foyer':
            backgroundColor = "#000000";
            buildFoyer();
            break;
        case 'elevator':
            buildElevator(gameState);
            break;
        case 'court':
            buildCourt(gameState);
            break;
        case 'tapestry':
            backgroundColor = "#AB9BDF";
            buildTapestry(gameState);
            break;
        case 'endScreen':
            backgroundColor = "#fff";
            break;
    }
}

// returns the appropriate contents for a given scene provided the current game state
export function getPageContents(sceneName, gameState) {
    let pageContents;

    switch (sceneName) {
        case 'menu':
            pageContents = <StartMenu/>;
            break;
        case 'foyer':
            pageContents = <Foyer action={gameState.currentAction} status={gameState.connectionStatus} gameCode={gameState.gameCode} />;
            break;
        case 'elevator':
            pageContents = <Elevator action={gameState.currentAction} />;
            break;
        case 'court':
            pageContents = <Court action={gameState.currentAction} />;
            break;
        case 'tapestry':
            pageContents = <Tapestry action={gameState.currentAction} />;
            break;
        case 'endScreen':
            break;
    }

    return { pageContents };
}