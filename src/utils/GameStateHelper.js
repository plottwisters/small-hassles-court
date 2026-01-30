import { socket } from "../socket";

export function extractAvatarData(gameState) {
    let p1Avatar, p1Name;

    if (gameState.player1) {
        p1Avatar = parseInt(gameState.player1.avatar);
        p1Name = gameState.player1.name;
    } else {
        // demo logic
        p1Avatar = gameState.avatar;
        p1Name = gameState.name;
    }

    

    const p2Avatar = parseInt(gameState.player2.avatar);
    const p2Name = gameState.player2.name;

    return { p1Avatar, p1Name, p2Avatar, p2Name };
}

export function extractPlayerData(gameState, currentPlayer = true) {
    if (!gameState.player1) return {};

    const isPlayer1 = gameState.player1.socketId === socket.id || gameState.isTour;
    const showPlayer2 = (isPlayer1 || currentPlayer) && !(isPlayer1 && currentPlayer);
    const playerData = showPlayer2 ? gameState.player2 : gameState.player1;

    return { isPlayer1, playerData };
}

export function extractRoundData(gameState, roundNumber = -1) {
    const rounds = JSON.parse(gameState.roundData);

    const round = rounds[roundNumber === -1 ? rounds.length - 1 : roundNumber];
    const isActive = round.isActive;

    return { round, isActive };
}
