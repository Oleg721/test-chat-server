const {messageService} = require('../services');

module.exports = (io, socket, onlineUsers) => {



    const addMessage = async (message, userId) => {

        const user = onlineUsers[userId];
        if(user.state === `MUTED`) {
            return
        }
        if(user.sendMessageTime && (Date.now() - user.sendMessageTime < 20000)){
            return
        }

        const {updatedAt, ...messageData} =
            (await messageService.createMessage(message, userId))
                .dataValues;

        user.sendMessageTime = Date.now();
        io.sockets.emit(`message:add`, {
            ...messageData,
            authorLogin: user.login,
            authorColor: user.color})
    }

    socket.on('message:add', addMessage)

}