// const turmas = require('../repositorys/turmaRepository');
const  connection  = require('../BACKEND-APP/dbConfig.js');

module.exports = {

getTurma(request,response){
    var sql = "select * from mydb.Aluno";
    // var sql = "INSERT INTO mydb.Assunto (Texto) VALUES ('Assunto sample')";
    connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    return response.json(result);
    });
    connection.end()
}

}

