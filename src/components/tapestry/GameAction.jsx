import { useContext, useState, useEffect } from "react";
import { GameStateContext, SetGameStateContext } from "../../contexts/GameStateContext";
import { extractPlayerData, extractRoundData } from "../../utils/GameStateHelper";
import { TextInput } from "./TextInput";
import { ButtonRow } from "./ButtonRow";
import { TextDisplay } from "./TextDisplay";
import { sessionId } from "../../socket";
import { formatText } from "../../utils/TextHelper";
import { socket } from "../../socket";
import { AdLib } from "./AdLib";
import { nextAction } from "../../game_data/SceneHelper";

const roundItemMap = {
    "perfectScenariosP1": "perfect scenario",
    "perfectScenariosP2": "perfect scenario",
    "concessionsP1": "concessions",
    "concessionsP2": "concessions",
    "compromiseP1": "compromise",
    "compromiseP2": "compromise"
};

export function GameAction() {

    const gameState = useContext(GameStateContext);
    const setGameState = useContext(SetGameStateContext);
    const { round } = extractRoundData(gameState);
    const { isPlayer1 } = extractPlayerData(gameState);
    const otherPlayer = isPlayer1 ? gameState.player2 : gameState.player1;

    const roundAction = isPlayer1 ? round.actionType[0] : round.actionType[1];
    const display = round.display;

    const [resActionVal, setResActionVal] = useState('');
    const [subtitle, setSubtitle] = useState(round.prompt);

    useEffect(() => {
        setSubtitle(round.prompt);
    }, [round.prompt]);

    useEffect(() => {
        if (roundAction === 'wait') {
            setSubtitle(round.stepCount === 0 ? 'Waiting on [other]' : 'Waiting... [other] is reviewing your proposal now.');
        }
        if (roundAction === 'adlibWithAction') {
            setSubtitle('Read carefully [other]\'s ' + roundItemMap[gameState.currentAction] + ' below.');
        }

    }, [roundAction, round.stepCount]);

    const submitAction = (prompt, action) => {
        socket.emit('game:input', { prompt, action });
        setResActionVal('');
    };

    const handleAdlibActionSubmit = (prompt, action) => {
        if (action !== 'Amend') {
            socket.emit('game:input', { prompt, action });
            setResActionVal('');
        } else {
            setResActionVal(action);
            setSubtitle('Propose an amendment to their ' + roundItemMap[gameState.currentAction] + '.')
        }
    };

    const handleAdlibSubmit = (adlib) => {
        const socketData = { adlib: adlib };
        if (round.stepCount > 0) {
            socketData.action = 'Amend';
            setResActionVal('');
        }
        socket.emit('game:input', socketData);
    }

    let actionContent = <></>;
    let displayContent = <></>;

    switch (display) {
        case 'otherPlayerInitialResponse': {
            const { round: initialRound  } = extractRoundData(gameState, 0);
            const response = initialRound.responses.filter(res => res.player !== sessionId)[0];

            displayContent = <TextDisplay speaker={otherPlayer.name} text={response.content} />;
            break;
        }
        case 'ownInitialResponse': {
            const { round: initialRound } = extractRoundData(gameState, 0);
            const response = initialRound.responses.filter(res => res.player === sessionId)[0];

            displayContent = <TextDisplay speaker="You" text={response.content} />;
            break;
        }
        case 'otherPlayerLastResponse': {
            const lastResponse = round.responses.filter(res => res.player !== sessionId && res.step === round.stepCount - 1)[0];
            if (typeof lastResponse.content === 'object') {
                const obj = lastResponse.content;
                displayContent = (
                    <>
                        {obj.prompt && 
                            <div className="action-row">
                                <div className="response-prompt">{formatText(obj.prompt, gameState)}</div>
                                <div className="response-pill">{obj.action}</div>
                            </div>
                        }
                        {obj.response && <TextDisplay speaker={otherPlayer.name} text={obj.response} />}
                    </>
                );
            } else {
                displayContent = <TextDisplay speaker={otherPlayer.name} text={lastResponse.content} />;
            }
        }
    }

    const submitActionWithInput = (action, index) => {
        setSubtitle(round.followUpPrompts[index]);
        setResActionVal(action);
    }

    switch (roundAction) {
        case 'response': 
            actionContent = <TextInput />;
            break;
        case 'tourResponse':
            actionContent = <TextInput isTour={true} />;
            break;
        case 'actionWithInput':
            if (resActionVal === '') {
                actionContent = <ButtonRow 
                                    actions={round.actionOptions}
                                    setAction={submitActionWithInput}
                                />;
            } else {
                actionContent = <TextInput action={resActionVal} backHandler={
                        () => { 
                            setResActionVal('');
                            setSubtitle(round.prompt);
                        }
                    } 
                />;
            }
            break;
        case 'tourButtonRow':
            actionContent = <ButtonRow 
                                actions={round.actionOptions} 
                                setAction={() => {}} 
                                isTour={true} 
                            />;
            break;
        case 'action':
            actionContent = <ButtonRow 
                                actions={round.actionOptions}
                                setAction={(action) => submitAction(round.actionTitle, action)}
                            />;
            break;

        case 'adlib':
            actionContent = <AdLib
                                adlib={round.actionAdlib}
                                responses={round.responses}
                                step={round.stepCount}
                                submit={handleAdlibSubmit}
                            />;
            break;

        case 'tourAdlib':
            actionContent = <AdLib
                                adlib={round.actionAdlib}
                                responses={round.responses}
                                step={round.stepCount}
                                isTour={true}
                                submit={() => setGameState(nextAction(gameState))}
                            />;
            break;
        
        case 'adlibWithAction':
            actionContent = <>
                                <AdLib
                                    heading={otherPlayer.name}
                                    adlib={round.actionAdlib}
                                    responses={round.responses}
                                    step={round.stepCount}
                                    editable={resActionVal !== ''}
                                    submit={handleAdlibSubmit}
                                />
                                {resActionVal === '' &&
                                    <ButtonRow 
                                        actions={round.actionOptions}
                                        setAction={(action) => handleAdlibActionSubmit(round.actionTitle, action)}
                                    />
                                }
                            </>;

            break;

        case 'tourAdlibWithActionScreen1':
            actionContent = <>
                                <AdLib
                                    heading={otherPlayer.name}
                                    adlib={round.actionAdlib}
                                    responses={round.responses}
                                    step={round.stepCount}
                                    editable={false}
                                    submit={handleAdlibSubmit}
                                />
                                <ButtonRow 
                                    isTour={true}
                                    actions={round.actionOptions}
                                    setAction={(action) => handleAdlibActionSubmit(round.actionTitle, action)}
                                />
                            </>;
            break;
        case 'tourAdlibWithActionScreen2':
            actionContent = <>
                                <AdLib
                                    heading={otherPlayer.name}
                                    adlib={round.actionAdlib}
                                    responses={round.responses}
                                    step={round.stepCount}
                                    editable={true}
                                    isTour={true}
                                />
                            </>;
            break;
    }


    return (
        <div className="game-input-container">
            <div className="prompt-header tapestry-prompt-header">
                <h3 className="game-input-title">{round.roundName}</h3>
                <div className="game-input-subtitle">{formatText(subtitle, gameState)}</div>
            </div>
            {displayContent}
            {actionContent}
        </div>
    );
}