const http = require('http');
const WebSocketServer = require("websocket").server;
let connection = null;

const httpServer = http.createServer((req, res) => {
    console.log('We have received a request.')
})

const webSocket = new WebSocketServer({
    "httpServer": httpServer
})

webSocket.on("request", request => {
    connection = request.accept(null, request.origin);
    connection.on("open", e => console.log("Opened!"));
    connection.on("close", () => console.log());
    connection.on("message", message => {
        console.log(`Received message ${message.utf8Data}`)
    })
    sendEveryFiveSecond();
});

httpServer.listen(8080, () => console.log('My server is listening on port 8080.'));

function sendEveryFiveSecond(){
    connection.send(`Message ${Math.random()}`);
    setTimeout(sendEveryFiveSecond, 5000);
}