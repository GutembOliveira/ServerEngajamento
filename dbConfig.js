const mysql = require("mysql");
const connection = mysql.createConnection({
    host:"projetoengajamento.czuc0qggowbu.us-east-1.rds.amazonaws.com",
    port:"3306",
    user:"devTime",
    password:"dev@engaj24",
    database:"mysql",
})
module.exports = connection;
