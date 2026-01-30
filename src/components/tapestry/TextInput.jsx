import { useContext, useState } from "react";
import { CHAR_MAX } from "../../game_data/config";
import { socket } from "../../socket";
import { GameStateContext, SetGameStateContext } from "../../contexts/GameStateContext";
import { extractRoundData } from "../../utils/GameStateHelper";
import { nextAction } from "../../game_data/SceneHelper";

export function TextInput({startingValue = '', action = '', backHandler = null, isTour = false}) {
    const [inputValue, setInputValue] = useState(startingValue);
    const [charCount, setCharCount] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const gameState = useContext(GameStateContext);
    const setGameState = useContext(SetGameStateContext);
    const { round } = extractRoundData(gameState);

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        if (newValue.length > CHAR_MAX) {
            setInputValue(newValue.substring(0, CHAR_MAX));
            setCharCount(CHAR_MAX);

        } else {
            setInputValue(newValue);
            setCharCount(newValue.length);
        }
    }

    const handleSubmit = () => {
        setSubmitted(true);

        if (!isTour) {
            if (action === '') {
                socket.emit('game:input', inputValue);
            } else {
                socket.emit('game:input', {
                    action,
                    prompt: round.actionTitle,
                    response: inputValue
                });
            }
        } else {
            setGameState(nextAction(gameState));
        }
    }

    const tourAutofill = () => {
        if (isTour) {
            setInputValue(gameState.harryResponse);
            setCharCount(gameState.harryResponse.length);
        }
    }

    return (
        <>
            <div className="game-input-text-container">
                <textarea className="game-input-text" onChange={handleInputChange} value={inputValue} rows={4} readOnly={isTour} onClick={tourAutofill}></textarea>
                <div className="char-counter">{charCount}/{CHAR_MAX}</div>
            </div>
            <div className="game-input-action-btn-group">
                {backHandler && !submitted &&
                    <button className="game-input-action-btn action-btn-negate" onClick={backHandler}>Back</button>
                }
                <button className="game-input-action-btn action-btn-single" onClick={handleSubmit} disabled={submitted || inputValue.length === 0}>{submitted ? 'Waiting...' : 'Submit'}</button>
            </div>
        </>
    );
}