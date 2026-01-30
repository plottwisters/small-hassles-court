import { useContext } from "react";
import { GameStateContext } from "../../contexts/GameStateContext";
import { extractPlayerData, extractRoundData } from "../../utils/GameStateHelper";

const actionMap = {
    "Send Good Vibes": "*Good vibes*",
    "Say I'm Sorry": "I'm sorry"
};

export function ButtonRow({ actions, setAction, isTour }) {
    const gameState = useContext(GameStateContext);
    const { playerData, isPlayer1 } = extractPlayerData(gameState);
    const otherPlayer = isPlayer1 ? gameState.player2 : gameState.player1;
    const { round } = extractRoundData(gameState);

    let mainRowActions = [...actions];
    let hasTry = false;
    if (actions.includes("Try Something Else")) {
        mainRowActions = [actions[0], actions[1]];
        hasTry = true;
    }

    return (
        <>
            {playerData.status !== 'submitted' && 
                <>
                    <div className="game-input-action-btn-group">
                        {mainRowActions.map((action, index) => (
                            <button 
                                key={index}
                                onClick={() => setAction(actionMap[action] ?? action, index)}
                                className={`game-input-action-btn action-btn-${index % 2 === 0 ? 'primary' : 'secondary'}`}
                            >
                                {action}
                            </button>
                        ))}
                    </div>
                    {hasTry && round.stepCount > 1 &&
                        <div className="exit-btn-group">
                            <button 
                                key="try"
                                onClick={() => setAction("Try Something Else", 2)}
                                className={`game-input-action-btn action-btn-terminal`}
                            >
                                Try Something Else
                            </button>
                            <div className="exit-btn-row">
                                Or <span className="exit-btn" onClick={() => setAction("No Agreement", 3)}>exit without agreement</span>
                            </div>
                        </div>
                    }
                </>
            }
            {playerData.status === 'submitted' &&
                <div style={{textAlign: 'center'}}>Waiting for {otherPlayer.name}...</div>
            }
        </>
    );
}