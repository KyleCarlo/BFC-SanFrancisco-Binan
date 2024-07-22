const server = require("http");
const socket = require("socket.io");

const httpServer = server.createServer();
const io = new socket.Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", (room_id) => {
    console.log("Joining room: ", room_id);
    socket.join(room_id);
  });

  socket.on("send_order", (message) => {
    console.log("send_order");
    console.log(socket.id, message);
    io.emit("rcv_order", message);
  });

  socket.on("send_confirmation", (data) => {
    console.log("send_confirmation");
    console.log(socket.id, data);
    socket.to(data.id).emit("rcv_confirmation", data.status);
  });
});

httpServer.listen(8080, () => {
  console.log("Socket server listening on port 8080");
});
