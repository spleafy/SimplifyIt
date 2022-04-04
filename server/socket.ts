import { Server } from "socket.io";

export const setupSocket = () => {
  const io = new Server(5000, {
    cors: {
      origin: [
        `${process.env.FRONTEND_PROTOCOL}://${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}`,
      ],
    },
  });

  io.on("connection", (socket) => {
    socket.on("get-messages", async (id) => {
      // const messages = await Message.find({ _id: id }).skip(0).limit(10);
      // socket.to(id).emit("messages", { messages });
    });

    socket.on("send-message", (message, id) => {
      socket.broadcast.emit("broadcast-message", message);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};

export default setupSocket;
