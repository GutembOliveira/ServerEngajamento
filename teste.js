
    
    const connection = require('./dbConfig.js');
    const WebSocket = require('ws');
    const mongoose = require("mongoose");
    const http = require('http');
    const QuestaoModel = require("./Models/questaoModel.js")
    const QuestionarioModel = require('./Models/questionarioModel.js');
    const RespostasAluno = require('./Models/respostasModel.js');  // Importa o modelo
    
    //const questoes = mongoose.model('Questao', questaoModel);
    const bodyParser = require('body-parser')
    const turmaController = require('./controllers/turmaController.js')
    const webSocketController = require('./webSocketController.js');
    const { response } = require('express');
    
    
    
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let codigo = '';
    const tamanho = 4;

    for (let i = 0; i < tamanho; i++) {
        const randomIndex = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres[randomIndex];
    }
    //const codigoAleatorio = gerarCodigo();
    console.log(codigo);


    async function gerarCodigoQuestionario() {
        await connection(); 
        const ultimoQuestionario = await QuestionarioModel.findOne().sort({ codigo: -1 });
        console.log(ultimoQuestionario);
        return ultimoQuestionario ? (parseInt(ultimoQuestionario.codigo) + 1).toString() : '1';
      }
gerarCodigoQuestionario();
      