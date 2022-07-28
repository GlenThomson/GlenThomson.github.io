const http = require('http');
const websocketServer = require('websocket').server;
const httpServer = http.createServer();
console.log('Server is running on port 8080');
httpServer.listen(8080), () => {
    console.log('Server is running on port 8080');
}

//hash map of clients 
const clients = {};

const wsServer = new websocketServer({
    "httpServer" : httpServer
});

wsServer.on('request', (request) => {
    const connection = request.accept(null, request.origin);
    connection.on('open', (message) => console.log('Connection opened'));
    connection.on('close', (message) => console.log('Connection closed'));
    connection.on('message', (message) => {
        const data = JSON.parse(message.utf8Data);
        console.log(data);
    })
    //generate a new clientID
    const clientID = guid();
    clients[clientID] = {
        connection: connection
    }

    const payload = {
        "method":"connect ",
        "clientID": clientID,

    }
    connection.send(JSON.stringify(payload));//send the clientID to the client
});



function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}
 
// then to call it, plus stitch in '4' in the third group
const guid = () => (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();

console.log('sadhfjklk;ajsdfkjlhadf');
