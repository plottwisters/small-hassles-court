import { socket } from '../socket';

export function buildGameSockets(context) {
    socket.on("game:update", (data) => updateGameState(data, context));
}

function updateGameState(data, { setGameState }) {
    setGameState(data);
}