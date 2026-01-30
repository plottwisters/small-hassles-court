import { NameInput } from "@components/foyer/NameInput";
import { AvatarSelect } from "@components/foyer/AvatarSelect";

import '@styles/Foyer.css';
import { addAvatar, addSelectables, addBothAvatars, removeSelectables, showDoor, menuReturn } from "../vanilla/Foyer";
import { useContext, useState } from "react";
import { GameStateContext, SetGameStateContext } from "../../contexts/GameStateContext";
import { Conditions } from "../../components/foyer/Conditions";
import { JoinMenu } from "../../components/foyer/JoinMenu";


export function Foyer({ action, status, gameCode }) {
    const gameState = useContext(GameStateContext);
    const setGameState = useContext(SetGameStateContext);
    const [showJoinMenu, setShowJoinMenu] = useState(false);
    let currentDisplay = <></>;

    console.log(action);

    switch (action) {
        case 'conditions': 
            currentDisplay = <Conditions />;
            break;
        case 'name':
            currentDisplay = <NameInput />;
            break;
        case 'avatar':
            currentDisplay = <AvatarSelect />;
            break;
        case 'avatarJoint':
            currentDisplay = <AvatarSelect />;
            break;
        case 'foyerEnd':
            addAvatar(gameState);
            break;
        case 'menuSelect':
            addSelectables(setShowJoinMenu, gameState, setGameState);
            break;
        case 'tourIntro':
            removeSelectables();
            break;
        case 'tourDoor':
            showDoor(gameState, setGameState);
            break;
        case 'finalDialogueAgree':
            addBothAvatars(gameState);
            break;
        case 'finalDialogueNoAgree':
            addBothAvatars(gameState);
            break;
        case 'tourEnd': 
            addAvatar(gameState);
            menuReturn(gameState, setGameState, setShowJoinMenu);
            break;
    }

    if (showJoinMenu) {
        currentDisplay = <JoinMenu 
            status={status}
            gameCode={gameCode}
        />
    }

    return currentDisplay;
}