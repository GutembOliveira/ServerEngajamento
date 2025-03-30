const connection = require('../dbConfig.js');
const WebSocket = require('ws');
const mongoose = require("mongoose");
const http = require('http');
const QuestaoModel = require("../Models/questaoModel.js")
const QuestionarioModel = require('../Models/questionarioModel.js');
const RespostasAluno = require('../Models/respostasModel.js');  // Importa o modelo
const bodyParser = require('body-parser')
const turmaController = require('./turmaController.js')
const webSocketController = require('../webSocketController.js');
// CONTROLLER PARA FUNÇÕES AUXILIARES
const nodemailer = require('nodemailer');
const axios = require('axios');
const OpenAI = require('openai');
const { response } = require('express');
const chatConnection = require('../chatConnection.js');
//-----------configurações da api
const apiKey = chatConnection.apiKey  // Substitua com sua chave da API
const prompt = "Me dê um resumo sobre as habilidades do Jhin, campeão de League of Legends.";
const url = 'https://api.openai.com/v1/chat/completions';



const openai = new OpenAI({
  apiKey: apiKey,  // Substitua com sua chave de API da OpenAI
});

async function getChatGPTResponse(questionario) {
  try {
    const prompt = `
    Você é um assistente especializado em análise de questionários. Abaixo está um questionário em formato JSON. Para cada questão, por favor, adicione um campo 'explicacao' contendo uma breve descrição sobre a resposta correta. O questionário está no formato JSON. Retorne o questionário com o campo 'explicacao' adicionado para cada questão.
    Questionário. Retorne apenas o questionario atualizado, sem nenhum comentário adicional: 
    ${JSON.stringify(questionario)}
  ;`
    // Fazendo a chamada correta para a API utilizando o novo formato
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",  // Ou "gpt-3.5-turbo", dependendo do modelo que você deseja usar
      messages: [
        { role: "user", content: prompt},
      ],
    });
    const messageContent = completion.choices[0].message.content;
    // Exibe a resposta gerada pelo modelo
    console.log("Resposta do ChatGPT:", completion.choices[0].message.content);
    const parsedContent = JSON.parse(messageContent);

    return(parsedContent)
  } catch (error) {
    console.error("Erro ao obter resposta:", error);
  }
}






async function  apiTeste(request,response){
    const questionario = request.body;
    const chatGPTResponse = await getChatGPTResponse(questionario);
    response.status(200).send({ message: chatGPTResponse });

}

module.exports={
    apiTeste,
    getChatGPTResponse
    
}
