import { useContext, useState } from "react";
import { socket, sessionId } from "../../socket";
import { GameStateContext, SetGameStateContext } from "../../contexts/GameStateContext";
import { extractPlayerData, extractRoundData } from "../../utils/GameStateHelper";
import { TextDisplay } from "./TextDisplay";
import { NextButton } from "../common/NextButton";
import { nextAction } from "../../game_data/SceneHelper";

export function OpeningStatementsReminder({ isTour }) {
    const gameState = useContext(GameStateContext);
    const setGameState = useContext(SetGameStateContext);

    const [submitted, setSubmitted] = useState(false);

    const { isPlayer1 } = extractPlayerData(gameState);
    const { round: initialRound } = extractRoundData(gameState, 0);
    const ownResponse = initialRound.responses.filter(res => res.player === sessionId)[0];
    const otherResponse = initialRound.responses.filter(res => res.player !== sessionId)[0];

    const submitHandler = () => {
        if (!isTour) {
            socket.emit('game:input'); 
            setSubmitted(true);
        } else {
            setGameState(nextAction(gameState));
        }
    }

    const subtitle = JSON.parse(gameState.roundData).length === 1 ? "Here is what you both said the issue is." : "Here is a reminder of what you both said the issue was.";

    return  ( 
        <div className="game-input-container">
            <div className="prompt-header tapestry-prompt-header">
                <h3 className="game-input-title">Opening Statements</h3>
                <div className="game-input-subtitle">{subtitle}</div>
            </div>
            <TextDisplay speaker={"You"} text={ownResponse.content} />
            <TextDisplay speaker={isPlayer1 ? gameState.player2.name : gameState.player1.name} text={otherResponse.content} />
            <NextButton text="Next" handler={submitHandler} disabled={submitted} />
        </div>
    );
}