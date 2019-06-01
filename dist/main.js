"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const users_router_1 = require("./users/users.router");
const server = new server_1.Server();
server.bootstrap([users_router_1.usersRouter]).then(server => {
    console.log('o servidor está usando o enderenço:', server.application.address());
}).catch(error => {
    console.log('Server deu problema');
    console.error(error);
    process.exit(1); // indicando que é uma saída normal
});
/* Explicações
//* sempre  que alguem digitar no browse a url http://localhost:3000/hello que for digita no browser a url será chamada
precisa ser instanciada no server.get('/urlqueserachamada', (req, resp, next)...)

request - representa os dados que vem do request
response - objeto que usa apra dar uma respost > envia uma resposta
next - objeto que sera utilizado após o termino do callback , função que indica ao restify que nossa callback terminou oque ela precisa terminar de fazer
quando temos mais de uma callback associada para mais de um caminho, podendo ser utilizada em forma de array.

*/ 
