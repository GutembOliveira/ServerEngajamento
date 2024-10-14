const connection = require('../dbConfig.js');
const WebSocket = require('ws');
const mongoose = require("mongoose");
const alunoModel = require("../Models/alunoModel.js")
const Aluno = mongoose.model('Aluno', alunoModel);




async function getTurmaQuiz(codigoTurma) {
    try {
      // Conecta ao banco de dados (certifique-se de que a conexão está aberta)
      await connection(); 
      console.log("codigo turma recebido:"+codigoTurma);
      // Verifica se a coleção "aluno" existe
      if(codigoTurma!=0){
        const alunos = await mongoose.connection.db.collection("Aluno").find({Turmas:codigoTurma}).toArray();
        console.log(alunos);
        return alunos;
      }
      else{
         const alunos = await mongoose.connection.db.collection("Aluno").find().toArray();
         console.log(alunos);
         return alunos;
        }
      // Retorna o resultado
      //descomentar somente para teste em localhost, impacta no desempenho do servidor.
      //console.log(alunos);
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

async function getTurmaTeste(request, response) {
  try {
    // Conecta ao banco de dados (certifique-se de que a conexão está aberta)
    const {codigoTurma} = request.body;
    console.log(codigoTurma);
    await connection(); 
    // Verifica se a coleção "aluno" existe
  const  alunos = await mongoose.connection.db.collection("Aluno").find({ Turmas: Number(codigoTurma) }).toArray();
   
    // Retorna o resultado
    response.json(alunos);
  } catch (error) {
    console.error('Erro ao consultar a coleção aluno:', error);
    response.status(500).json({ error: 'Erro ao consultar a coleção aluno' });
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

        // // Para cada turma, busca os alunos associados
        // const turmasComAlunos = await Promise.all(turmas.map(async (turma) => {
        //     const alunos = await mongoose.connection.db.collection("Aluno").find({ Turma: turma.codigo }).toArray();
        //     turma.alunos = alunos; // Associa os alunos à turma
        //     return turma;
        // }));

        // Retorna o resultado com turmas e alunos associados
        response.json(turmas);

    } catch (error) {
        console.error('Erro ao consultar as coleções:', error);
        response.status(500).json({ error: 'Erro ao consultar as coleções' });
    }
}

function findAluno(turma,matricula){
  for (let item of turma) {

      if(item['Matricula']== matricula){
          console.log("ALUNO ENCONTRADO");
          return item;
      }
  }
     // Debug: Log do aluno encontrado
     console.log("Aluno não encontrado:");
}

module.exports = {
getTurmaQuiz,
getTurma,
getTurmas,
getTurmaTeste,
findAluno,


}

