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
  
    server.listen(5000, () => {
        console.log('Servidor escutando na porta 5000');
    });