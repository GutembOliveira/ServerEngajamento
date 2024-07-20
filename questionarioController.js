const connection = require('./dbConfig.js');
//app.use(express.json())
const bodyParser = require('body-parser')
const turmaController = require('./turmaController.js')

var questionario;
var numAlunos = 0;
var clientesId = [];
let clients = [];
let turma = [];
// lista de alunos que responderam a questão e estão esperando a próxima
let alunosProntos =[]
let listaAlunosConectados = [];
let requestQueue = [];
let canCallGetQuestionario = false;
// Criando uma lista de objetos dinamicamente

const jsonParser = bodyParser.json();
//let turma = turmaController.getTurma();

function getQuestionario(request, response){


    var sql = `
            SELECT 
                q.idQuestao,
                q.enunciado,  
                q.fkAssunto,
                q.tipoQuestao,
                a.idalternativas,
                a.Questao_idQuestao,
                a.Questao_fkAssunto,
                a.letra,
                a.descricao,
                a.resposta
            FROM 
                mydb.Questao q
            INNER JOIN 
                mydb.alternativas a ON q.idQuestao = a.Questao_idQuestao
            ORDER BY 
                q.idQuestao, a.letra
        `;
        connection.query(sql, function (err, result) {
            if (err) {
                return "error:"+ (err);
            }
            // Processa os resultados para montar o JSON personalizado
            let questoesMap = {};

            result.forEach(row => {
                if (!questoesMap[row.idQuestao]) {
                    questoesMap[row.idQuestao] = {
                        idQuestao: row.idQuestao,
                        enunciado: "Determine se as afirmações abaixo são verdadeiras (V) ou falsas (F)",
                        alternativas: []
                    };
                }

                questoesMap[row.idQuestao].alternativas.push({
                    questao: row.idQuestao,
                    idalternativas: row.idalternativas,
                    letra: row.letra,
                    descricao: row.descricao,
                    resposta: row.resposta
                });
            });

            // Converte o mapa em uma lista
            let questoesList = Object.values(questoesMap);
            questionario = questoesList;
            //console.log(questionario)
            response.json(questionario);
        });

    
}
function getQuestionarioAluno(request, response){
    clientesId.push(request.id);
    requestQueue.push({ request, response });
    var sql = `
            SELECT 
                q.idQuestao,
                q.enunciado,  
                q.fkAssunto,
                q.tipoQuestao,
                a.idalternativas,
                a.Questao_idQuestao,
                a.Questao_fkAssunto,
                a.letra,
                a.descricao,
                a.resposta
            FROM 
                mydb.Questao q
            INNER JOIN 
                mydb.alternativas a ON q.idQuestao = a.Questao_idQuestao
            ORDER BY 
                q.idQuestao, a.letra
        `;
        connection.query(sql, function (err, result) {
            if (err) {
                return "error:"+ (err);
            }
            // Processa os resultados para montar o JSON personalizado
            let questoesMap = {};

            result.forEach(row => {
                if (!questoesMap[row.idQuestao]) {
                    questoesMap[row.idQuestao] = {
                        idQuestao: row.idQuestao,
                        enunciado: "Determine se as afirmações abaixo são verdadeiras (V) ou falsas (F)",
                        alternativas: []
                    };
                }

                questoesMap[row.idQuestao].alternativas.push({
                    questao: row.idQuestao,
                    idalternativas: row.idalternativas,
                    letra: row.letra,
                    descricao: row.descricao,
                    resposta: row.resposta
                });
            });

            // Converte o mapa em uma lista
            let questoesList = Object.values(questoesMap);
            questionario = questoesList;
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
        });

    
}

//Professor aperta para passar para a próxima questão   
function liberaProximaQuestao(request, response) {
        listaAlunosConectados.length = 0;
        
        // Envia o valor numérico para todos os clientes conectados
        //clients.forEach(client => client.response.write(`true\n\n`));
        sendEventToAllClients(1);
        response.json("Evento enviado para todos os clientes");
        console.log(clients.length);
        console.log("resposta mandada para todos os alunos");
    
   
}

// Rota específica para SSE

//rota que ficará escutando pela resposta do servidor. Virá do lado do aluno

function getProximaQuestao(request,response){
    response.setHeader('Content-Type', 'text/event-stream');
    response.setHeader('Cache-Control', 'no-cache');
    response.setHeader('Connection', 'keep-alive');
    response.setHeader('X-Requested-With','XMLHttpRequest');
    response.flushHeaders();
        console.log("aluno pedindo prox questão")
        const newClient = {
            id: Date.now(),
            response: response  
        };
        clients.push(newClient);
        console.log("aluno adicionado:",clients)
        //response.write(`data: ${7}\n\n`);
        
        const intervalId = setInterval(() => {
            //response.write(`data: ${JSON.stringify({ number: 8 })}\n\n`);
        }, 5000); // Envia dados a cada 5 segundos
    
            // Enviar o valor numérico atual ao cliente imediatamente após a conexão
        request.on('close', () => {
        console.log(`${newClient.id} Connection closed`);
        clients = clients.filter(client => client.id !== newClient.id);
        });
    
    
}
function sendEventToAllClients(data) {
    clients.forEach(client => {
      client.response.write(`data: ${data}\n\n`);
    });
  }

function addAlunoPronto(request,response){
    turmaController.getTurmaQuiz()
    console.log(turma);
    //alunosProntos.push(request.id);

}



function adicionarAluno(matricula, nome) {
  let aluno = {
    matricula: matricula,
    nome: nome
  };
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
        turma = await  turmaController.getTurmaQuiz()
        console.log(turma);
        return response.status(200).end();
        //alunosProntos.push(request.id);

    }
    function conectarAluno(request,response){
        const {matricula} = request.body;
        let aluno = "";
        for (let item of turma) {
    
            if(item['matricula']==matricula){
                aluno = item['Nome']
                break;
            }
        }
        console.log(aluno)
        if (aluno!="") {
            console.log("matricula do aluno: +",matricula)
    
            adicionarAluno(matricula, aluno);
            console.log("aluno inserido")
            response.status(200).json("aluno conectado");
        }else{
            response.statusMessage = "aluno não encontrado. Você está cadastrado na turma?"
            response.status(200).end();
    
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
    response.status(200).json("questionario liberado");

}



function iniciaQuestionario(request,response){
    console.log(canCallGetQuestionario)
    return response.json(canCallGetQuestionario);

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
    carregaTurma
};
