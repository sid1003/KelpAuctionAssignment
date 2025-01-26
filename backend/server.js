const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cron = require("node-cron");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

let currentBid = 0;
let highestBidder = null;
let highestBidderName = null;
let tokenAmount = 500;
let players = [];

app.get("/", (req, res) => {
  res.send("Auction server running");
});

io.on("connection", (socket) => {
  console.log("User connected", socket.id);
  socket.emit("updateBid", { currentBid, highestBidder, highestBidderName });
  socket.emit("playerUpdate", players);

  socket.on("setUserName", (userName) => {
    socket.userName = userName;
    console.log("User name set:", userName);

    players.push({ name: userName, bid: 0, socketId: socket.id });

    io.emit("playerUpdate", players);
  });

  socket.on("newBid", (bid) => {
    if (bid % tokenAmount !== 0) {
      socket.emit("error", `Bid must be a multiple of ${tokenAmount}`);
      return;
    }

    if (bid > currentBid) {
      currentBid = bid;
      highestBidder = socket.id;
      highestBidderName = socket.userName;

      const playerIndex = players.findIndex(
        (player) => player.socketId === socket.id
      );

      if (playerIndex !== -1) {
        players[playerIndex].bid = bid; 
      }

      io.emit("updateBid", { currentBid, highestBidder, highestBidderName });
      io.emit("playerUpdate", players);

      console.log("New highest bidder:", highestBidderName);
      console.log("New bid:", currentBid);
    } else {
      socket.emit("error", "Bid must be higher than the current bid");
    }
  });

  const userA = { socketId: "userA", userName: "User A", bid: 500000 };
  const userB = { socketId: "userB", userName: "User B", bid: 500000 };

  cron.schedule("6 7 * * *", () => {
    const currentTime = new Date().toISOString();
    console.log("Race condition simulation started from A: " + currentTime);
    io.emit("updateBid", {
      currentBid: userA.bid,
      highestBidder: userA.socketId,
      highestBidderName: userA.userName,
    });
  });

  cron.schedule("6 7 * * *", () => {
    const currentTime = new Date().toISOString();
    console.log("Race condition simulation started from B: " + currentTime);
    io.emit("updateBid", {
      currentBid: userB.bid,
      highestBidder: userB.socketId,
      highestBidderName: userB.userName,
    });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const port = 3000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
