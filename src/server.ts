import express from 'express';
import http from 'http';
import socketIO from 'socket.io';

const app = express();
const server = http.createServer(app);
const sockets = socketIO(server);

app.use(express.static('src')); // Deixa a pasta src publica.

let messages = Array(); // Armazena temporariamente as mensagens.

sockets.on('connection', (socket: any) => {
    console.log(`Conectado ${socket.id}`);

    // socket emit - Emite uma mensagens ao socket.
    socket.emit('previousMessages', messages); // Envia o array messages assim que o usuario se conecta.

    // socket on - Ouve uma solicitacao.
    socket.on('sendMessage', (data: any) => {
        messages.push(data); // Adiciona a mensagem ao array de mensagens.

        // socket broadcast.emit - Envia uma mensagem a todos os sockets conectados.
        socket.broadcast.emit('receivedMessage', data);
    })
})

server.listen(3333);
