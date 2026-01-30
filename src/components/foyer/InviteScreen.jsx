import { useState } from "react";

export function InviteScreen({ gameCode, closeMenu }) {

  const [showCopyTooltip, setShowCopyTooltip] = useState(false);
  const [copyTooltipText, setCopyTooltipText] = useState('Copy Game Code');

  function copyGameCode() {
    navigator.clipboard.writeText(gameCode);
    setCopyTooltipText('Copied!');
  }

  function resetTooltip() { 
    setShowCopyTooltip(false); 
    setCopyTooltipText('Copy Game Code'); 
  }

  return (
    <div className="popup-menu full-center invite-screen">
      <p>New game created! Give the other player this invite code to join:</p>
          <div className="game-code-container">
            <h2 className="game-code-text">{gameCode}</h2>
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
          <p>Waiting for other player...</p>
          {/* <button className="menu-button menu-button-b" onClick={closeMenu}>Cancel</button> */}
    </div>
  );
}