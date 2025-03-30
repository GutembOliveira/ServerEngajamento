const fs = require('fs');

// Dados fornecidos no formato JSON
const dados = [
  {
    "codigoQuestionario": "10",
    "nomeQuestionario": "Entrega confiavel de dados - parte 1",
    "nomeQuestao": "O RDT 3.0 lida com a possibilidade de perda de pacotes através do uso de temporizadores e retransmissões.",
    "acertos": 22,
    "erros": 1,
    "idQuestao": "674cbab8897ecf2c497a221f"
  },
  {
    "codigoQuestionario": "10",
    "nomeQuestionario": "Entrega confiavel de dados - parte 1",
    "nomeQuestao": "O protocolo stop-and-wait (pare e espere) é altamente eficiente, pois garante a entrega dos pacotes com o mínimo de atraso.",
    "acertos": 16,
    "erros": 7,
    "idQuestao": "674cbab8897ecf2c497a2220"
  },
  {
    "codigoQuestionario": "10",
    "nomeQuestionario": "Entrega confiavel de dados - parte 1",
    "nomeQuestao": "O RDT 2.2 simplifica o protocolo utilizando apenas mensagens de ACK, eliminando o uso de NACK.",
    "acertos": 15,
    "erros": 8,
    "idQuestao": "674cbab8897ecf2c497a221e"
  },
  {
    "codigoQuestionario": "10",
    "nomeQuestionario": "Entrega confiavel de dados - parte 1",
    "nomeQuestao": "O protocolo RDT apresentado no livro do Prof. Kurose é um protocolo real utilizado na internet.",
    "acertos": 19,
    "erros": 3,
    "idQuestao": "674cbab8897ecf2c497a221b"
  },
  {
    "codigoQuestionario": "10",
    "nomeQuestionario": "Entrega confiavel de dados - parte 1",
    "nomeQuestao": "O RDT 2.1 introduz o uso de números de sequência para evitar a duplicação de dados no receptor em caso de retransmissões.",
    "acertos": 14,
    "erros": 8,
    "idQuestao": "674cbab8897ecf2c497a221d"
  },
  {
    "codigoQuestionario": "10",
    "nomeQuestionario": "Entrega confiavel de dados - parte 1",
    "nomeQuestao": "O serviço de transferência confiável de dados é implementado exclusivamente na camada de transporte.",
    "acertos": 9,
    "erros": 18,
    "idQuestao": "674cbab8897ecf2c497a2219"
  },
  {
    "codigoQuestionario": "10",
    "nomeQuestionario": "Entrega confiavel de dados - parte 1",
    "nomeQuestao": "A necessidade de implementar a transferência confiável de dados na camada de transporte surge porque a camada de rede, como o protocolo IP, não garante a entrega dos pacotes.",
    "acertos": 19,
    "erros": 3,
    "idQuestao": "674cbab8897ecf2c497a221a"
  },
  {
    "codigoQuestionario": "10",
    "nomeQuestionario": "Entrega confiavel de dados - parte 1",
    "nomeQuestao": "O uso de temporizadores no RDT 3.0 permite a retransmissão de segmentos perdidos, mesmo que o receptor tenha enviado um ACK que se perdeu na rede, enquanto o número de sequência identifica segmentos duplicados, evitando a entrega repetida da mesma informação para a camada de aplicação.",
    "acertos": 15,
    "erros": 7,
    "idQuestao": "674cbab8897ecf2c497a221c"
  }
];

// Função para converter JSON em CSV
const jsonToCSV = (jsonData) => {
  const header = Object.keys(jsonData[0]).join(";");  // Cabeçalho do CSV
  const rows = jsonData.map(row => Object.values(row).join(";"));  // Conteúdo das linhas
  return [header, ...rows].join("\n");  // Junta tudo em uma string separada por novas linhas
};

// Gerar o CSV a partir do JSON
const csvData = jsonToCSV(dados);

// Salvar o CSV em um arquivo
fs.writeFileSync("resultado.csv", csvData);

console.log("Arquivo CSV gerado com sucesso!");
