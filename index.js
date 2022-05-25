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

app.listen(process.env.PORT || 4000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
