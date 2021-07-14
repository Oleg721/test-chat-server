const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const WebSocket = require('ws');
const onConnect = require(`./webSocket`);
require('dotenv').config();
const wsServer = new WebSocket.Server({ port: process.env.DEV_WS_PORT });

const {Message, User} = require(`./models`);
const {authController} = require('./controllers');

app.use(express.static('public'));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.post('/authorization', (req, res) => {
    console.log(req.headers);
    console.log(req.body);
    res.send(JSON.stringify({data: `its Work!!!`}));
});


///////////////////////////////////////////////

(async ()=>{
  //  console.log(User.prototype)
  //   await authController.registration({User: {login: `vasia`, password: `qwerty321`, color: `RED`}});
  //
  //    const user = await User.findOne({where: {login: `vasia`}});
  //    console.log(user)
  //   //
  //    if(!user) return
  //   //
  //    await user.createMessage({text: 'Hello its work!!!'})

})();


app.listen(port = process.env.DEW_PORT, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


//////////////////////////////////////////////////
wsServer.on('connection', onConnect);
console.log('Сервер запущен на 8080 порту');