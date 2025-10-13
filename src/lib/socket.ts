import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function connectSocket(userId: number) {
    if (!socket) {
        socket = io("http://localhost:4000");
        socket.on("connect", () => {
            console.log("connected socket", socket?.id);
            socket?.emit("join", userId);
        });
    }
    return socket;
}

export function getSocket() {
    if (!socket) throw new Error("Socket not initialized");
    return socket;
}
export const disconnectSocket = () => {
    socket?.disconnect();
    socket = null;
};