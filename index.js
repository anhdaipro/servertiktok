const app = require('express')()
const http = require('http').createServer(app)
const io = require("socket.io")(http, {
  cors: {
      origin: "*",
  }
}); 
io.on('connection', socket => {
  socket.on('message', (data) => {
    io.emit('message', {data})
  })
})


http.listen(4000, function() {
  console.log('listening on port 4000')
})