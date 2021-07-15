const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const WebSocket = require('ws');
require('dotenv').config();
const wsServer = new WebSocket.Server({ port: process.env.DEV_WS_PORT });
const onConnect = require(`./webSocket`)(wsServer);
const routes = require('./routes');


app.use(express.static('public'));
app.use(bodyParser.json());

app.use('/', routes);

app.listen(port = process.env.DEW_PORT, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

wsServer.on('connection', onConnect);
console.log(`WebSocket server run, listening at ${process.env.DEV_WS_PORT}`);
