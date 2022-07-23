import http from "http";
import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log("Listening on http://localhost:3000");

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer, {
  cors: {
    origin: "https://admin.socket.io",
    credentials: true,
  },
});

instrument(wsServer, {
  auth: false,
});

wsServer.on("connection", (socket) => {
  socket["nickname"] = "Anon";
  socket.onAny((event) => {
    console.log(`Socket Event : ${event}`);
  });
  socket.on("nickname", (nickname) => {
    socket["nickname"] = nickname;
  });
  socket.on("join_room", (roomName) => {
    if (countUserInRoom(roomName) > 1) {
      socket.emit("join_error", "인원이 가득 찼습니다");
    } else {
      socket.join(roomName);
      socket.to(roomName).emit("welcome", socket.nickname);
    }
  });
  socket.on("offer", (offer, roomName) => {
    socket.to(roomName).emit("offer", offer);
  });
  socket.on("answer", (answer, roomName) => {
    socket.to(roomName).emit("answer", answer);
  });
  socket.on("ice", (ice, roomName) => {
    socket.to(roomName).emit("ice", ice);
  });
  socket.on("start_game", (roomName) => {
    let stones = randomStone();
    const users = usersInRoom(roomName);
    users.forEach((user) => {
      wsServer.to(user).emit("stone", stones[0]);
      stones = [stones[1]];
    });
  });
});

httpServer.listen(3000, handleListen);

function countUserInRoom(roomName) {
  return wsServer.sockets.adapter.rooms.get(roomName)?.size;
}

function usersInRoom(roomName) {
  return wsServer.sockets.adapter.rooms.get(roomName);
}

function randomStone() {
  let stones = [];
  const randomNumber = Math.floor(Math.random() * 2);
  randomNumber ? (stones = ["black", "white"]) : (stones = ["white", "black"]);
  return stones;
}
