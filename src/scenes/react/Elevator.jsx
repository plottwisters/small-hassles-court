import { IntakeForm } from "@components/elevator/IntakeForm";

import '@styles/Elevator.css';
import { disableElevatorPanels, enableElevatorPanel, addHarry } from "../vanilla/Elevator";
import { useContext } from "react";
import { GameStateContext, SetGameStateContext } from "../../contexts/GameStateContext";

const TAGBOARD_ACTIONS = [
    'tags',
    'tourIntakeForm',
    'tourIntakeFormSelected'
];

export function Elevator({ action }) {

    const setGameState = useContext(SetGameStateContext);
    const gameState = useContext(GameStateContext);

    if (action === 'elevatorSelect') {
        enableElevatorPanel(gameState, setGameState);
    }

    if (action === 'elevatorEnd') {
        disableElevatorPanels();
    }

    if (action === 'tourElevator') {
        addHarry();
    }

    if (action == 'tourElevatorPanel') {
        enableElevatorPanel(gameState, setGameState);
    }

    return (
        <>
            {TAGBOARD_ACTIONS.includes(action) && 
                <IntakeForm action={action} />
            }
        </>
    );
}