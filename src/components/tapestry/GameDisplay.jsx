import { useContext } from "react";
import { TextDisplay } from "./TextDisplay";
import { GameStateContext } from "../../contexts/GameStateContext";
import { extractPlayerData, extractRoundData } from "../../utils/GameStateHelper";
import { sessionId, socket } from "../../socket";
import { NextButton } from "@components/common/NextButton";

export function GameDisplay() {
    const gameState = useContext(GameStateContext);
    const { round } = extractRoundData(gameState);
    const { isPlayer1 } = extractPlayerData(gameState);

    const speaker = isPlayer1 ? gameState.player2.name : gameState.player1.name;
    const responseToReveal = round.responses.filter(res => res.step === round.stepCount - 1 && res.player !== sessionId)[0];
    return (
        <div className="game-input-container">
            <div className="game-input-title">Below is the other player's perspective.</div>
            <div className="game-input-subtitle">Please read carefully.</div>
            <div className="game-input-narrow">
                <TextDisplay speaker={speaker} text={responseToReveal.content} />
                <NextButton text={'Ok'} handler={() => socket.emit('game:input')} />
            </div>
        </div>
    );
}