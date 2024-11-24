const connection = require('../dbConfig.js');
const WebSocket = require('ws');
const mongoose = require("mongoose");
const http = require('http');
const QuestaoModel = require("../Models/questaoModel.js")
const QuestionarioModel = require('../Models/questionarioModel.js');
const RespostasAluno = require('../Models/respostasModel.js');  // Importa o modelo
const auxController = require('./auxController.js');
//const questoes = mongoose.model('Questao', questaoModel);
const bodyParser = require('body-parser')
const turmaController = require('./turmaController.js')
const webSocketController = require('../webSocketController.js');
const { response } = require('express');
let codigoAleatorio="";

var questionario;
var numAlunos = 0;
var clientesId = [];
let clients = [];
let turma = [];
var questaoAtual = 0;
// lista de alunos que responderam a questão e estão esperando a próxima
let alunosProntos =[]
let listaAlunosConectados = [];
let requestQueue = [];
let canCallGetQuestionario = false;
// Criando uma lista de objetos dinamicamente
const jsonParser = bodyParser.json();



async function getQuestionario(request, response){

  // Conecta ao banco de dados (certifique-se de que a conexão está aberta)
  await connection(); 
  // Verifica se a coleção "aluno" existe
  let questionario = await mongoose.connection.db.collection("Questionario").find().toArray();
 
  // Retorna o resultado
  //response.json(questionario);
            // Processa os resultados para montar o JSON personalizado
            //let questoesMap = {};
            // result.forEach(row => {
            //     if (!questoesMap[row.idQuestao]) {
            //         questoesMap[row.idQuestao] = {
            //             idQuestao: row.idQuestao,
            //             enunciado: "Determine se as afirmações abaixo são verdadeiras (V) ou falsas (F)",
            //             alternativas: []
            //         };
            //     }
            //     questoesMap[row.idQuestao].alternativas.push({
            //         questao: row.idQuestao,
            //         idalternativas: row.idalternativas,
            //         letra: row.letra,
            //         descricao: row.descricao,
            //         resposta: row.resposta
            //     });
            // });
            // // Converte o mapa em uma lista
            // let questoesList = Object.values(questoesMap);
            // questionario = questoesList;
            console.log(questionario.length)
            response.json(questionario);

    
}


  
async function getQuestionarioTeste(request, response){

    // Conecta ao banco de dados (certifique-se de que a conexão está aberta)
    await connection(); 

        // Busca o questionário com código '1'
        let questionarioCarregado = await mongoose.connection.db.collection("Questionario").findOne({ codigo: '1' });

        if (!questionario) {
          console.log('Questionário não encontrado com o código: 1');
          return response.status(404).json({ message: 'Questionário não encontrado' });
        }
    
        // Busca as questões associadas ao questionário
        const questoes = await mongoose.connection.db.collection("Questao").find({ codigoQuestionario: questionario.codigo }).toArray();
    
        // Adiciona as questões ao questionário
        questionarioCarregado.questoes = questoes;
        questionario = questionarioCarregado
        console.log(questionario);
        response.json(questionario);
      
  }

  
  
  async function getQuestoes(request, response){

    // Conecta ao banco de dados (certifique-se de que a conexão está aberta)
    await connection(); 

        // Busca o questionário com código '1'
        //let questionarioCarregado = await mongoose.connection.db.collection("Questionario").findOne({ codigo: '1' });

        // if (!questionario) {
        //   console.log('Questionário não encontrado com o código: 1');
        //   return response.status(404).json({ message: 'Questionário não encontrado' });
        // }
    
        // Busca as questões associadas ao questionário
        const questoes = await mongoose.connection.db.collection("Questao").find().toArray();
    
        // Adiciona as questões ao questionário
        //questionarioCarregado.questoes = questoes;
        //questionario = questionarioCarregado
        console.log(questoes);
        response.json(questoes);
      
  }


function retornaQuestaoAtual(request,response){
    return response.json(questaoAtual);;
}

 
async function carregaQuestionario(request, response){
     const {codigoQuestionario} = request.body;
     // Conecta ao banco de dados (certifique-se de que a conexão está aberta)
     await connection(); 
        // Busca o questionário com código '1'
     let questionarioCarregado = await mongoose.connection.db.collection("Questionario").findOne({codigo:codigoQuestionario});

    if (!questionarioCarregado) {
        console.log('Questionário não encontrado com o código: '+codigoQuestionario);
        return response.status(404).json({ message: 'Questionário não encontrado' });
    }

    // Busca as questões associadas ao questionário
    const questoes = await mongoose.connection.db.collection("Questao").find({ codigoQuestionario: questionarioCarregado.codigo }).toArray();

    // Adiciona as questões ao questionário
    questionarioCarregado.questoes = questoes;

    questionario = questionarioCarregado
    console.log(canCallGetQuestionario);
    console.log(questionario);
    response.json(questionario);



  
      
  }

  
async function getQuestionarioAluno(request, response){
    const {matricula} = request.body;
    console.log("matricula recebida:"+matricula)
    // Conecta ao banco de dados (certifique-se de que a conexão está aberta)
    await connection(); 
        // AQUI DEVE SER CHAMADA A FUNÇÃO QUE PROCESSA A MATRICULA DO ALUNO E RETORNA O QUESTIONÁRIO PERSONALIZADO
    

        //console.log(questionario)
        if(canCallGetQuestionario==true){
            console.log(canCallGetQuestionario);
            console.log(questionario);
            response.json(questionario);
        }
        else{
            console.log(canCallGetQuestionario)
                response.json("questionario não liberado");
            }
        // console.log(questionario)
        // response.json(questionario);


  
      
  }

// function getQuestionarioAluno(request, response){
//     clientesId.push(request.id);
//     requestQueue.push({ request, response });
//     var sql = `
//     SELECT 
//         q.idQuestao,
//         q.enunciado,  
//         q.fkAssunto,
//         q.tipoQuestao,
//         a.idalternativas,
//         a.Questao_idQuestao,
//         a.Questao_fkAssunto,
//         a.letra,
//         a.descricao,
//         a.resposta
//     FROM 
//         mydb.Questao q
//     INNER JOIN 
//         mydb.alternativas a ON q.idQuestao = a.Questao_idQuestao
//     WHERE 
//          q.fkAssunto = 12
//     ORDER BY 
//         q.idQuestao, a.letra
// `;
//         connection.query(sql, function (err, result) {
//             if (err) {
//                 return "error:"+ (err);
//             }
//             // Processa os resultados para montar o JSON personalizado
//             let questoesMap = {};

//             result.forEach(row => {
//                 if (!questoesMap[row.idQuestao]) {
//                     questoesMap[row.idQuestao] = {
//                         idQuestao: row.idQuestao,
//                         enunciado: "Determine se as afirmações abaixo são verdadeiras (V) ou falsas (F)",
//                         alternativas: []
//                     };
//                 }

//                 questoesMap[row.idQuestao].alternativas.push({
//                     questao: row.idQuestao,
//                     idalternativas: row.idalternativas,
//                     letra: row.letra,
//                     descricao: row.descricao,
//                     resposta: row.resposta
//                 });
//             });

//             // Converte o mapa em uma lista
//             let questoesList = Object.values(questoesMap);
//             questionario = questoesList;
//             //console.log(questionario)
//             if(canCallGetQuestionario==true){
//                 console.log(canCallGetQuestionario);
//                 console.log(questionario);
//                 response.json(questionario);
//             }
//             else{
//                 console.log(canCallGetQuestionario)
//                  response.json("questionario não liberado");
//                 }
//         });
// }
//=======================================================
//WEBSOCKET
// Função para gerenciar conexões WebSocket
function wsConnection(ws, request) {
    console.log('Novo cliente WebSocket conectado');
    const clientId = Date.now();
    const newClient = { id: clientId, ws };
    clients.push(newClient);

    ws.on('message', (message) => {
        console.log(`Mensagem recebida do cliente ${clientId}: ${message}`);
    });

    ws.on('close', () => {
        console.log(`Cliente WebSocket desconectado: ${clientId}`);
        clients = clients.filter(client => client.id !== clientId);
    });

    ws.send(JSON.stringify({ message: 'Conexão estabelecida' }));
}

function retornaPodio(request, response) {
    
    let podio = listaAlunosConectados.sort((a, b) => b["pontuacao"] - a["pontuacao"]);
    console.log(podio);
    return response.json(podio);
}

//Professor aperta para passar para a próxima questão   
function liberaProximaQuestao(request, response) {
        listaAlunosConectados.length = 0;
        webSocketController.sendToAllClients("true");
        // Envia o valor numérico para todos os clientes conectados
        sendToAllClients("true");
        questaoAtual+=1;
        console.log(questaoAtual)
        response.json("Evento enviado para todos os clientes");
        console.log(clients.length);
        console.log("resposta mandada para todos os alunos");
}


// Rota específica para SSE

//rota que ficará escutando pela resposta do servidor. Virá do lado do aluno

function getProximaQuestao(request,response){
  
        console.log("aluno pedindo prox questão")
        const newClient = {
            id: Date.now(),
            response: response  
        };
        clients.push(newClient);
        console.log("aluno adicionado:",clients)
        
        const intervalId = setInterval(() => {
            //response.write(`data: ${JSON.stringify({ number: 8 })}\n\n`);
        }, 5000); // Envia dados a cada 5 segundos
    
       
    
    
}

  function sendToAllClients(message) {
    clients.forEach(client => {
        console.log(client.id)

        //if (client.readyState === WebSocket.OPEN) { // Verifica se o cliente está aberto
            console.log("conexao aberta");
            client.ws.send(message);
        //}
    });
}
function addAlunoPronto(request,response){
    turmaController.getTurmaQuiz()
    console.log(turma);

}



function adicionarAluno(matricula, nome) {
  let aluno = {
    matricula: matricula,
    nome: nome,
    pontuacao: 0
  };
  var alunoConectado = false;
  listaAlunosConectados.forEach(item => {
    //console.log("aluno a ser verificado: "+ aluno.matricula)
    //console.log("item a ser verificado: "+ item.matricula)
    if(item.matricula==aluno.matricula){
        console.log("aluno já conectado")
        alunoConectado = true;
        return;;
    }
  });
  if(!alunoConectado)
  listaAlunosConectados.push(aluno);
}



function liberaQuestionario(request, response) {
    clientesId.push(request.id);
    requestQueue.push({ request, response });

    if (canCallGetQuestionario) {
    //if (requestQueue.length >= 5 && canCallGetQuestionario) {
        getQuestionario().then(result => {
            // Enviar a mesma resposta para todos os clientes na fila
            requestQueue.forEach(({ response }) => {
                response.json(result);
            });

            // Limpar a fila
            requestQueue = [];
            numAlunos = 0;  // Resetar o contador de alunos
        }).catch(error => {
            // Em caso de erro, enviar uma resposta de erro para todos os clientes na fila
            requestQueue.forEach(({ response }) => {
                response.status(500).json({ error: 'Erro no processamento' });
            });

            // Limpar a fila
            requestQueue = [];
            numAlunos = 0;  // Resetar o contador de alunos
        });
    } else {
        console.log("Esperando jogadores...");
        numAlunos++;
    }
}
async function carregaTurma(request,response){
    const {codigoTurma} = request.body;
    console.log("codigo Turma: "+codigoTurma)
    turma = await turmaController.getTurmaQuiz(codigoTurma)
    return response.status(200).end();

}
function conectarAluno(request,response){
    const {matricula,codigo} = request.body;
    console.log("Código recebido:", codigo);
    console.log("Matrícula recebida:", matricula);
    var aluno = "";
    //console.log("Turma carregada:", JSON.stringify(turma, null, 2));
    //console.log(turma);
    if(codigo!=codigoAleatorio)
        return response.status(500).json("código Invalido").end();

    for (let item of turma) {

        if(item['Matricula']== matricula){
            console.log("ALUNO ENCONTRADO");
            aluno = item['Nome']
            break;
        }else{
            console.log(item['Matricula'])
        }
    }
       // Debug: Log do aluno encontrado
       console.log("Aluno encontrado:", aluno);
    if (aluno!="") {
        console.log("matricula do aluno: +",matricula)
        adicionarAluno(matricula, aluno);
        return response.status(200).json("aluno conectado");
    }else{
        return response.status(500).json("aluno não encontrado. Você está cadastrado na turma?").end();

    }

}
    
async function alunosConectados(request,response){
   
    console.log("alunos:",listaAlunosConectados)

    response.json((listaAlunosConectados));
}

function liberaQuestionario(request,response){
    const {valor} = request.body;
    console.log('Recebida variavel:', valor);
    canCallGetQuestionario = valor;
    if(valor==false){
        questaoAtual=0;
    }
    response.status(200).json("questionario liberado");

}

function iniciaQuestionario(request,response){
    console.log(canCallGetQuestionario)
    questaoAtual+=1;
    return response.json(canCallGetQuestionario);

}



async function gravarRespostas(request,response) {
    try {
      // Extrai os dados recebidos
      var dados = request.body
      // Extrai os dados recebidos
      const { matricula, pontuacao, questoes, data } = dados;

      // Converte a pontuação para um número
      const pontuacaoValida = pontuacao ? parseInt(pontuacao) : null;
      console.log(dados);
      console.log(pontuacao);
      // Validação simples dos dados recebidos
      if (!matricula || !pontuacaoValida || !questoes || !Array.isArray(questoes) || !data) {
        throw new Error('Dados inválidos');
      }
      aluno = turmaController.findAluno(turma,matricula);
      console.log("email do aluno:"+aluno["email"]);
      await connection(); 
  
      // Cria um novo documento com as respostas do aluno
      const novaResposta = new RespostasAluno({
        matricula: matricula,
        pontuacao: pontuacao.$numberInt,  // Extraindo valor correto de pontuacao
        questoes: questoes,
        data: dados.data // Adicionando a data se fornecida
      });
  
   
      // Insere o novo documento na coleção RespostasAluno
      const resultado = await mongoose.connection.db.collection("RespostasAluno").insertOne(novaResposta);
    auxController.enviaEmail(aluno["email"],dados,questionario);
    response.status(200).json("salvo");
    } catch (error) {
      console.error('Erro ao salvar as respostas no banco de dados:', error);
      response.json("error");
    }
  }





function limparEstado(request,response){
     questionario;
     numAlunos = 0;
     clientesId = [];
     clients = [];
     turma = [];
     questaoAtual = 0;
    // lista de alunos que responderam a questão e estão esperando a próxima
     alunosProntos =[]
     listaAlunosConectados = [];
     requestQueue = [];
     canCallGetQuestionario = false;
     response.status(200).json("estado do processo de questionario limpo");

}
 //salva a pontuação do aluno no questionario
function salvaPontuacao(request,response){
    const {matricula,pontuacao} = request.body;
    let aluno = "";
    for (let item of listaAlunosConectados) {

        if(item['matricula']==matricula){
            console.log("aluno encontrado:"+item['Nome']+"  "+item['pontuacao']);
            item["pontuacao"] = pontuacao
            break;
        }
    }
    console.log(listaAlunosConectados)
    response.status(200).end();

}

function gerarCodigo(request,response) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let codigo = '';
    const tamanho = 4;

    for (let i = 0; i < tamanho; i++) {
        const randomIndex = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres[randomIndex];
    }
    console.log(codigo);
    codigoAleatorio=codigo;
    response.status(200).json(codigo).end();

}

async function getAssuntos(request, response) {
    try {
      // Conecta ao banco de dados (certifique-se de que a conexão está aberta)

      await connection();
      const assuntos = await mongoose.connection.db.collection("Assunto").find().toArray();
      response.json(assuntos);

    } catch (error) {
      console.error('Erro ao consultar a coleção Assunto:', error);
      response.status(500).json({ error: 'Erro ao consultar a coleção Assunto' });
    }
}
module.exports = {
    getQuestionario,
    getProximaQuestao,
    liberaQuestionario,
    iniciaQuestionario,
    getQuestionarioAluno,
    conectarAluno,
    alunosConectados,
    liberaProximaQuestao,
    addAlunoPronto,
    carregaTurma,
    salvaPontuacao,
    wsConnection,
    retornaPodio,
    retornaQuestaoAtual,
    limparEstado,
    getQuestionarioTeste,
    carregaQuestionario,
    gravarRespostas,
    gerarCodigo,
    getQuestoes,
    getAssuntos
};
