import { useRef, useEffect, useState } from "react";
import { socket } from "../../socket";
import { NextButton } from "../common/NextButton";

export function JoinMenu({ status, gameCode, close }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [showGameCodeInput, setShowGameCodeInput] = useState(null);
  const [gameCodeText, setGameCodeText] = useState('');
  const gameCodeInput = useRef(null);

  const [showCopyTooltip, setShowCopyTooltip] = useState(false);
  const [copyTooltipText, setCopyTooltipText] = useState('Copy Game Code');

  const displayError = (data) => {
    setErrorMessage(data.message);
  }

  useEffect(() => {
    socket.on('error', (data) => displayError(data));

    return () => socket.off('error', displayError)
  }, []);

  function joinGame() {
    socket.emit("game:join", { gameCode: gameCodeInput.current.value });
  }

  

  function copyGameCode() {
    navigator.clipboard.writeText(gameCode);
    setCopyTooltipText('Copied!');
  }

  function resetTooltip() { 
    setShowCopyTooltip(false); 
    setCopyTooltipText('Copy Game Code'); 
  }

  let menuContents = <></>;
  let buttonText = "Board the elevator";

  if (showGameCodeInput && status !== 'ready') {
    menuContents = <>
      <p>Join an existing session by entering the code you received from the other player:</p>
      <div className="game-code-spacer">
        <input onChange={(e) => setGameCodeText(e.target.value.trim())} ref={gameCodeInput} className="name-input" placeholder="Paste game code" />
      </div>
      <button className="back-btn" onClick={() => setShowGameCodeInput(false)}>Back</button>
      {errorMessage && 
          <p className="error-message">{errorMessage}</p>
      }
    </>;
  } else if (status === 'connected') {
    menuContents = 
      <div className="stacked-menu-btns">
        <button className="menu-button menu-button-b" onClick={() => socket.emit('game:create')}>Create a new game</button>
        <button className="menu-button menu-button-c" onClick={() => setShowGameCodeInput(true)}>Enter a game code</button>
      </div>;

  } else if (status === 'waiting') {
    menuContents = <>
      <p>A new game has been created! Give the other player this invite code to join:</p>
      <div className="game-code-spacer">
        <div className="game-code-container">
          <div className="game-code-text">{gameCode}</div>
          <button 
            className="copy-btn"
            onClick={copyGameCode} 
            onMouseOver={() => setShowCopyTooltip(true)} 
            onMouseOut={resetTooltip}
          >
            Copy
          </button>
          {showCopyTooltip &&
            <div className="copy-tooltip">
              {copyTooltipText}
            </div>
          }
        </div>
      </div>
    </>;
    buttonText = "Waiting for the other player...";
  } else if (status === 'ready') {
    menuContents = <p>Your game will begin momentarily...</p>;
  }

  return (
    <div className="popup-menu-bg">
      <div className="popup-menu full-center">
        <h2 className="popup-title">Start a session</h2>
        {menuContents}
        {status !== 'ready' &&
          <NextButton 
            text={buttonText} 
            disabled={!(gameCodeText.length > 0 && showGameCodeInput)} 
            handler={joinGame}
          />
        }
      </div>
    </div>
  );
}