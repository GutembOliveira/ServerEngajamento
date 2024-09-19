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
      console.log("alunos recuperados");
      //console.log(alunos);
      let turma = alunos.map(aluno => ({
        id: aluno._id, // Usando aluno._id, que vem como ObjectId
        nome: aluno.nome,
        email: aluno.email,
        matricula: aluno.matricula
      }));
      console.log("mapeamento");
      //console.log(turma);

      // Retorna o resultado
      //descomentar somente para teste em localhost, impacta no desempenho do servidor.
      //console.log(alunos);
      return turma;
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

