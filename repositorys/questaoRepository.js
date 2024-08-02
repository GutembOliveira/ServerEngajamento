const mysql = require("mysql");
const csvtojson = require('csvtojson');

const db = mysql.createConnection({
    host:"projetoengajamento.czuc0qggowbu.us-east-1.rds.amazonaws.com",
    port:"3306",
    user:"devTime",
    password:"dev@engaj24",
    database:"mydb",
})

const arquivo = "./questoes.csv";

csvtojson().fromFile(arquivo).then(source => {
    source.forEach((row, i) => {
        const { Enunciado, LetraA, RespostaA, LetraB, RespostaB, LetraC, RespostaC, LetraD, RespostaD } = row;

        // Inserir Questão
        db.query('INSERT INTO mydb.Questao (Enunciado, fkAssunto, tipoQuestao) VALUES (?, ?, ?)',
            [Enunciado, '12', '1'],
            (err, result) => {
                if (err) {
                    console.error("Erro ao inserir questão:", err);
                    return;
                }

                console.log(`Questão inserida com ID ${result.insertId}`);

                const questaoId = result.insertId;

                // Inserir Alternativas
                const alternativas = [
                    { letra: 'A', texto: LetraA, resposta: RespostaA },
                    { letra: 'B', texto: LetraB, resposta: RespostaB },
                    { letra: 'C', texto: LetraC, resposta: RespostaC },
                    { letra: 'D', texto: LetraD, resposta: RespostaD }
                ];

                alternativas.forEach(alternativa => {
                    db.query('INSERT INTO mydb.alternativas (Questao_idQuestao, letra, descricao, resposta) VALUES (?, ?, ?, ?)',
                        [questaoId, alternativa.letra, alternativa.texto, alternativa.resposta],
                        (err) => {
                            if (err) {
                                console.error("Erro ao inserir alternativa:", err);
                                return;
                            }
                            console.log("Alternativa inserida.");
                        });
                });
            });
    });

    console.log("Todos os itens inseridos com sucesso.");
    
}).catch(err => {
    console.error("Erro ao processar CSV:", err);
  
});
