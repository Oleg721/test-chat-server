const {hashSync, compareSync} = require(`bcrypt`);
const {sign, verify} = require(`jsonwebtoken`);
const {isPasswordValid, isUserValid} = require(`../validation`);
const {getUserByLogin, addUser} = require(`./userController`);
require('dotenv').config();



    async function registration({User : {login, password, color}}){

        if( !isPasswordValid(password) || !login) return null;

        try {
            if( await getUserByLogin(login)) return null;

            const passwordHash = await hashSync(password,7);
            const {id} = await addUser({
                                        login: login,
                                        passwordHash : passwordHash,
                                        color: color
            })

            if(!id) return null;

            return await sign({id: id, login: login}, process.env.SECRET)
        }catch (e) { console.log(e.name)}

    }



    async function  login ({login, password}){
        if( !isPasswordValid(password) || !login) return null;

        try {
            const {id, passwordHash} = await getUserByLogin(login);
            if(!await compareSync(password,passwordHash)) return null;

            return sign({id: id, login: login}, process.env.SECRET);

        }catch (e) { console.log(e.name)}
    }



    async function verifyToken ({authToken}){
        try {
            return  !!verify(authToken, process.env.SECRET)
        }catch (e) {
            console.log(`verifyToken >> ` + e.name)
        }
        return false
    }


module.exports  = {registration, login, verifyToken}
