import { useContext, useState } from "react";
import { SetGameStateContext, GameStateContext } from "../../contexts/GameStateContext";
import { nextAction } from "../../game_data/SceneHelper";
import { NextButton } from "../common/NextButton";

export function Conditions() {
    const [accepted, setAccepted] = useState(false);

    const gameState = useContext(GameStateContext);
    const setGameState = useContext(SetGameStateContext);
    
    return (
        <div className="popup-menu-bg">
            <div className="popup-menu full-center rules-screen">
                <h2 className="popup-title"><i>What is a small hassle?</i></h2>
                <p>The Small Hassles Court is intended for issues which:</p>
                <div className="rules-section-container">
                    <div className="rules-section">
                        <div className="rules-section-title">Exist between two conflicting opinions</div>
                        <div className="rules-section-content">This is a two-player game, ideally played in the same room or on the phone together. The conflict can be between two people, or two groups of different opinions.</div>
                    </div>
                    <div className="rules-section">
                        <div className="rules-section-title">Are between two people of comparable power</div>
                        <div className="rules-section-content">This game is designed for friends, flatmates, or partners. This game is to give you both an equal say, which may not work if you have different power relations (e.g. parent/child).</div>
                    </div>
                    <div className="rules-section">
                        <div className="rules-section-title">Are tangible and not overly personal</div>
                        <div className="rules-section-content">Describe tensions, not character traits. “I don’t think it’s fair that your boyfriend stays over so often but doesn’t pay bills,”rather than “I don’t like your boyfriends.”</div>
                    </div>
                </div>
                <p className="rules-subtext">If your hassle does not fit within these bounds, you are still welcome to play the game.<br/>Just be aware that its design might not optimally support you in addressing your issue.</p>
                
                <div className="rules-checkbox">
                    <input id="agree" type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)}/> 
                    <label htmlFor="agree"> 
                        I agree with the full <a href="https://docs.google.com/document/d/16AyrtvrmyWKLBT4yTa0QsmmQgbpY6IRZMkRcMi_ByuI/edit?tab=t.0#heading=h.vlwy32avk4l8">Terms & Conditions here.</a>
                    </label>
                </div>
                <NextButton disabled={!accepted} text={'I understand and consent'} handler={() => setGameState(nextAction(gameState))} />
            </div>
        </div>
    );
}