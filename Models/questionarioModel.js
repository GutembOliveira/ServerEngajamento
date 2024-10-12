const mongoose = require('mongoose');

const questionarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String, default: '' },
  codigo: { type: String, required: true },
}, { collection: 'Questionario' });  

const Questionario = mongoose.model('Questionario', questionarioSchema);
module.exports = Questionario;
