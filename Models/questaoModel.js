const mongoose = require("mongoose");

// Define o modelo de dados para a coleção 'Questao'
const questaoSchema = new mongoose.Schema({
    enunciado: { type: String, required: false },
    resposta: { type: String, default: null }, // Permite valores null
    codigoQuestionario: { type: String, default: null },
    tema: { type: String, default: null }, // Permite valores null
}, { collection: 'Questao' });  

const Questao = mongoose.model('Questao', questaoSchema);

// Exporte apenas o modelo
module.exports = Questao; // Exportando o modelo diretamente
