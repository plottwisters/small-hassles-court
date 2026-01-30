import { socket } from "../../socket";
import { NextButton } from "../common/NextButton";

export function Rules() {

    const handleSubmit = () => {
        socket.emit('game:input', true);
    }

    return (
        <div className="rules-panel full-center">
            <div className="rules-text">
                
            </div>
            <NextButton text={'Ok'} handler={handleSubmit} />
        </div>
    );
}