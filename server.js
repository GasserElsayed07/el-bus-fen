import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
    socket.on("test-k", (message) => {
      console.log("Received from client (k):", message);
    });
    socket.on("newEntry", (newMarker) => {
      console.log(
        "server recieved a new marker from client: ",
        socket.id,
        " and the marker is: ",
        newMarker,
      );
      socket.broadcast.emit("newEntry", newMarker);
    });
  });

  httpServer.listen(port);
});
