export function TextDisplay({ speaker, text }) {
    return (
        <div className="game-input-text-container">
            <div className="game-input-text">
                <div className="game-input-speaker">{speaker}:</div>
                {text}
            </div> 
        </div>
    );
}