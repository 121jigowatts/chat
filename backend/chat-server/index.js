const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: "*",
  },
});

app.get("/", (req, res) => res.send("Hello World!"));

io.on("connection", (socket) => {
  console.log("a user connected: ", socket.client.id);
  socket.on("chatMessage", (msg) => {
    console.log("message: ", msg);
    const message = { id: socket.client.id, ...msg };
    console.log("add id: ", message);
    io.emit("chatMessage", message);
  });
  socket.emit("connection", null);
});

server.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
