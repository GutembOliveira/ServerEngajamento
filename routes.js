const express = require('express');
const routes = express.Router();
const apiCallFromRequest = require('./Request')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();

// app.use(express.json());
// app.use('/api', Anyroute)
const turmaController = require('./turmaController')
const questionarioController = require('./questionarioController')
//rota de retorno da turma

routes.get('/turma',turmaController.getTurma);
routes.get('/Questionarios',questionarioController.getQuestionario);
routes.post('/conectarAluno',jsonParser,questionarioController.conectarAluno);
routes.get('/alunosConectados',questionarioController.alunosConectados);
routes.get('/questionarioAluno',questionarioController.getQuestionarioAluno);
routes.get('/proxQuestao',questionarioController.getProximaQuestao);
routes.post('/conectaQuestionario',jsonParser,questionarioController.liberaQuestionario);
//routes.get('/enableGetQuestionario',questionarioController.enableGetQuestionario);
routes.get('/iniciaQuestionario',questionarioController.iniciaQuestionario);
routes.get('/liberaProximaQuestao',questionarioController.liberaProximaQuestao);



module.exports = routes;



