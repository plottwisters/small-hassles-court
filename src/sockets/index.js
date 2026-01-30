import { buildMenuSockets } from "./menu";
import { socket } from "../socket";
import { buildGameSockets } from "./game";

export function buildSocketListeners(context) {
    socket.connect();

    buildMenuSockets(context);
    buildGameSockets(context);

    socket.on("session:start", (data) => localStorage.setItem('sessionId', data.sessionId));
    socket.on("session:end", () => localStorage.removeItem('sessionId'));
}
