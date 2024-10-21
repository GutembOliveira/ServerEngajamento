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




async function cadastraQuestionario(request, response) {
    const { questionario } = request.body;
    console.log(questionario);
    await connection(); 
    const session = await mongoose.startSession();
    try {
      session.startTransaction(); // Inicia a transação
      // 1. Criar e salvar o questionário
      const novoQuestionario = new QuestionarioModel({
        nome: questionario.nome,
        descricao: questionario.descricao,
        
        codigo: questionario.codigo || (await gerarCodigoQuestionario())
      });
      console.log(novoQuestionario);
      // Salva o questionário no banco de dados
      await novoQuestionario.save({ session });
      // 2. Salvar as questões associadas ao questionário
      const questoes = questionario.questoes.map(questaoData => ({
        enunciado: questaoData.enunciado,
        resposta: normalizaResposta(questaoData.resposta),
        tema: questaoData.tema,
        codigoQuestionario: novoQuestionario.codigo
      }));
      // Salva as questões em lote
      await QuestaoModel.insertMany(questoes, { session });
      // Commit da transação
      await session.commitTransaction();
      response.status(200).json({ success: true, message: "Questionário e questões cadastrados com sucesso!", questionario: novoQuestionario });
    } catch (error) {
      await session.abortTransaction(); // Aborta a transação em caso de erro
      console.error('Erro ao cadastrar questionário e questões:', error);
      response.status(500).json({ success: false, message: 'Erro ao cadastrar questionário e questões.', error });
    } finally {
      session.endSession(); // Finaliza a sessão
      console.log("Sessão finalizada.");
    }
  }
  
  // Função auxiliar para gerar um código de questionário automaticamente
  async function gerarCodigoQuestionario() {
    const ultimoQuestionario = await QuestionarioModel.findOne().sort({ codigo: -1 }).exec();

    return ultimoQuestionario ? (parseInt(ultimoQuestionario.codigo) + 1).toString() : '1';
  }
  
 ///coloca a resposta no formato
  function normalizaResposta(resposta){
    if (typeof resposta === 'string') {
      resposta = resposta.toLowerCase(); // Converter para minúsculo para evitar problemas com maiúsculas/minúsculas
    }
    
    if (resposta === 'v' || resposta === 'verdadeiro' || resposta === 'true' || resposta ==="Verdadeiro") {
      return 'V';
    } else if (resposta === 'f' || resposta === 'falso' || resposta === 'false' || resposta === "Falso") {
      return 'F';
    } else {
      throw new Error(`Resposta inválida: ${resposta}`); // Caso a resposta não seja válida
    }
  }

// Função para deletar um questionário e suas questões associadas
async function deletarQuestionario(request, response) {
    const { codigoQuestionario } = request.body; // Recebe o código do questionário no corpo da requisição
    await connection(); 
    const session = await mongoose.startSession();
    
    try {
      session.startTransaction(); // Inicia a transação
  
      // 1. Deletar as questões associadas ao questionário
      const questoesDeletadas = await QuestaoModel.deleteMany({ codigoQuestionario }, { session });
      console.log(`${questoesDeletadas.deletedCount} questões deletadas.`);
  
      // 2. Deletar o questionário
      const questionarioDeletado = await QuestionarioModel.deleteOne({ codigo: codigoQuestionario }, { session });
      console.log(`Questionário deletado: ${questionarioDeletado.deletedCount}`);
  
      // Commit da transação
      await session.commitTransaction();
      
      response.status(200).json({ success: true, message: "Questionário e questões deletados com sucesso." });
  
    } catch (error) {
      await session.abortTransaction(); // Aborta a transação em caso de erro
      console.error('Erro ao deletar questionário e questões:', error);
      response.status(500).json({ success: false, message: 'Erro ao deletar questionário e questões.', error });
    } finally {
      session.endSession(); // Finaliza a sessão
      console.log("Sessão finalizada.");
    }
  }
  



  module.exports = {
    cadastraQuestionario,
    deletarQuestionario
}