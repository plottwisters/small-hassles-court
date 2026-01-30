import { useContext, useState } from "react";
import { NextButton } from "../common/NextButton";
import { GameStateContext, SetGameStateContext } from "../../contexts/GameStateContext";
import { nextAction } from "../../game_data/SceneHelper";
import { socket } from "../../socket";

export function NameInput() {
    const [name, setName] = useState('');
    const gameState = useContext(GameStateContext);
    const setGameState = useContext(SetGameStateContext);

    const handleName = (event) => {
        setName(event.target.value);
    }

    const handleSubmit = () => {
        socket.emit('player:input', ['name', name]);
        setGameState(nextAction({
            ...gameState,
            name: name
        }));
    };

    return (
        <div className="popup-menu-bg">
            <div className="popup-menu full-center">
                <h2 className="popup-title">What is your name?</h2>
                <div className="popup-input">
                    <input type="text" value={name} className="name-input" placeholder="Enter your name" onChange={handleName}/>
                </div>
                <NextButton disabled={name.length === 0} text={'Next'} handler={handleSubmit} />
            </div>
        </div>
    );
}