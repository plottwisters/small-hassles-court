import React, { useState, useEffect } from "react";
import { socket } from "./socket";
import GameCanvas from "./GameCanvas";
import { buildSocketListeners } from "./sockets";
import { getPageContents, initializeScene } from "./SceneManager";
import { preload } from "./game_data/AssetLoader";
import DialogueBox from "./scenes/react/DialogueBox";
import Disconnection from "./components/common/Disconnection";


import { GAME_WIDTH, GAME_HEIGHT } from "./game_data/config";
import { GameStateContext, SetGameStateContext } from "./contexts/GameStateContext";


function SmallHasslesCourt() {
    const [gameLoaded, setGameLoaded] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState('connecting');

    const [gameState, setGameState] = useState({ scene: 'menu' });
    const [dialogueLines, setDialogueLines] = useState([]);

    // init logic
    useEffect(() => {
        // set up socket.io connection and connect to state variables
        buildSocketListeners({ gameState, setGameState, setConnectionStatus });

        return () => {
            socket.removeAllListeners();
        }
    }, [gameState]);

    useEffect(() => {
        preload(
            // Backdrops
            { name: 'foyerBG', src: '/assets/backgrounds/foyerBG.png' },
            { name: 'elevatorBG', src: '/assets/backgrounds/elevatorBG.png' },
            { name: 'courtBG', src: '/assets/backgrounds/courtBG.png' },
            { name: 'tagBoardBG', src: '/assets/backgrounds/tagBoardBG.png' },

            // Avatars
            { name: 'cucumber', src: '/assets/avatars/cucumber.png' },
            { name: 'glass', src: '/assets/avatars/glass.png' },
            { name: 'racket', src: '/assets/avatars/racket.png' },
            { name: 'cactus', src: '/assets/avatars/cactus.png' },
            { name: 'fire', src: '/assets/avatars/fire.png' },

            { name: 'harry', src: '/assets/harry.png' },
            { name: 'harry-selected', src: '/assets/harry-selected.png' },
            { name: 'elevatorButtons', src: '/assets/elevatorButtons.png' },
            { name: 'stool', src: '/assets/stool.png' },
            { name: 'table', src: '/assets/table.png' },

            // Clickables
            { name: 'foyerElevator', src: '/assets/foyerElevator.png' },
            { name: 'elevatorPanel', src: '/assets/elevatorPanel.png' },
            { name: 'elevatorPanelSelected', src: '/assets/elevatorPanelSelected.png' },
            { name: 'tapestry', src: '/assets/tapestry.png' },
            { name: 'tapestrySelected', src: '/assets/tapestry-selected.png' },
        );

        const handleAssetsLoaded = () => {
            setGameLoaded(true);
        }

        window.addEventListener('assetsLoaded', handleAssetsLoaded);

        return () => {
            window.removeEventListener('assetsLoaded', handleAssetsLoaded);
        }
    }, []);

    useEffect(() => {
        // build game objects for the current scene
        initializeScene(gameState.scene, gameState);
    }, [gameState.scene]);

    useEffect(() => {
        if (gameState.dialogueLines) {
            setDialogueLines(JSON.parse(gameState.dialogueLines));
        } else {
            setDialogueLines([]);
        }
    }, [gameState.dialogueLines]);

    // build React components to display in current scene
    const { pageContents } = getPageContents(gameState.scene, { connectionStatus, ...gameState });

    const disconnections = parseInt(gameState.disconnections);

    console.log(gameState);

    return (
        <GameStateContext.Provider value={gameState}>
            <SetGameStateContext.Provider value={setGameState}>
                {gameLoaded && 
                    <GameCanvas width={GAME_WIDTH} height={GAME_HEIGHT}>
                        {pageContents}
                        {dialogueLines.length > 0 && <DialogueBox lines={dialogueLines} />}
                        {disconnections > 0 && <Disconnection />}
                        <button className="reset-btn" onClick={() => { localStorage.clear(); window.location.reload(); }}>Reset Session</button>
                    </GameCanvas>
                } 
            </SetGameStateContext.Provider>
        </GameStateContext.Provider>
    );
}

export default SmallHasslesCourt;
