import { Backdrop } from "../../gameObjects/common/Backdrop";
import { Avatar } from "../../gameObjects/common/Avatar";
import { IMAGES } from "../../game_data/AssetLoader";
import { AVATAR_CUCUMBER, AVATAR_FIRE } from '../../game_data/config';
import { Table } from "../../gameObjects/court/Table";

import { gameObjects } from "../../SceneManager";
import { extractAvatarData } from "@utils/GameStateHelper";
import { Harry } from "../../gameObjects/common/Harry";
import { GameObject } from "../../gameObjects/base/GameObject";
import { Stool } from "../../gameObjects/common/Stool";
import { Tapestry } from "../../gameObjects/court/Tapestry";

export let tableAdded = false;

let player1Avatar;
let player2Avatar;
let harry;
let tapestry;
let observerAvatar;

const TOUR_SETUP_ACTIONS = [
    'tourCourtIntro',
    'tourPositionFeedback',
    'tourCourtClosing'
]

export function buildCourt(gameState) {
    gameObjects.push(new Backdrop(IMAGES['courtBG']));

    const { p1Avatar, p2Avatar } = extractAvatarData(gameState);
    const courtAvatarScale = 0.5;

    player1Avatar = new Avatar(p1Avatar, 320, 330, courtAvatarScale)
    player2Avatar = new Avatar(p2Avatar, 480, 330, courtAvatarScale);

    gameObjects.push(player1Avatar);
    gameObjects.push(player2Avatar);

    if (!TOUR_SETUP_ACTIONS.includes(gameState.currentAction)) {
        harry = new Harry(140, 460);
        gameObjects.push(harry);
    } else {
        observerAvatar = new Avatar(gameState.avatar, 100, 460, 0.9);
        gameObjects.push(observerAvatar);
    }
}

export function addTable() {
    if (player1Avatar && player2Avatar) {
        gameObjects.push(new Table());

        const stool1 = new Stool(280, 448);
        gameObjects.splice(1, 0, stool1);

        const stool2 = new Stool(520, 448);
        gameObjects.splice(1, 0, stool2);

        const tableAvatarScale = 0.8;

        console.log(player1Avatar);

        player1Avatar.moveTo(280, 315);
        player1Avatar.scale = tableAvatarScale;
        if (player1Avatar.pic === 5) {
            player1Avatar.scale *= 0.7;
        }

        player2Avatar.moveTo(520, 315);
        player2Avatar.scale = tableAvatarScale;

        tapestry = new Tapestry();
        gameObjects.push(tapestry);

        tableAdded = true;
    } else {
        setTimeout(addTable, 10);
    }
}

export function makeTapestrySelectable(isTour = false, gameState = null, setGameState = null) {
    tapestry.selectable = true;
    tapestry.img = IMAGES['tapestrySelected'];

    if (isTour) {
        tapestry.gameState = gameState;
        tapestry.setGameState = setGameState;
        tapestry.isTour = true;
    }
}

export function addAvatarResponses(avatar1Response, avatar2Response) {
    if (player1Avatar && player2Avatar) {
        player1Avatar.addResponse(avatar1Response);
        player2Avatar.addResponse(avatar2Response);
    } else {
        setTimeout(() => addAvatarResponses(avatar1Response, avatar2Response), 10);
    }
}