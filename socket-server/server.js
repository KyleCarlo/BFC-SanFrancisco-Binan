const server = require("http");
const socket = require("socket.io");

const httpServer = server.createServer();
const io = new socket.Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  /**
   * Join a room
   * room_id : string
   */
  socket.on("join_room", (room_id) => {
    console.log("Joining room: ", room_id);
    socket.join(room_id);
  });

  /**
   * Customer sends an order to staffs listening to "Incoming" status
   * data : Order
   */
  socket.on("send_order", (data) => {
    console.log("send_order");
    console.log(socket.id, data);
    io.emit("rcv_order", data);
  });

  /**
   * Staff sends a confirmation status to customer
   * data : {id: string, status: OrderStatus}
   */
  socket.on("send_confirmation", (data) => {
    console.log("send_confirmation");
    console.log(socket.id, data);
    io.to(data.id).emit("rcv_confirmation", data.status);
  });

  /**
   * Staff sends an order to staffs listening to "Processing" status
   * data : Order
   */
  socket.on("send_processing", (data) => {
    console.log("send_processing");
    console.log(socket.id, data);
    io.emit("rcv_processing", data);
    io.emit("delete_order", data.id);
  });

  /**
   * Staff sends an order to staffs listening to "Complete" status
   * data : Order
   */
  socket.on("send_complete", (data) => {
    console.log("send_complete");
    console.log(socket.id, data);
    io.emit("rcv_complete", data);
    io.emit("delete_processing", data.id);
  });

  /**
   * Staff sends an order to staffs listening to "Rejected" or "Cancelled" status
   * data : Order
   */
  socket.on("end_order", (data) => {
    console.log("end_order");
    console.log(socket.id, data);
    io.emit("rcv_end", data);
    io.emit("delete_complete", data.id);
    io.emit("delete_order", data.id);
  });
});

httpServer.listen(8080, () => {
  console.log("Socket server listening on port 8080");
});
