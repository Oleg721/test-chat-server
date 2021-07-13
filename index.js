const express = require('express');
const app = express();
const WebSocket = require('ws');
const wsServer = new WebSocket.Server({ port: 8080 });
require('dotenv').config();
const {Message, User} = require(`./models`);
const {authController} = require('./controllers');

//console.log(authController)

//require(`./connectors`).sync();




///////////////////////////////////////////////

(async ()=>{
  //  console.log(User.prototype)
    await authController.registration({User: {login: `vasia`, password: `qwerty321`, color: `RED`}});

     const user = await User.findOne({where: {login: `vasia`}});
     console.log(user)
    //
     if(!user) return
    //
     await user.createMessage({text: 'Hello its work!!!'})

})();





//////////////////////////////////////////////////
wsServer.on('connection', onConnect);

function onConnect(wsClient) {
    console.log('new connect');
    wsClient.send('hello!');

    wsClient.on('close', function() {
        console.log('user disconnect');
    });





    wsClient.on('message', function(message) {
        console.log(message);
        try {
            const jsonMessage = JSON.parse(message);
            switch (jsonMessage.action) {
                case 'ECHO':

                    wsServer.clients.forEach(value => value.send(jsonMessage.data))
                    //wsClient.send(jsonMessage.data);

                    break;
                // case 'PING':
                //     setTimeout(function() {
                //         wsClient.send('PONG');
                //     }, 2000);
                //     break;
                default:
                    console.log('Неизвестная команда');
                    break;
            }
        } catch (error) {
            console.log('Ошибка', error);
        }
    });

    // wsClient.on('message', function(message) {
    //     console.log(message);
    //     try {
    //         const jsonMessage = JSON.parse(message);
    //         switch (jsonMessage.action) {
    //             case 'ECHO':
    //                 wsClient.send(jsonMessage.data);
    //                 break;
    //             case 'PING':
    //                 setTimeout(function() {
    //                     wsClient.send('PONG');
    //                 }, 2000);
    //                 break;
    //             default:
    //                 console.log('Неизвестная команда');
    //                 break;
    //         }
    //     } catch (error) {
    //         console.log('Ошибка', error);
    //     }
    // });
}

console.log('Сервер запущен на 8080 порту');