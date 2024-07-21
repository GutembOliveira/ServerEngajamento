const express = require("express");
const db = require("./dbConfig.js")
const http = require('http'); 
const cors = require("cors");
const mysql = require("mysql");
const routes = require('./routes.js');
const questionarioController = require('./questionarioController.js');
const fs = require("fs")
const bodyParser = require('body-parser');
const app=express();
    app.use(cors());
    app.use(routes);
    app.listen(5000,()=>console.log("servidor escutando"));
    const server = http.createServer(app);
    
    // https.createServer({
    //     cert:fs.readFileSync('SSL/code.crt'),
    //     key:fs.readFileSync('SSL/code.key'),
// Lida com as atualizações de protocolo para WebSocket
server.on('upgrade', (request, socket, head) => {
    questionarioController.handleUpgrade(request, socket, head); // Chama o método de handleUpgrade do controlador do WebSocket
});
    server.listen(5001, () => {
        console.log(`Servidor rodando na porta ${5001}`);
    });
    // },app).listen(3001,()=>console.log("Server https funcionando"))

