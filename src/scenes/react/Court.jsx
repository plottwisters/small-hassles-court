import { useContext, useEffect } from 'react';

import { TagBoard } from '../../components/court/TagBoard';

import '@styles/Court.css';
import { GameStateContext, SetGameStateContext } from '../../contexts/GameStateContext';
import { addTable, makeTapestrySelectable, addAvatarResponses } from '../vanilla/Court';
import { useTagboards } from '../../hooks/useTagboards';
import { extractPlayerData, extractRoundData } from '../../utils/GameStateHelper';
import { sessionId } from '../../socket';
import { courtEndNoAgreeDialogue, courtTryAgainDialogue } from '../../game_data/DialogueLines';

const TABLE_ACTIONS = [
    'table',
    'positionFeedback',
    'courtTryAgain',
    'courtNoAgree',
    'tourCourtTable',
    'tourPositionFeedback',
    'tourCourtClosing'
];

export function Court({ action }) {
    const gameState = useContext(GameStateContext);
    const setGameState = useContext(SetGameStateContext);
    const tagboards = useTagboards(gameState);

    if (TABLE_ACTIONS.includes(action)) {
        addTable();
    }

    if (action === 'positionFeedback' || action === 'tourPositionFeedback') {
        const { isPlayer1 } = extractPlayerData(gameState);
        const { round: lastRound } = extractRoundData(gameState);
        const player1Response = lastRound.responses.filter(res => 
            res.step === lastRound.stepCount && (isPlayer1 ? res.player === sessionId : res.player !== sessionId)
        )[0].content.action;
        const player2Response = lastRound.responses.filter(res => 
            res.step === lastRound.stepCount && (isPlayer1 ? res.player !== sessionId : res.player === sessionId)
        )[0].content.action;

        addAvatarResponses(player1Response, player2Response);
    }

    if (action === 'tapestrySelect') {
        makeTapestrySelectable();
    }

    if (action === 'tourTapestrySelect') {
        makeTapestrySelectable(true, gameState, setGameState);
    }

    // wrap actions that affect gameState in useEffect to prevent infinite re-render
    useEffect(() => {
        if (action === 'courtTryAgain') {
            setGameState({
                ...gameState,
                dialogueLines: JSON.stringify(courtTryAgainDialogue)
            });
        }

        if (action === 'courtNoAgree') {
            setGameState({
                ...gameState,
                dialogueLines: JSON.stringify(courtEndNoAgreeDialogue)
            });
        }
    }, [action]);

    


    return (
        <>
            { tagboards }
        </>
    );
}