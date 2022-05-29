const app = require('express')()
const http = require('http').createServer(app)
const socket = require("socket.io");
const cors = require("cors");
const io = socket(http, {
  cors: {
      origin: "*",
      methods:['GET','POST']
  }
}); 

app.use(cors());
const PORT = process.env.PORT || 5000;
io.on('connection', socket => {
  console.log("New client connected" + socket.id); 
    socket.on('stream', data=> {
    // send stream back to room
      socket.broadcast.emit('live',{data});
  });
  
  socket.on("message", (data) => {
    io.emit("sendData", {data});
  })
  socket.on("disconnect", () => {
    console.log("Client disconnected"); // Khi client disconnect thì log ra terminal.
  });
})

http.listen(PORT, () => console.log(`Server is running on port ${PORT}`));