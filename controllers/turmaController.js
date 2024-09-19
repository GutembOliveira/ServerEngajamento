const connection = require('../dbConfig.js');
const WebSocket = require('ws');
const mongoose = require("mongoose");
const alunoModel = require("../Models/alunoModel.js")
const Aluno = mongoose.model('Aluno', alunoModel);




async function getTurmaQuiz() {
    try {
      // Conecta ao banco de dados (certifique-se de que a conexão está aberta)
      await connection(); 
      // Verifica se a coleção "aluno" existe
      const  alunos = await mongoose.connection.db.collection("Aluno").find().toArray();
     
      // Retorna o resultado
      console.log(alunos);
      return json(alunos);
    } catch (error) {
    }
  }
 

async function getTurma(request, response) {
    try {
      // Conecta ao banco de dados (certifique-se de que a conexão está aberta)
      await connection(); 
      // Verifica se a coleção "aluno" existe
    const  alunos = await mongoose.connection.db.collection("Aluno").find().toArray();
     
      // Retorna o resultado
      response.json(alunos);
    } catch (error) {
      console.error('Erro ao consultar a coleção aluno:', error);
      response.status(500).json({ error: 'Erro ao consultar a coleção aluno' });
    }
  }
 
module.exports = {
getTurmaQuiz,
getTurma


}

