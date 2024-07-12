import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    console.log(message);
    io.emit("message", message);
  });
});

httpServer.listen(8080, () => {
  console.log("Socket server listening on port 8080");
});
