import { socket } from "../socket";

export function buildMenuSockets(context) {
    socket.on("connect", () => onConnect(context));
    socket.on("disconnect", () => onDisconnect(context));
    socket.on("success", (data) => onSuccess(data, context));
    socket.on("gameEnd", () => onGameEnd(context));
}

function onConnect({ setConnectionStatus }) {
    setConnectionStatus('connected');
}

function onDisconnect({ setConnectionStatus }) {
    setConnectionStatus('connecting');
}

function onSuccess(data, { gameState, setGameState, setConnectionStatus }) {
    setConnectionStatus(data.ready ? 'ready' : 'waiting');
    setGameState({ ...gameState, gameCode: data.gameCode });
}

function onGameEnd({ setConnectionStatus }) {
    setConnectionStatus('connected');
}