const mysql = require("mysql");
const mongoose = require("mongoose");


// Configuração da conexão com MongoDB Atlas
const connection = async () => {
    try {
        await mongoose.connect('mongodb+srv://devTime:dev%40engaj24@dbengajamento.yntmu.mongodb.net/DBEngajamento?retryWrites=true&w=majority', {
        });
        console.info("Connected to the database");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        throw error; // Re-throw the error to be handled by the caller
    }
};

  
module.exports = connection;