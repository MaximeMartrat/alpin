const { resolveObjectURL } = require('buffer');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = 3100;
app.use(express.static("public"));
bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
//route pour afficher telec.html
app.get('/', (req, res)=> {
    res.sendFile( __dirname + '/public/telec.html')
});
//route pour afficher robot.html
app.get('/robot', (req, res)=> {
    res.sendFile( __dirname + '/public/robot.html')
});
//importation de socket.io et initialisation du server socket.io
const { Server } = require('socket.io');
const io = new Server(server);

//écoute des évènements connexion et envoi d'un socket à chaque connexion
io.on('connection', (socket) => {
    socket.on('move', (direction) => {
        // Émettre la nouvelle position à tous les clients connectés
        socket.broadcast.emit('move', direction); 
        }
    );
});
//server sur le port defini
server.listen(PORT, ()=>{
    console.log('server on ' + PORT)
})

