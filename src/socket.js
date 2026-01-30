import { io } from "socket.io-client";

const URL = "https://smallhasslescourt.com";
export const sessionId = localStorage.getItem('sessionId');

export const socket = io(URL, {
    withCredentials: true,
    autoConnect: false,
    auth: { sessionId: sessionId }
});
