const express = require('express');
const routes = express.Router();
const apiCallFromRequest = require('./Request')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();
const turmaController = require('./controllers/turmaController')
const questionarioController = require('./controllers/questionarioController')
const webSocketController = require('./webSocketController')
//rota de retorno da turma
//funcionando
routes.get('/turma',turmaController.getTurma);
routes.get('/getTurmas',turmaController.getTurmas);
//funcionando
routes.get('/Questionarios',questionarioController.getQuestionario);
routes.get('/getTurmaTeste',turmaController.getTurmaTeste);
routes.get('/getQuestionarioTeste',questionarioController.getQuestionarioTeste);
routes.get('/retornaQuestaoAtual',questionarioController.retornaQuestaoAtual);
routes.post('/conectarAluno',jsonParser,questionarioController.conectarAluno);
routes.post('/salvaPontuacao',jsonParser,questionarioController.salvaPontuacao);
routes.get('/alunosConectados',questionarioController.alunosConectados);
//funcionando
routes.get('/getQuestionarioAluno',questionarioController.getQuestionarioAluno);
//routes.get('/proxQuestao',questionarioController.getProximaQuestao);
routes.post('/conectaQuestionario',jsonParser,questionarioController.liberaQuestionario);
//routes.get('/enableGetQuestionario',questionarioController.enableGetQuestionario);
routes.get('/iniciaQuestionario',questionarioController.iniciaQuestionario);
routes.get('/liberaProximaQuestao',questionarioController.liberaProximaQuestao);
//funcionando
routes.get('/carregaturma',questionarioController.carregaTurma);
routes.get('/retornaPodio',questionarioController.retornaPodio);
routes.get('/limparEstado',questionarioController.limparEstado);


module.exports = routes;



