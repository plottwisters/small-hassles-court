import { Backdrop } from '../../gameObjects/common/Backdrop';
import { Avatar } from '../../gameObjects/common/Avatar';
import { IMAGES } from '../../game_data/AssetLoader';
import { gameObjects } from '../../SceneManager';
import { ElevatorDoor } from '../../gameObjects/foyer/ElevatorDoor';
import { Harry } from '../../gameObjects/common/Harry';
import { extractAvatarData } from '../../utils/GameStateHelper';
import { nextAction } from '../../game_data/SceneHelper';

let harry;
let elevatorDoor;

let selectablesAdded = false;

const foyerAvatarScale = 0.9;

export function buildFoyer() {
    gameObjects.push(new Backdrop(IMAGES['foyerBG']));
    harry = new Harry(210, 440);
    elevatorDoor = new ElevatorDoor();
    elevatorDoor.hidden = true;
    gameObjects.push(harry);
    gameObjects.push(elevatorDoor);
}

export function addAvatar(gameState) {
    gameObjects.push(new Avatar(gameState.avatar, 580, 430, foyerAvatarScale));
}

export function addBothAvatars(gameState) {
    const { p1Avatar, p1Name, p2Avatar, p2Name } = extractAvatarData(gameState);

    gameObjects.push(new Avatar(p1Avatar, 480, 430, foyerAvatarScale, p1Name));
    gameObjects.push(new Avatar(p2Avatar, 580, 430, foyerAvatarScale, p2Name));
}

export function addSelectables(displayFunc, gameState, setGameState) {
    elevatorDoor.hidden = false;
    elevatorDoor.clickEvent = () => displayFunc(true);

    harry.makeSelectable(gameState, setGameState);
}

export function removeSelectables() {
    elevatorDoor.hidden = true;
    harry.makeUnselectable();
}

export function showDoor(gameState, setGameState) {
    elevatorDoor.hidden = false;
    elevatorDoor.clickEvent = () => {
        setGameState(nextAction(gameState));
    };
}

export function menuReturn(gameState, setGameState, displayFunc) {
    elevatorDoor.hidden = false;
    elevatorDoor.clickEvent = () => displayFunc(true);
    harry.makeSelectable(gameState, setGameState);
}