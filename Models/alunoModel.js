const mongoose = require("mongoose");
// Define o modelo de dados para a coleção 'Aluno'
const alunoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    matricula: { type: Number, default: null }, // Permite valores null
    email: { type: String, default: null } // Permite valores null
});

module.exports= {
    alunoSchema,
}