const express = require('express');
const routes = express.Router();
const turmaController = require('./turmaController')
const questionarioController = require('./questionarioController')
//rota de retorno da turma
routes.get('/turma',turmaController.getTurma);
routes.get('/Questionarios',questionarioController.getQuestionario);
routes.get('/proxQuestao',questionarioController.getProximaQuestao);
routes.get('/conectaQuestionario',questionarioController.liberaQuestionario);
routes.get('/enableGetQuestionario',questionarioController.enableGetQuestionario);


module.exports = routes;



