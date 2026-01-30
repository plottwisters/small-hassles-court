import { useContext } from "react";
import { GameAction } from "../../components/tapestry/GameAction";

import '@styles/Tapestry.css';
import { GameStateContext, SetGameStateContext } from "../../contexts/GameStateContext";
import { useTagboards } from "../../hooks/useTagboards";
import { TextDisplay } from "../../components/tapestry/TextDisplay";
import { NextButton } from "../../components/common/NextButton";
import { OpeningStatementsReminder } from "../../components/tapestry/OpeningStatementsReminder";
import { extractRoundData } from "../../utils/GameStateHelper";
import { AdLib } from "../../components/tapestry/AdLib";
import { commonGroundEndAgreeDialogue } from "../../game_data/DialogueLines";

const agreeTermMap = {
    "Concessions": "Here are the concessions",
    "Compromise": "Here is the compromise",
    "Perfect Scenarios": "Here is the ideal alternative scenario"
};

export function Tapestry({ action }) {
    const gameState = useContext(GameStateContext);
    const setGameState = useContext(SetGameStateContext);
    const tagboards = useTagboards(gameState);

    const specialtyActions = [
        'openingStatementsReminder',
        'commonGroundAgree',
        'tourOpeningStatementsReview'
    ]

    let specialtyContent = <></>;

    switch (action) {
        case 'openingStatementsReminder': {
            specialtyContent = <OpeningStatementsReminder />;
            break;
        }

        case 'tourOpeningStatementsReview': {
            specialtyContent = <OpeningStatementsReminder isTour={true} />
            break;
        }

        case 'commonGroundAgree': {

            const { round } = extractRoundData(gameState);

            const handleAgree = () => {
                setGameState({
                    ...gameState,
                    currentAction: 'commonGroundEndAgree',
                    scene: 'court',
                    dialogueLines: JSON.stringify(commonGroundEndAgreeDialogue)
                })
            }

            specialtyContent = <>
                <div className="game-input-container">
                    <div className="prompt-header tapestry-prompt-header">
                        <h3 className="game-input-title">{round.roundName}</h3>
                        <div className="game-input-subtitle">{agreeTermMap[round.roundName]} you have both agreed on.</div>
                    </div>
                    <AdLib 
                        adlib={round.actionAdlib}
                        responses={round.responses}
                        step={round.stepCount}
                        editable={false}
                    />

                   <div className="game-input-action-btn-group">
                        <button className="game-input-action-btn action-btn-single" onClick={handleAgree}>Return to Lobby</button>
                    </div>
                </div>
            </>;
        }
    }

    return (
        <>
            {tagboards}
            {specialtyActions.includes(action) && 
                <>
                    {specialtyContent}
                </>
            }
            {!specialtyActions.includes(action) && 
                <>
                    <GameAction />
                </>
            }
        </>
    )
}