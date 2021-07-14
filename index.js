const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const WebSocket = require('ws');
const onConnect = require(`./webSocket`);
require('dotenv').config();
const wsServer = new WebSocket.Server({ port: process.env.DEV_WS_PORT });
const {isUserValid} = require('./validation')
const {registration, login} = require('./controllers').authController

app.use(express.static('public'));
app.use(bodyParser.json());


app.post('/sign-in', async (req, res) => {
    if(!isUserValid(req.body)){
        res.json({})
    }
    else {
        const authToken = await login(req.body);
        authToken ? res.json({token : authToken}) : res.json({token : await registration( req.body)});
    }
});


app.listen(port = process.env.DEW_PORT, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

wsServer.on('connection', onConnect);
console.log('Сервер запущен на 8080 порту');