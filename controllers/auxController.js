const connection = require('../dbConfig.js');
const WebSocket = require('ws');
const mongoose = require("mongoose");
const http = require('http');
const QuestaoModel = require("../Models/questaoModel.js")
const QuestionarioModel = require('../Models/questionarioModel.js');
const RespostasAluno = require('../Models/respostasModel.js');  // Importa o modelo

//const questoes = mongoose.model('Questao', questaoModel);
const bodyParser = require('body-parser')
const turmaController = require('./turmaController.js')
const webSocketController = require('../webSocketController.js');
const { response } = require('express');

// CONTROLLER PARA FUNÇÕES AUXILIARES
const nodemailer = require('nodemailer');

// Configura o transporte SMTP
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'emailengajamentoservico@gmail.com', // Seu e-mail
        pass: 'uxlj dxpb fzdm lklj' // Senha de aplicativo gerada
    }
});
// function enviaEmail(email,dadosAluno,questionario){

// // Configura os detalhes do e-mail
// let mailOptions = {
//     from: 'emailengajamentoservico@gmail.com',
//     to: 'gunguner1234@gmail.com', // E-mail do destinatário
//     subject: email,
//     text: 'Teste de api do email'
// };

// // Envia o e-mail
// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         return console.log(error);
//     }
//     console.log('E-mail enviado: ' + info.response);
// });
// }



function enviaEmail(email, dadosAluno, questionario) {
    // Filtra as questões que o aluno errou
    let questoesErradas = dadosAluno.questoes.filter(questao => !questao.acertou);
    console.log(questoesErradas);
    // Mapeia os temas das questões erradas, garantindo que os IDs sejam comparados corretamente
    let temasErrados = questoesErradas.map(questaoErrada => {
        let questaoInfo = questionario.questoes.find(q => String(q._id) === String(questaoErrada.idQuestao));
        console.log(questaoInfo); // Debug: Verifique se a questão é encontrada corretamente
        return questaoInfo ? questaoInfo.tema : 'Tema não encontrado';
    });

    // Cria o corpo do e-mail com o número de questões erradas e os temas
    let textoEmail = `Você errou ${questoesErradas.length} questões no questionário "${questionario.nome}".\nTemas das questões que você errou:\n` +
        temasErrados.join('\n');

    // Configura os detalhes do e-mail
    let mailOptions = {
        from: 'emailengajamentoservico@gmail.com',
        to: email, // E-mail do destinatário
        subject: 'Relatório de Desempenho - Questões Erradas',
        text: textoEmail
    };

    // Envia o e-mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('E-mail enviado: ' + info.response);
    });
}



module.exports={
    enviaEmail,
}