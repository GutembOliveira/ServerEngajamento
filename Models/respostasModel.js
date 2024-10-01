const mongoose = require('mongoose');

// Modelo do documento RespostasAluno
const RespostasAlunoSchema = new mongoose.Schema({
  matricula: String,
  pontuacao: Number,
  data: { type: Date, default: Date.now }, // Data será automaticamente registrada
  questoes: [
    {
      idQuestao: String,
      acertou: Boolean
    }
  ]
});

// Criação do modelo com base no schema
const RespostasAluno = mongoose.model('RespostasAluno', RespostasAlunoSchema);

// Exporta o modelo para ser usado em outros arquivos
module.exports = RespostasAluno;