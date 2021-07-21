const {userService} = require('../services');

module.exports = (io, socket, onlineUsers) => {


    const setState = async (userId, state) => {

        const maybeAdminUserId = socket[`UserId_${socket.id}`];
        const maybeAdminUser = onlineUsers[maybeAdminUserId];
        if( maybeAdminUser.role !== `ADMIN`) {
            console.log(`is admin ????????????????????`)
            return
        }

        const [modifiedUser] = await userService.updateUserState(userId, state);

        if(!modifiedUser){
            return
        }
        if(!onlineUsers[userId]){
            return
        }
        if(state === "BANNED"){
            io
                .sockets
                .sockets
                .get(onlineUsers[userId].socketId)
                .disconnect(true);
        }else {
            console.log(onlineUsers[userId].state);
            console.log(state);
            onlineUsers[userId].state = state;
        }
    }

    // const addUser = ({ username, userId }) => {
    //
    //
    // }


    //socket.on('users', getUsers)
    // socket.on('user:add', addUser)
    socket.on(`user:setState`, setState)
}