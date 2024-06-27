const express = require("express");
const db = require("../BACKEND-APP/dbConfig.js")
const cors = require("cors");
const mysql = require("mysql");
const routes = require('../BACKEND-APP/routes.js');
const app=express();
    app.use(cors());
    app.use(routes);
    app.listen(5000,()=>console.log("servidor escutando"));


    // app.get("/getAluno",(req,res)=>{


    //     res.send("Conexão com sucesso")
    //     console.log("conexão sucesso")
    // })