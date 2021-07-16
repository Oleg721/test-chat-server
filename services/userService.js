const {Op} = require("sequelize");
const {User} = require(`../models`);


class UsersService {


    getUserById(id){
        return User.findByPk(id);
    }


    getAllUsers(){
        return User.findAll();
    }


    getAllActiveUsers(){
        return User.findAll({where: {
                        [Op.not] : [{state: 3}]
            }});
    }


    createUser({ login, passwordHash, role, color}) {
        return User.create({
            login: login,
            passwordHash : passwordHash,
            role: role,
            color: color
        })
    }


    getUsersCount(){
        return User.count();
    }


    getUserByLogin(login){
        return User.findOne({
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
