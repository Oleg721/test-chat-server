const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const httpServer = require("http").createServer(app);
require('dotenv').config();
const routes = require('./routes');


const io = require("socket.io")(httpServer, {  cors: {
                                                    origin: `*`
                                                    },
                                            transports: ['websocket'], upgrade: false})
const onConnection = require(`./socket`)(io)

app.use(express.static('public'));
app.use(bodyParser.json());

app.use('/', routes);

io.on("connection", onConnection);

httpServer.listen(port = process.env.DEW_PORT, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

