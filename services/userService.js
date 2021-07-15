const {User} = require(`../models`);
const {verify} = require(`jsonwebtoken`);
const fs = require('fs')

class UsersService {

    async getUsers(){
        return await User.findAll();
    }

    async createUser({ login, passwordHash, role, color}) {
        return await User.create({
            login: login,
            passwordHash : passwordHash,
            role: role,
            color: color
        })
    }

    async getUsersCount(){
        const c = await User.count();
        return c;
    }

    async getUserByLogin(login){
        console.log(login)
        return await User.findOne({
            where: {
                login : login
            }});
    }



    async updateUser(data) {
    }

    async deleteUser(data) {
    }
}

module.exports = new UsersService()

//module.exports  = {addUser, getUsers, getUserByLogin}




////////////////////////////////////////