import { TagButton } from "./TagButton";
import { aboveTags, belowTags, wildcardTags } from "@game_data/tags";
import { useContext, useEffect, useState } from "react";
import { NextButton } from "../common/NextButton";
import { socket } from "../../socket";
import { GameStateContext, SetGameStateContext } from "../../contexts/GameStateContext";
import { extractPlayerData } from "../../utils/GameStateHelper";
import { nextAction } from "../../game_data/SceneHelper";

const MAX_SELECTED_TAGS = 3;

export function IntakeForm({ action }) {
    const [selectedTags, setSelectedTags] = useState([]);
    const gameState = useContext(GameStateContext);
    const setGameState = useContext(SetGameStateContext);
    const isTour = action !== 'tags';

    useEffect(() => {
        if (action === 'tourIntakeFormSelected') {
            setSelectedTags([
                {
                    name: 'Privacy',
                    category: 'above'
                }, 
                {
                    name: 'Boundaries',
                    category: 'above'
                }, 
                {
                    name: 'Respect',
                    category: 'below'
                }
            ]);
        }
    }, [action])

    const addTag = (name, category) => {
        if (selectedTags.length < MAX_SELECTED_TAGS && !isTour) {
            setSelectedTags([...selectedTags, { name, category }]);
        }
    };

    const removeTag = (tag) => {
        setSelectedTags(selectedTags.filter(t => t.name !== tag));
    }

    const fullSelections = selectedTags.length === MAX_SELECTED_TAGS;

    const handleSubmit = () => {
        if (!isTour) {
            socket.emit('game:input', selectedTags, false);

            const { playerData, isPlayer1 } = extractPlayerData(gameState);

            playerData.status = 'submitted';

            if (isPlayer1) {
                setGameState({
                    ...gameState, 
                    player1: playerData
                });
            } else {
                setGameState({
                    ...gameState,
                    player2: playerData
                })
            }
        } else {
            setGameState(nextAction(gameState));
        }
    }

    return (
        <div className="intake-form-bg">
            <div className="intake-form">
                <div className="prompt-header tagboard-prompt-header">
                    <h3>What do you think this is about?</h3>
                    <div>Select three tags total. These will be visible to the other player.</div>
                </div>
                <div className="tag-section">
                    {aboveTags.map(tag => (
                        <TagButton 
                            key={tag}
                            tag={tag} 
                            category={'above'} 
                            selected={selectedTags.filter(t => t.name === tag).length > 0}
                            add={addTag}
                            remove={removeTag}
                        />
                    ))}
                </div>
                <div className="tag-section">
                    {belowTags.map(tag => (
                        <TagButton 
                            key={tag}
                            tag={tag} 
                            category={'below'} 
                            selected={selectedTags.filter(t => t.name === tag).length > 0}
                            add={addTag}
                            remove={removeTag}
                        />
                    ))}
                </div>
                <div className="tag-section">
                    {wildcardTags.map(tag => (
                        <TagButton 
                            key={tag}
                            tag={tag} 
                            category={tag === "I don't know" ? '' : 'wildcard'} 
                            selected={selectedTags.filter(t => t.name === tag).length > 0}
                            add={addTag}
                            remove={removeTag}
                        />
                    ))}
                </div>
                <NextButton text={'Next'} handler={handleSubmit} disabled={!fullSelections} />
            </div>
        </div>
    );
}