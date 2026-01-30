import { useContext } from "react"
import { GameStateContext } from "@contexts/GameStateContext"
import { extractPlayerData } from "@utils/GameStateHelper";

export function NextButton({ text, handler, disabled = false }) {
    const gameState = useContext(GameStateContext);
    let isSubmitted = false;

    if (gameState.gameCode) {
        const { playerData } = extractPlayerData(gameState);
        isSubmitted = playerData?.status === 'submitted';
    }

    return (
        <button 
            className="popup-action-btn" 
            onClick={handler}
            disabled={isSubmitted || disabled}
        >
            {!isSubmitted ? text : 'Waiting...'}
        </button>
    );
}