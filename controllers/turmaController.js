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
     
      //console.log(alunos);

      // Retorna o resultado
      //descomentar somente para teste em localhost, impacta no desempenho do servidor.
      //console.log(alunos);
      return alunos;
    } catch (error) {
    }
  }
 

// async function getTurma(request, response) {
//     try {
//       // Conecta ao banco de dados (certifique-se de que a conexão está aberta)
//       await connection(); 
//       // Verifica se a coleção "aluno" existe
//     const  alunos = await mongoose.connection.db.collection("Aluno").find().toArray();
     
//       // Retorna o resultado
//       response.json(alunos);
//     } catch (error) {
//       console.error('Erro ao consultar a coleção aluno:', error);
//       response.status(500).json({ error: 'Erro ao consultar a coleção aluno' });
//     }
//   }



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

  async function getTurmas(request, response) {
    try {
        // Conectando ao MongoDB
        await connection(); 

        // Busca todas as turmas
        const turmas = await mongoose.connection.db.collection("Turma").find().toArray();

        if (!turmas || turmas.length === 0) {
            console.log('Nenhuma turma encontrada.');
            return response.status(404).json({ message: 'Nenhuma turma encontrada' });
        }

        // Para cada turma, busca os alunos associados
        const turmasComAlunos = await Promise.all(turmas.map(async (turma) => {
            const alunos = await mongoose.connection.db.collection("Aluno").find({ Turma: turma.codigo }).toArray();
            turma.alunos = alunos; // Associa os alunos à turma
            return turma;
        }));

        // Retorna o resultado com turmas e alunos associados
        response.json(turmasComAlunos);

    } catch (error) {
        console.error('Erro ao consultar as coleções:', error);
        response.status(500).json({ error: 'Erro ao consultar as coleções' });
    }
}

module.exports = {
getTurmaQuiz,
getTurma,
getTurmas


}

