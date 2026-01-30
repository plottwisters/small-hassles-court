import { Backdrop } from "../../gameObjects/common/Backdrop";
import { Avatar } from "../../gameObjects/common/Avatar";
import { IMAGES } from "../../game_data/AssetLoader";
import { AVATAR_CUCUMBER, AVATAR_FIRE } from '../../game_data/config';
import { gameObjects } from "../../SceneManager";
import { extractAvatarData } from "../../utils/GameStateHelper";
import { Stool } from "../../gameObjects/common/Stool";

export function buildTapestry(gameState) {
    const tapestryAvatarScale = 0.64;

    const { p1Avatar, p2Avatar } = extractAvatarData(gameState);

    const player1Avatar = new Avatar(p1Avatar, 60, 430, tapestryAvatarScale)
    const player2Avatar = new Avatar(p2Avatar, 740, 430, tapestryAvatarScale);

    const stool1 = new Stool(740, 550);
    const stool2 = new Stool(60, 550);

    gameObjects.push(stool1, stool2, player1Avatar, player2Avatar);
}