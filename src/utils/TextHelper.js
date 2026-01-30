import { extractPlayerData, extractRoundData } from "./GameStateHelper"
import { sessionId } from "../socket";

const resultMap = {
    "assumptionsResponse": { "Yes": "thinks", "No": "doesn't think" }
}

export function formatText(text, gameState) {
    if (!text) return '';
    
    const { playerData: otherPlayer } = extractPlayerData(gameState, false);
    let newText = text.replace(/\[other\]/, otherPlayer.name);

    const { round: currentRound } = extractRoundData(gameState);

    if (newText.includes('[result]')) {
        const action = currentRound.responses.filter(
            res => res.step === currentRound.stepCount - 1 && res.player !== sessionId
        )[0].content.action;

        newText = newText.replace(/\[result\]/, resultMap[gameState.currentAction][action]);
    }
    return newText;
}