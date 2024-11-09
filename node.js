// Importation du module 'ws'
const WebSocket = require('ws');

// Création d'un serveur WebSocket
const wss = new WebSocket.Server({ port: 8080 });

// Liste des clients connectés
let clients = [];

// Gestion des connexions des clients
wss.on('connection', (ws) => {
    clients.push(ws);
    console.log('Nouveau client connecté.');

    // Gestion des messages reçus des clients
    ws.on('message', (message) => {
        console.log(`Message reçu: ${message}`);

        // Si le message est "START", envoyer à tous les clients
        if (message === 'START') {
            clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send('START');
                }
            });
        }
    });

    // Gestion de la déconnexion
    ws.on('close', () => {
        console.log('Client déconnecté.');
        clients = clients.filter(client => client !== ws);
    });
});

console.log('Serveur WebSocket en écoute sur le port 8080');
