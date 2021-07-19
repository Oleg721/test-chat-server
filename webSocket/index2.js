const {verifyToken} = require('../utility');
const {userService: {getAllUsers, getAllActiveUsers, getUserById},
    messageService: {createMessage, getMessage}} = require(`../services`)
const jwt_decode = require('jwt-decode');
const {sign, decode} = require(`jsonwebtoken`);

const connectUsersMap = new Map();


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



async function wsReducer(message, wsClient) {

    try {
        const {action, authToken} = JSON.parse(message);

        if(action === "CHECK_USER"){

            try{
                console.log(`######################################`)
                console.log(authToken);
                const decoded = decode(`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`, {complete: true});
                console.log(decoded.header);
                console.log(decoded.payload)

            }catch (e){
                console.log(`ERROR - ${e.name}`)
            }


            if(!authToken) {
                return wsClient.close();
            }

            if(!verifyToken(authToken)) {
                return wsClient.close();
            }

            const tokenPayload = authToken.match(/(?<=[.]).+(?=[.])/)[0];
            const {id, login} = JSON.parse(Buffer
                                    .from(tokenPayload, 'base64')
                                    .toString(`binary`));

            if(connectUsersMap.has(authToken)){
                connectUsersMap.get(authToken).closeConnect();
                console.log(`user is connected`)
            }

            const user = new UserItem(id, login, wsClient);
            connectUsersMap.set(authToken, user);

            //////////TMP ID!!!!!!!!!!!!!!!
            const {role} = await getUserById(7);


            const users = (role === "ADMIN" ? await getAllUsers() : await getAllActiveUsers())
                .filter(({id: valId})=> valId !== id)
                .map(({id, login, role, color}) => ({
                        id: id,
                        login: login,
                        role: role,
                        color: color,
                    })
                );

            // role === "ADMIN" ? users = (await getAllUsers()) : users = (await getAllActiveUsers())

               // users = users
               //          .filter(({id: valId})=> {
               //              return valId !== id;
               //          })
               //          .map(({id, login, role, color}) => {
               //              return {id: id,
               //                      login: login,
               //                      role: role,
               //                      color: color}
               //          })

                const messages = (await getMessage(20))
                                        .map(({text,UserId})=>{
                                                return {text: text, userId: UserId}
                                        } );

                user.send(users, messages)
        }


    } catch (error) {
        console.log('Ошибка', error);
    }

    console.log(connectUsersMap.size);

}

class UserItem{
    constructor(id, login, wsClient) {
        this.id = id;
        this.login = login;
        this.wsClient = wsClient
        this.sendMessageTime = 0;
    }

    closeConnect(){
        this.wsClient.close();
    }

    send(users, messages){
        this.wsClient.send(JSON.stringify({users: users, messages: messages}))
    }

}