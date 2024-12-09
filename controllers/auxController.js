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
const fs = require('fs');
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

// Função para carregar o HTML e substituir os placeholders
function carregarTemplateEmail(totalErros, data, assuntosErrados) {
    let template = fs.readFileSync('./resources/emailTemplate.html', 'utf8');
    // Substitui os placeholders pelas variáveis dinâmicas
    template = template.replace('{{totalErros}}', totalErros);
    template = template.replace('{{data}}', data);
    template = template.replace('{{assuntosErrados}}', assuntosErrados.map(assunto => `<li class="erro-item">${assunto}</li>`).join(''));
  
    return template;
  }
  


  function enviaEmail(email, dadosAluno, questionario) {
    // Filtra as questões que o aluno errou
    let questoesErradas = dadosAluno.questoes.filter(questao => !questao.acertou);
    //console.log(questoesErradas);
    // Mapeia os temas das questões erradas, garantindo que os IDs sejam comparados corretamente
    let temasErrados = questoesErradas.map(questaoErrada => {
        let questaoInfo = questionario.questoes.find(q => String(q._id) === String(questaoErrada.idQuestao));
        console.log(questaoInfo); // Debug: Verifique se a questão é encontrada corretamente
        return questaoInfo ? questaoInfo.tema : 'Tema não encontrado';
    });

    // Set para evitar repetição de texto/temas no email
    let temasErradosArray = Array.from(new Set(temasErrados)); // Converte o Set em um array
    const emailHTML = carregarTemplateEmail(questoesErradas.length, questionario.nome, temasErradosArray);


    // Configura os detalhes do e-mail
    let mailOptions = {
        from: 'emailengajamentoservico@gmail.com',
        to: email, // E-mail do destinatário
        subject: 'Relatório de Desempenho - Questões Erradas',
        html: emailHTML
    };

    // Envia o e-mail somente para quem errou alguma questao
    if(questoesErradas.length > 0) {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('E-mail enviado: ' + info.response);
        });
    }
}



module.exports={
    enviaEmail,
}
