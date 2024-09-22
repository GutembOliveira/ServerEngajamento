const mongoose = require("mongoose");

// Define o modelo de dados para a coleção 'Questao'
const questaoSchema = new mongoose.Schema({
    enunciado: { type: String, required: true },
    resposta: { type: String, default: null }, // Permite valores null
});

const Questao = mongoose.model('Questao', questaoSchema);

// Exporte apenas o modelo
module.exports = Questao; // Exportando o modelo diretamente
