const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const httpServer = require("http").createServer(app);
require('dotenv').config();
const routes = require('./routes');
const options = {cors: {origin: '*'}, transports: ['websocket'], upgrade: false};
const io = require('socket.io')(httpServer, options);
const onConnection = require(`./socket`)

app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/', routes);

io.on('connection', onConnection(io));

httpServer.listen(port = process.env.DEW_PORT, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

