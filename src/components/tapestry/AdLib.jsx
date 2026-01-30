import { useContext, useEffect, useRef, useState } from "react";
import { GameStateContext } from "../../contexts/GameStateContext";
import { extractRoundData } from "../../utils/GameStateHelper";

function EditableBlock({ value, update, placeholder, index, editable, isTour }) {
    const blockRef = useRef(null);

    const handleSpecialKeys = (event) => {
        if (event.key === 'Escape' || event.key === 'Enter') {
            event.preventDefault();

            blockRef.current.blur();
        }
    }

    const handleAdlibChange = (event) => {
        let newContents = event.target.innerHTML.toString().trim();
        if (['[]', '<br>', ''].includes(newContents)) {
            newContents = '';
        }
        newContents = newContents.replace(/<br>/, '\n').replace(/\[/, '').replace(/\]/, '').replace(/&nbsp;/, '');
        update(newContents, index);
    };

    console.log(editable, isTour, value, placeholder);

    return (
        <>
            {editable && !isTour &&
                <div 
                    key={index}
                    ref={blockRef}
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={handleAdlibChange}
                    className="editable-block"
                    onKeyDown={handleSpecialKeys}
                    placeholder={placeholder}
                >
                    {value}
                </div>
            }
            {editable && isTour &&
                <div 
                    key={index}
                    ref={blockRef}
                    className="editable-block"
                    placeholder={placeholder}
                >
                    {value}
                </div>
            }
            {!editable && 
                <div className="adlib-display-block">{value}</div>
            }
        </>
        
    );
}

export function AdLib({ heading, adlib, responses, step, submit, editable = true, isTour = false }) {

    const [lines, setLines] = useState(adlib);
    const [firstValueChanged, setFirstValueChanged] = useState(Array(adlib.length).fill(false));
    const [submitted, setSubmitted] = useState(false);

    const gameState = useContext(GameStateContext);
    const { round } = extractRoundData(gameState);

    useEffect(() => {
        if (step > 0) {
            const lastStep = responses.filter(res => res.step === step - 1)[0].content;
            setLines(lastStep.adlib);
        }
    }, []);

    useEffect(() => {
        if (isTour) {
            setLines(adlib);
        }
    }, [adlib]);
    

    const updateLine = (content, index) => {
        const newLines = [...lines];
        const newFirstValueChanged = [...firstValueChanged];
        newLines[index] = content;
        newFirstValueChanged[index] = true;
        setLines(newLines);
        setFirstValueChanged(newFirstValueChanged);
    }

    const handleSubmit = () => {
        submit(lines);
        setSubmitted(true);
    }

    const adlibContent = lines.map((chunk, index) => (
                            <div key={index}>
                                {index % 2 !== 0 && round.stepCount === 0 && !firstValueChanged[index] &&
                                    <EditableBlock 
                                        value="" 
                                        placeholder={chunk} 
                                        update={updateLine} 
                                        index={index} 
                                        editable={editable} 
                                        isTour={isTour}
                                    /> 
                                }
                                {index % 2 !== 0 && (round.stepCount > 0 || firstValueChanged[index]) &&
                                    <EditableBlock 
                                        value={chunk}
                                        update={updateLine} 
                                        index={index} 
                                        editable={editable} 
                                        isTour={isTour}
                                    /> 
                                }
                                {index % 2 === 0 && <div>{chunk}</div>}
                            </div>
                        ))
    

    return (
        <>
            <div className="game-input-text-container">
                <div className={`game-input-text adlib-container ${!editable ? 'adlib-container-uneditable' : ''}`}>
                    {heading && !editable && <div className="game-input-speaker">{heading}:</div>}
                    <div className="adlib-content">
                        {adlibContent}
                    </div>
                </div>
            </div>
            {editable && 
                <div className="game-input-action-btn-group">
                    <button className="game-input-action-btn action-btn-single" onClick={handleSubmit} disabled={submitted || gameState.currentAction === 'tourPerfectScenariosIntro'}>{submitted ? 'Waiting...' : 'Submit'}</button>
                </div>
            }  
        </>
    );
}