const {hashSync, compareSync} = require(`bcrypt`);
const {sign, verify} = require(`jsonwebtoken`);
const {isPasswordValid, isUserValid} = require(`../validation`);
const {getUserByLogin, createUser} = require(`./userService`);
require('dotenv').config();

class AuthService {


    async registration( {login, password}){

        if( !isPasswordValid(password) || !login) return null;

        try {
            if( await getUserByLogin(login)) return null;

            const passwordHash = await hashSync(password,7);
            const {id} = await createUser({
                login: login,
                passwordHash : passwordHash
            })

            if(!id) return null;

            return sign({id: id, login: login}, process.env.SECRET)
        }catch (e) { console.log(e.name)}

    }



    async login ({login, password}){
        if( !isPasswordValid(password) || !login) return null;

        try {
            const {id, passwordHash} = await getUserByLogin(login);
            if(!await compareSync(password,passwordHash)) return null;

            return sign({id: id, login: login}, process.env.SECRET);

        }catch (e) {console.log(e.name)}
    }



    async verifyToken ({authToken}){
        try {
            return  !!verify(authToken, process.env.SECRET)
        }catch (e) {
            console.log(`verifyToken >> ` + e.name)
        }
        return false
    }
}

module.exports = new AuthService()

//module.exports  = {addUser, getUsers, getUserByLogin}




////////////////////////////////////////