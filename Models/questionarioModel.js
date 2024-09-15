const mongoose = require("mongoose");
// Define o modelo de dados para a coleção 'Aluno'
const questionarioSchema = new mongoose.Schema({
    enunciado: { type: String, required: true },
    resposta: { type: String, default: null }, // Permite valores null
    
});

module.exports= {
    questionarioSchema,
}