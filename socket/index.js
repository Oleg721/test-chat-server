 const {userService: {getAllUsers, getAllActiveUsers, getUserById},
     messageService: {createMessage, getMessages}} = require(`../services`);
const {decode, verify} = require(`jsonwebtoken`);
const registerUserHandlers = require(`../handlers/userHandlers`)
require('dotenv').config();


// const usersMap = new Map();
 const onlineUsers = {};
const messagesArr = {};


module.exports = (io)=>{

    return (socket)=> {

        try {

            const {id,userData} = verify(socket.handshake.auth.token, process.env.SECRET);

            // user already connected?
            if(onlineUsers[id]) {
                const userSocket = io
                                    .sockets
                                    .sockets[onlineUsers[id].socketId]
                userSocket && userSocket.disconnect(true);
            }


            getUserById(id)
                .then(({id, login, state, role, color}) =>{
                    if(state === `BANNED`){
                        socket.disconnect()
                    }

                    const user = {
                        login: login,
                        state: state,
                        role: role,
                        color: color,
                        socketId : socket.id,
                        sendMessageTime: null}

                    //add online user to arr
                    onlineUsers[id] = user;

                    //send event add user
                    socket.broadcast.emit("user:add", {id: id, ...user});

                        //send users
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

                        //send messages
                        getMessages(20)
                            .then(value => {
                                socket.emit(`messages`, Array.from(value.map(message => {
                                    return {
                                        ...message.dataValues,
                                        authorLogin: message.User.login,
                                        authorColor: message.User.color}
                                })));
                            })

            }).catch(reason => {
                console.log(reason)
                socket.disconnect(true)
            })


        }catch (err){
            console.log(err);
            socket.disconnect(true)
            return
        }

        registerUserHandlers(io, socket)

        socket.on('disconnect', () => {
            console.log('User disconnected');
            //delete user from onlineUsersArr
            for(let id in onlineUsers){
                if(onlineUsers[id].socketId === socket.id){
                    delete onlineUsers[id];
                    io.emit(`user:leave`, id);
                    return
                }
            }
        })
    }
}

