import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("send_order", (message) => {
    console.log("send_order");
    console.log(socket.id, message);
    io.emit("rcv_order", message);
  });

  socket.on("send_confirmation", (message) => {
    console.log("send_confirmation");
    console.log(socket.id, message);
    io.emit("rcv_confirmation", message);
  });
});

httpServer.listen(8080, () => {
  console.log("Socket server listening on port 8080");
});
