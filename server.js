const { log } = require("console");
const express = require("express");
const app = express();

// server
const http = require('http').createServer(app);
const io = require('socket.io')(http)

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.static(__dirname + '/public'))

// Route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket
io.on('connection', (socket) => {
    console.log('connected...');

    // Getting from client
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })
})

// Listenner
http.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`))