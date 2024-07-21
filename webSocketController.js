const WebSocket = require('ws');

let clients = [];

// Função para gerenciar a conexão WebSocket
function handleConnection(ws) {
    const clientId = Date.now();
    const newClient = { id: clientId, ws };
    clients.push(newClient);
    console.log(`Novo cliente WebSocket conectado: ${clientId}`);

    ws.on('message', (message) => {
        console.log(`Mensagem recebida do cliente ${clientId}: ${message}`);
    });

    ws.on('close', () => {
        console.log(`Cliente WebSocket desconectado: ${clientId}`);
        clients = clients.filter(client => client.id !== clientId);
    });

    ws.send(JSON.stringify({ message: 'Conexão estabelecida' }));
}


// Função para enviar uma mensagem a todos os clientes conectados
function sendToAllClients(message) {
    clients.forEach(client => {
        if (client.ws.readyState === WebSocket.OPEN) {
            client.ws.send(message);
        }
    });
}

module.exports = {
    handleConnection,
    sendToAllClients
};
