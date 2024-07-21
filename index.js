const express = require("express");
const db = require("./dbConfig.js")
const http = require('http'); 
const cors = require("cors");
const mysql = require("mysql");
const routes = require('./routes.js');
const WebSocket = require('ws');
const webSocketController = require('./webSocketController');
const questionarioController = require('./questionarioController.js');
const fs = require("fs")
const bodyParser = require('body-parser');
const app=express();
    app.use(cors());
    app.use(routes);
    //app.listen(5000,()=>console.log("servidor escutando"));
    const server = http.createServer(app);
    const wss = new WebSocket.Server({ server });
    //server.listen(5000,()=>console.log("servidor escutando"));
    wss.on('connection', (ws) => {
        webSocketController.handleConnection(ws);
    });
    // wss.on('connection', (ws, request) => {
    //     const clientId = Date.now();
    //     console.log(`Novo cliente WebSocket conectado: ${clientId}`);
    
    //     ws.on('message', (message) => {
    //         console.log(`Mensagem recebida do cliente ${clientId}: ${message}`);
    //         // Processar a mensagem recebida, se necessário
    //         // Exemplo: questionarioController.processMessage(clientId, message);
    //     });
    
    //     ws.on('close', () => {
    //         console.log(`Cliente WebSocket desconectado: ${clientId}`);
    //         // Remover cliente da lista, se necessário
    //     });
    
    //     ws.send(JSON.stringify({ message: 'Conexão estabelecida' }));
    
    //     // Chamada da rota HTTP quando um cliente se conecta
    //     callHttpRoute()
    //     //questionarioController.getProximaQuestao();
    // });
    // Função para chamar a rota HTTP
// function callHttpRoute() {
//     const http = require('http');

//     const options = {
//         hostname: 'localhost',
//         port: 5000,
//         path: '/liberaproxquestao',
//         method: 'GET'
//     };

//     const req = http.request(options, (res) => {
//         let data = '';

//         res.on('data', (chunk) => {
//             data += chunk;
//         });

//         res.on('end', () => {
//             console.log(`Resposta da rota HTTP: ${data}`);
//         });
//     });

//     req.on('error', (e) => {
//         console.error(`Erro ao chamar rota HTTP: ${e.message}`);
//     });

//     req.end();
// }
    
    // Iniciando o servidor
    server.listen(5000, () => {
        console.log('Servidor escutando na porta 5000');
    });