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
    socket.on('stream', function(data) {
    // send stream back to room
      io.emit('stream',{data});
  });
  
  socket.on("sending signal", payload => {
    io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
  });

  socket.on("returning signal", payload => {
    io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected"); // Khi client disconnect thì log ra terminal.
  });
  socket.on("message", (data) => {
    io.emit("message", {data});
    })
  })

http.listen(PORT, () => console.log(`Server is running on port ${PORT}`));