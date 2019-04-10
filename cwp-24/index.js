const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const Worker = require("./worker");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

const worker = new Worker();

io.on("connection", socket => {
  socket.join("buy");
  socket.join("sell");

  const vasiliy = 0;

  let interval = -1;

  socket.on("send", data => {
    console.log(data);
    
    worker.setTimer(data.sec * 1000);
    
    clearInterval(interval);
    
    interval = setInterval(() => {
      socket.emit("btc", worker.getData()[data.id]);
    }, data.sec * 1000);
  });

  socket.on("message", data => {
    const { text, room } = data;

    if (room == "buy" || room == "sell") {
      console.log(room);

      socket.nsp.to(room).emit("message", {
        room,
        text
      });
    
    }
  });
});

http.listen(3000, () => console.log("Server is running on http://localhost:3000"));
