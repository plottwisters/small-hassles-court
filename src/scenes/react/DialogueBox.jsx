import React, { useContext, useEffect, useState } from "react";
import harryProfile from "@assets/harryProfile.png";
import eugeneProfile from "@assets/eugeneProfile.png";
import { socket } from "../../socket";
import { formatText } from "../../utils/TextHelper";
import { GameStateContext, SetGameStateContext } from "../../contexts/GameStateContext";
import { nextAction } from "../../game_data/SceneHelper";

const TYPING_SPEED = 12; // milliseconds
let timeouts = [];

const speakerMap = {
  1: 'Harry the Herald',
  2: 'Eugene'
};

const speakerImageMap = {
  1: harryProfile,
  2: eugeneProfile
}

const clearTimeouts = () => {
  for (const id of timeouts) {
    clearTimeout(id);
  }
  timeouts = [];
}

function DialogueBox({ lines }) {
  const [dialogueLines, setDialogueLines] = useState([]);
  const [displayText, setDisplayText] = useState(''); 
  const [isTyping, setIsTyping] = useState(false);

  const [sceneAdvance, setSceneAdvance] = useState(false);
  const [local, setLocal] = useState(false);
  const [nextScene, setNextScene] = useState('');
  const [background, setBackground] = useState('');

  const [waiting, setWaiting] = useState(false);
  const [waitLine, setWaitLine] = useState('');

  const [delayed, setDelayed] = useState(false);

  const [speaker, setSpeaker] = useState(null);

  const gameState = useContext(GameStateContext);
  const setGameState = useContext(SetGameStateContext);

  // initialize dialogue box only when lines change
  useEffect(() => {
    setDialogueLines(lines);
    setIsTyping(true);
    setWaiting(false);
    setWaitLine('');
    setSceneAdvance(false);
    setLocal(false);
    setNextScene('');
    displayLine(lines[0]);
  }, [lines]);

  const displayLine = (line) => {
    if (line.delay) {
      setDelayed(true);
    }
    setTimeout(() => {
      if (line.speaker) {
        setSpeaker(line.speaker);
      }
      if (line.sceneAdvance) {
        setSceneAdvance(true);
        if (line.local) {
          setLocal(true);
        }
        if (line.nextScene) {
          setNextScene(line.nextScene);
        }
        if (line.background) {
          setBackground(line.background);
        }
      }
      if (line.waitLine) {
        setWaitLine(line.waitLine);
      }
      if (line.random) {
        line.line = line.options[Math.floor(Math.random() * line.options.length)];
      }

      typeText(line.line);
      setDelayed(false);
    }, line.delay ? line.delay * 1000 : 0);
  }

  const nextLine = () => {
    if (isTyping) {
      setDisplayText(dialogueLines[0].line);
      setIsTyping(false);
      clearTimeouts();
    } else {
      const dLines = [...dialogueLines];
      dLines.shift();
      setDialogueLines(dLines);

      if (dLines.length > 0) {
        setIsTyping(true);
        displayLine(dLines[0]);
      } else {
        setWaiting(true);
      }

      if (sceneAdvance && gameState.gameCode) {
        if (local) {
          setGameState({
            ...gameState,
            currentAction: nextScene,
            scene: background === "" ? gameState.scene : background
          });
        } else {
          socket.emit('game:input', null, false);
        }
      } else if (!gameState.gameCode && sceneAdvance) {
        // eslint-disable-next-line no-unused-vars
        const { dialogueLines, ...newGameState } = gameState;
        setGameState(nextAction({
          ...newGameState,
          dialogueLines: JSON.stringify(dLines)
        }));
      }
    }
  };

  function typeText(text, i = 0) {
    setDisplayText(text.slice(0, i + 1));

    let delay = TYPING_SPEED;
    if (text.charAt(i) === ',') {
      delay *= 20;
    } else if (text.charAt(i) === '.') {
      delay *= 25;
    }

    if (i < text.length - 1) {
      const timeoutId = setTimeout(() => typeText(text, i + 1), delay);
      timeouts.push(timeoutId);
    } else {
      setIsTyping(false);
    }
  }

  const speakerName = speakerMap[speaker];
  const speakerImage = speakerImageMap[speaker];

  return (
    <>
      {(dialogueLines.length > 0 || waitLine) && !delayed &&
        <div className="dialogue-box">
          <div className="dialogue-content">
            {!waiting && dialogueLines.length > 0 && 
              <>
                <img src={speakerImage} alt={speakerName} className="speaker-profile" />
                <div className="dialogue-text">
                  <h2 className="speaker-name">{speakerName}</h2>
                  <p className="line">{displayText}</p>
                </div>
                <button onClick={nextLine} className="next-button">
                  Next
                </button>
              </>
            }
            {waiting && 
              <i>
                {gameState.player1.name && formatText(waitLine, gameState)}
                {!gameState.player1.name && waitLine}
              </i>
            }
          </div>
          <div className="dialogue-divider"></div>
        </div>
      }
    </>
  );
}

export default DialogueBox;
