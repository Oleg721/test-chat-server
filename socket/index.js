 const {userService: {getAllUsers, getAllActiveUsers, getUserById},
     messageService: {createMessage, getMessages}} = require(`../services`);
const {decode, verify} = require(`jsonwebtoken`);
const registerUserHandlers = require(`../handlers/userHandlers`)
 const registerMessageHandlers = require('../handlers/messageHandlers')
require('dotenv').config();


 const onlineUsers = {};


module.exports = (io)=>{

    return async (socket)=> {

        try {

            const {id: userId} = verify(socket.handshake.auth.token, process.env.SECRET);

            // user already connected?
            if(onlineUsers[userId]) {
                const userSocket = io
                    .sockets
                    .sockets
                    .get(onlineUsers[userId].socketId)
                userSocket && userSocket.disconnect(true);
            }

            // get user in db
            const { login,
                    state,
                    role,
                    color} = await getUserById(userId);

            if(state === `BANNED`){
                socket.disconnect();
                return
            }

            const user = {
                login: login,
                state: state,
                role: role,
                color: color,
                socketId : socket.id,
                sendMessageTime: null}

            //add online user to arr
            onlineUsers[userId] = user;

            //bind userId to socket
            socket[`UserId_${socket.id}`] = userId

            //send event add user
            socket.broadcast.emit("user:add", {id: userId, ...user});


            // //send users to front
            if(role === `USER`){
                socket.emit(`users`, onlineUsers)
            }else {
                getAllUsers()
                    .then(value => {
                        const users = {}
                        value.forEach(({dataValues}) => {
                            users[dataValues.id] = {
                                login: dataValues.login,
                                state: dataValues.state,
                                role: dataValues.role,
                                color: dataValues.color
                            }
                        })
                        socket.emit(`users`, users)
                })
            }

                //send messages to front
                getMessages(20)
                    .then(value => {
                        socket.emit(`messages`, Array.from(value.map(message => {
                            const { User: {login, color},
                                    updatedAt,
                                    ...messageData} = message.dataValues;
                            return {
                                ...messageData,
                                authorLogin: login,
                                authorColor: color}
                        })));
                    })

        }catch (err){
            console.log(err);
            socket.disconnect(true)
            return
        }

        registerUserHandlers(io, socket, onlineUsers);
        registerMessageHandlers(io, socket, onlineUsers);

        socket.on('disconnect', () => {
            console.log('User disconnected');
            //delete user from onlineUsersArr
            const disconnectedUserId =  socket[`UserId_${socket.id}`]
            delete onlineUsers[disconnectedUserId];
            io.emit(`user:leave`, disconnectedUserId);

        })
    }
}

