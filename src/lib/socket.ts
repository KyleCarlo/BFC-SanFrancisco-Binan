import { io } from "socket.io-client";

const socket = io(
  process.env.NODE_ENV === "production"
    ? "wss://bfc-sfb.com"
    : "ws://localhost:8080",
  {
    autoConnect: false,
    reconnectionAttempts: 3,
  }
);

export default socket;
