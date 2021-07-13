const {User} = require(`../models`);
const {verify} = require(`jsonwebtoken`);


//  async function getUserByRequest(req){
//
//
//     const authorization = req?.headers?.authorization;
//     if (!authorization) return null
//     if (!authorization.startsWith('Bearer ')) return null
//
//     const token         = authorization.slice('Bearer '.length)
//     try {
//         const decoded = verify(token, secret);
//         const userId  = decoded.id;
//         return User.findByPk(userId);
//     }
//     catch(e){
//         console.log(e);
//         return null
//     }
// }

  // async function getUserById({id}){
  //       return await User.findOne({
  //           where: {
  //               id : id
  //           }});
  //   }

async function addUser({ login, passwordHash, color}){

    return await User.create({
        login: login,
        passwordHash : passwordHash,
        color: color
    })
}

  async function getUserByLogin(login){
        console.log(login)
        return await User.findOne({
            where: {
                login : login
            }});
    }


 async function  getUsers(){
        return await User.findAll();
    }


    module.exports  = {addUser, getUsers, getUserByLogin}
