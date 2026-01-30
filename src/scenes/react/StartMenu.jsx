import logo from '@assets/logo.png';
import arrow from '@assets/arrow.svg';

import '@styles/StartMenu.css';
import { SetGameStateContext } from '../../contexts/GameStateContext';
import { useContext } from 'react';
import { nextAction } from '../../game_data/SceneHelper';

export function StartMenu(props) {
  const { status } = props;
  const setGameState = useContext(SetGameStateContext);

  return (
    <>
      {status === 'connecting' && 
        <p className="loading-text full-center">Loading...</p>
      }
      {status !== 'connecting' && 
        <div className="menu-content">
          <img src={logo} className="menu-image" />
          <div className="buttons">
            <div className="game-subtitle">A playful space to help you navigate little conflicts!</div>
            <div className="play-button-container">
              <button className="menu-button menu-button-a" onClick={() => setGameState(nextAction())}>Play</button>
            </div>
            <button className="menu-button menu-button-b" onClick={() => window.open('https://metagov.org/projects/governable-spacemakers-fellowship/small-hassles-court?token=3c7245d657302d0cda9f24f5c0d18461cda5e9e4', '_blank')}>About <img src={arrow} className="link-arrow"/></button>
            <button className="menu-button menu-button-c" onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSeOyTpMguxGPfPxtVGCy3DzminOI6drnV1Jx48VIFJDHDiBKw/viewform?pli=1', '_blank')}>Report a Bug <img src={arrow} className="link-arrow"/></button>
            <div className="version-text">Plot Twisters<br/>Version 1.0.1</div>
          </div>
        </div>
      }
    </>
  );
}
