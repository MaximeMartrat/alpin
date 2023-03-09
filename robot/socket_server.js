const express = require('express');
const app = express();
const http = require('http');
// instance de server qui utilise http et express
const server = http.createServer(app);
// instancier io
const { Server } = require('socket.io');
const io = new Server(server);

const PORT = 3000;
// on initialise la connexion
io.on('connection', (socket) => {
    console.log('user connected')
    //on repond au socket connecté
    socket.broadcast.emit('hi');

//on gère les différents évènements
    //on reçoit les messages du client
    socket.on('chat message', (msg) => {
        //on broadcast à tous le monde
        io.emit('chat message', msg)
    });

    //deconnexion du client
    socket.on('disconnect', () => {
        console.log('user disconnected')
    });
});

app.use(express.static("public"));

// app.get('/', (req, res)=> {
//     res.send('hello')
// });

server.listen(PORT, () => {
    console.log('server on ' + PORT)
})