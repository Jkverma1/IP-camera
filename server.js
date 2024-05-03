const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.get("/sender", (req, res) => {
  res.sendFile(path.join(__dirname, "index-sender.html"));
});

app.get("/receiver", (req, res) => {
  res.sendFile(path.join(__dirname, "index-receiver.html"));
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("image", (imageData) => {
    io.emit("image", imageData);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = process.env.PORT || 4000;
http.listen(PORT, () => {
  console.log(`Socket.IO server is running on http://localhost:${PORT}`);
});
