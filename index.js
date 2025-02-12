const express = require('express');
const socket = require('socket.io');

const app = express();
const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
});

//var server = require('http').createServer(app);
app.use(express.static('public'));

const io = socket(server);

io.on('connection', (socket) => {
    console.log('Connected to the server', socket.id);

    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });

    socket.on('disconnect', () => {
        console.log(`Cliente desconectado: ${socket.id}`);
    });
});