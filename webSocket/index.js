

module.exports = function onConnect(wsClient) {
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