import cucumber from '@assets/avatars/cucumber.png';
import glass from '@assets/avatars/glass.png';
import racket from '@assets/avatars/racket.png';
import cactus from '@assets/avatars/cactus.png';
import fire from '@assets/avatars/fire.png';

import { useContext, useState } from 'react';
import { NextButton } from '../common/NextButton';
import { socket } from '../../socket';
import { GameStateContext, SetGameStateContext } from '../../contexts/GameStateContext';
import { nextAction } from '../../game_data/SceneHelper';

function AvatarButton({ index, image, caption, selected, setSelected }) {
    const className = `avatar-button ${selected ? 'avatar-button-selected' : ''}`;
    return (
        <div className={className} onClick={() => setSelected(index)}>
            <img className="avatar-img" src={image}/>
            <p>{caption}</p>
        </div>
    );
}

export function AvatarSelect() {
    const gameState = useContext(GameStateContext);
    const setGameState = useContext(SetGameStateContext);

    const avatars = [
        {
            img: cucumber,
            caption: 'Cool as a cucumber'
        },
        {
            img: glass,
            caption: 'Pretty still'
        },
        {
            img: racket,
            caption: 'A little challenging'
        },
        {
            img: cactus,
            caption: 'Prickly!'
        },
        {
            img: fire,
            caption: 'Fired up.'
        }
    ];

    const [selected, setSelected] = useState(null);

    const handleSubmit = () => {
        if (!gameState.gameCode) {
            socket.emit('player:input', ['avatar', selected]);
            setGameState(nextAction({
                ...gameState,
                avatar: selected
            }));
        } else {
            socket.emit('game:input', selected);
        }
    }

    return (
        <div className="popup-menu-bg">
            <div className="avatar-menu popup-menu full-center">
                <h2 className="popup-title">How are you feeling?</h2>
                <div className="avatar-buttons-container">
                    {avatars.map((av, index) => (
                        <AvatarButton 
                            key={index}
                            index={index} 
                            image={av.img} 
                            caption={av.caption} 
                            selected={selected === index} 
                            setSelected={setSelected}
                        />
                    ))}
                </div>
                <NextButton disabled={selected == null} text={'Enter the Court'} handler={handleSubmit} />
            </div>
        </div>
    )
}