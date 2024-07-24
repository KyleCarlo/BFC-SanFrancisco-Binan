import { io } from "socket.io-client";

const socket = io(
  process.env.NODE_ENV === "production"
    ? "ws://vps-99b080e8.vps.ovh.ca:8080"
    : "ws://localhost:8080",
  {
    autoConnect: false,
    reconnectionAttempts: 3,
  }
);

export default socket;
