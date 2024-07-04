const express = require("express");
const db = require("./dbConfig.js")
const https = require('https'); 
const cors = require("cors");
const mysql = require("mysql");
const routes = require('./routes.js');
const fs = require("fs")
const bodyParser = require('body-parser');

const app=express();
    app.use(cors());
    app.use(routes);
    app.listen(5000,()=>console.log("servidor escutando"));
    https.createServer({
        cert:fs.readFileSync('SSL/code.crt'),
        key:fs.readFileSync('SSL/code.key')
    },app).listen(3001,()=>console.log("Server https funcionando"))


    // app.get("/getAluno",(req,res)=>{


    //     res.send("Conexão com sucesso")
    //     console.log("conexão sucesso")
    // })