 const {userService: {getAllUsers, getAllActiveUsers, getUserById},
     messageService: {createMessage, getMessage}} = require(`../services`);
const {decode, verify} = require(`jsonwebtoken`);
const registerUserHandlers = require(`../handlers/userHandlers`)
require('dotenv').config();


// const usersMap = new Map();
 const usersMap = {};
const messagesArr = [];


module.exports = (io)=>{

    /////КАК ПРАВИЛЬНЕЕ ЗАГРУЖАТЬ ИЗ БАЗЫ;
    // (async ()=>{
    //     (await getAllUsers())
    //         .map(({id, login, role, color}) =>{
    //             usersMap.set(id, {
    //                     login: login,
    //                     role: role,
    //                     color: color,
    //                     isOnline: false,
    //                     socket: null
    //             })
    //         })
    // })();

    (async ()=>{
        (await getAllUsers())
            .map(({id, login, role, color}) =>(
                usersMap[id] = {
                    login: login,
                    role: role,
                    color: color,
                    socketId: null
                }
            ))
    })();


    return (socket)=> {


        try {
            console.log(socket.handshake.auth.token)
            const {id} = verify(socket.handshake.auth.token, process.env.SECRET);

            const user = usersMap[id]

            // user already connected?
                if(user.socketId && io.sockets.sockets[user.socketId]) {
                    io.sockets.sockets[user.socketId].disconnect(true);

                }
                    user.socketId = socket.id;


           socket.emit(`users`, usersMap );


        }catch (err){
            console.log(err);
            socket.disconnect(true)
        }

        registerUserHandlers(io, socket)

        socket.on('disconnect', () => {

            console.log('User disconnected')

        })
    }
}

