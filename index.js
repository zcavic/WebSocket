const http = require('http');
const WebSocketServer = require('websocket');
let connection = null;

const httpServer = http.createServer((req, res) => {
    console.log('We have received a request.')
})

const webSocket = new WebSocketServer({
    "httpServer": httpServer
})

webSocket.on("request", request => {
    connection = request.accept(null, request.origin);
    connection.on("onopen", e => console.log("Opened!"));
    connection.on("onclose", () => console.log());
    connection.on("onmessage", message => {
        console.log(`Received message ${message}`)
    })
});

httpServer.listen(8080, () => console.log('My server is listening on port 8080.'));