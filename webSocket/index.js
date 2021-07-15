const {verifyToken} = require('../utility');


const clientsMap = new Map();


module.exports = (wsServer)=>{

    return function onConnect(wsClient) {
        console.log('new connect');
        wsClient.send('hello!');

        wsClient.on('close', function() {
            console.log('user disconnect');
        });

        wsClient.on('message', (message)=>wsReducer(message, wsClient));

    }

}

function wsReducer(message, wsClient) {

    try {
        const {action, authToken} = JSON.parse(message);

        if(action === "CHECK_USER"){

            if(!authToken) return;
            if(!verifyToken(authToken)) return;
            console.log(verifyToken(authToken));

            const tokenPayload = authToken.match(/(?<=[.]).+(?=[.])/)[0];
            const {id, login} = JSON.parse(Buffer
                                    .from(tokenPayload, 'base64')
                                    .toString(`binary`))

            clientsMap.set(authToken, {payload: {id: id,
                                                 login: login,
                                                 wsClient: wsClient}});
        }


    } catch (error) {
        console.log('Ошибка', error);
    }

    console.log(clientsMap);

}

