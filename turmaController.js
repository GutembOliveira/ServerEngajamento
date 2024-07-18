// const turmas = require('../repositorys/turmaRepository');
const  connection  = require('./dbConfig.js');


function getTurmaQuiz() {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM mydb.Aluno";
        connection.query(sql, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}
module.exports = {

getTurma(request,response){
    var sql = "select * from mydb.Aluno";
    // var sql = "INSERT INTO mydb.Assunto (Texto) VALUES ('Assunto sample')";
    connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    return response.json(result);
    });
 
},getTurmaQuiz


}

