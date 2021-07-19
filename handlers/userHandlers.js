
module.exports = (io, socket) => {

    const getUsers = () => {
        console.log(`get user handler`)
        socket.emit('users', [`users...!!!`])
    }


    const addUser = ({ username, userId }) => {


    }


    //socket.on('users', getUsers)
    socket.on('user:add', addUser)

}