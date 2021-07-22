const {userService: {getAllUsers, getUserById},
     messageService: {getMessages}} = require('../services');
const {verify} = require('jsonwebtoken');
const registerUserHandlers = require('../handlers/userHandlers')
 const registerMessageHandlers = require('../handlers/messageHandlers')
require('dotenv').config();
const onlineUsers = {};

module.exports = (io)=>{

    return async (socket)=> {
        try {
            const {id: userId} = verify(socket.handshake.auth.token, process.env.SECRET);

            // user already connected?
            if(onlineUsers[userId]) {
                io
                    .sockets
                    .sockets
                    .get(onlineUsers[userId].socketId)
                    ?.disconnect(true);
            }
            // get user in db
            const { login, state, role, color} = await getUserById(userId);
            if(state === 'BANNED'){
                socket.disconnect();
                return
            }
            const user = {login, state, role, color, socketId : socket.id, sendMessageTime: null}
            //add online user to arr
            onlineUsers[userId] = user;

            //bind userId to socket
            socket[`UserId_${socket.id}`] = userId

            socket.emit('connectIsSuccess');

            //send event add user
            socket.broadcast.emit('user:add', {id: userId, ...user});

            // //send users to front
            if(role === 'USER'){
                socket.emit('users', onlineUsers)
            }else {
                getAllUsers()
                    .then(value => {
                        const users = {}
                        value.forEach(({id, login, state, role, color}) => {
                            users[id] = {login, state, role, color}
                        })
                        socket.emit('users', users)
                })
            }
                //send messages to front
                getMessages(20)
                    .then(messages => {
                        socket.emit('messages', Array.from(messages.map(message => {
                            const { ['User.login'] : login, ['User.color']: color, updatedAt, ...messageData} = message;
                            return {...messageData, authorLogin: login, authorColor: color}
                        })).reverse());
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
            io.emit('user:leave', disconnectedUserId);
        })
    }
}

