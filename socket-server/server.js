const server = require("http");
const socket = require("socket.io");

const httpServer = server.createServer();
const io = new socket.Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  // room_id: string
  socket.on("join_room", (room_id) => {
    console.log("Joining room: ", room_id);
    socket.join(room_id);
  });

  // data: {order: Order, method: "POST" | "DELETE"}
  socket.on("send_order", (data) => {
    console.log("send_order");
    console.log(socket.id, data);
    io.emit("rcv_order", data);
  });

  // data: {id: string, status: OrderStatus}
  socket.on("send_confirmation", (data) => {
    console.log("send_confirmation");
    console.log(socket.id, data);
    socket.to(data.id).emit("rcv_confirmation", data.status);
  });
});

httpServer.listen(8080, () => {
  console.log("Socket server listening on port 8080");
});
