const express = require('express');
const routes = express.Router();
const apiCallFromRequest = require('./Request')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();
const turmaController = require('./controllers/turmaController')
const questionarioController = require('./controllers/questionarioController')
const webSocketController = require('./webSocketController')
//rota de retorno da turma
//Precisa reescrever chamada de banco - Thalys
routes.get('/turma',turmaController.getTurma);
//precisa reescrever chamada de banco
routes.get('/Questionarios',questionarioController.getQuestionario);
routes.get('/getQuestoes',questionarioController.getQuestoes);
routes.get('/retornaQuestaoAtual',questionarioController.retornaQuestaoAtual);
routes.post('/conectarAluno',jsonParser,questionarioController.conectarAluno);
routes.post('/salvaPontuacao',jsonParser,questionarioController.salvaPontuacao);
routes.get('/alunosConectados',questionarioController.alunosConectados);
routes.get('/getQuestionarioAluno',questionarioController.getQuestionarioAluno);
//routes.get('/proxQuestao',questionarioController.getProximaQuestao);
routes.post('/conectaQuestionario',jsonParser,questionarioController.liberaQuestionario);
//routes.get('/enableGetQuestionario',questionarioController.enableGetQuestionario);
routes.get('/iniciaQuestionario',questionarioController.iniciaQuestionario);
routes.get('/liberaProximaQuestao',questionarioController.liberaProximaQuestao);

//Precisa reescrever a função, mesma função de getTurma
routes.get('/carregaTurma',questionarioController.carregaTurma);
routes.get('/retornaPodio',questionarioController.retornaPodio);
//routes.ws('/ws', webSocketController.handleConnection);


module.exports = routes;



