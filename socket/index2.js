//  const {userService: {getAllUsers, getAllActiveUsers, getUserById},
//      messageService: {createMessage, getMessage}} = require(`../services`);
// const {decode, verify} = require(`jsonwebtoken`);
// const registerUserHandlers = require(`../handlers/userHandlers`)
// require('dotenv').config();
//
//
// const usersArr = [];
// const messagesArr = [];
//
//
// module.exports = (io)=>{
//
//     /////КАК ПРАВИЛЬНЕЕ ЗАГРУЖАТЬ ИЗ БАЗЫ;
//     (async ()=>{
//         usersArr.push(...(await getAllUsers())
//             .map(({id, login, role, color}) => ({
//                 id: id,
//                 login: login,
//                 role: role,
//                 color: color,
//                 isOnline: false,
//                 socket: null
//             }))
//         )
//
//     })();
//
//
//     return (socket)=> {
//
//         try {
//             const {id, login, color, role} = verify(socket.handshake.auth.token, process.env.SECRET);
//
//             //user already connected?
//             for (let [key, value] of io.sockets.sockets){
//                 if(value.userId === id){
//                     io.sockets.sockets.get(key).disconnect(true)
//                 }
//
//                 socket.userId = id;
//                 socket.userColor = color;
//                // socket.userLogin = login;
//                 socket.userRole = role;
//             }
//
//            // socket.emit(`users`, Object.values(io.sockets.sockets))
//
//            // console.log(io.sockets.sockets);
//         }catch (err){
//             console.log(err);
//             socket.disconnect(true)
//         }
//
//
//
//
//         registerUserHandlers(io, socket)
//
//         socket.on('disconnect', () => {
//
//             console.log('User disconnected')
//
//         })
//     }
// }
//
