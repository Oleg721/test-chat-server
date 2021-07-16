const {hashSync, compareSync} = require(`bcrypt`);
const {sign} = require(`jsonwebtoken`);
const {getUserByLogin, createUser, getUsersCount} = require(`./userService`);
require('dotenv').config();

class AuthService {

    async registration( {login, password}){

        try {
            const {id} = await createUser({
                    login: login,
                    passwordHash : await hashSync(password,7),
                    role: await getUsersCount() ? `USER` : `ADMIN`
                })

            return sign({id: id, login: login}, process.env.SECRET)

        }catch (e) {
            console.log("registration " + e.name)
        }
    }



    async login ({login, password}){

        try {
            const {id, passwordHash} = await getUserByLogin(login);
            if(!await compareSync(password,passwordHash)) return null;

            return sign({id: id, login: login}, process.env.SECRET);

        }catch (e) {
            console.log("login " + e.name)
        }
    }

}

module.exports = new AuthService()
