const connection = require('../BACKEND-APP/dbConfig.js');

var questionario;
var contQuest = 0;
var numAlunos = 0;
var clientesId = [];
let requestQueue = [];

module.exports = {
    getQuestionario() {
        return new Promise((resolve, reject) => {
            const sql = `
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
            connection.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                } else {
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
                    let questoesList = Object.values(questoesMap);
                    questionario = questoesList;
                    resolve(questoesList);
                }
            });
        });
    },

    getProximaQuestao(request, response) {
        console.log("Função próxima questão");
        console.log(questionario[0]);
        let i = contQuest;
        contQuest++;
        return response.json(questionario[i]);
    },

    liberaQuestionario(request, response) {
        clientesId.push(request.id);
        requestQueue.push({ request, response });

        if (requestQueue.length >= 5) {
            this.getQuestionario().then(result => {
                requestQueue.forEach(({ response }) => {
                    response.json(result);
                });
                requestQueue = [];
                numAlunos = 0;  // Resetar o contador de alunos
            }).catch(error => {
                requestQueue.forEach(({ response }) => {
                    response.status(500).json({ error: 'Erro no processamento' });
                });
                requestQueue = [];
                numAlunos = 0;  // Resetar o contador de alunos
            });
        } else {
            console.log("Esperando jogadores...");
            numAlunos++;
        }
    }
};
