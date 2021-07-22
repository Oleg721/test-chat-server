const {Op} = require('sequelize');
const {User} = require('../models');

class UsersService {

    getUserById(id){
        try {
            return User.findByPk(id);
        } catch (err){
            console.log(err)
        }
    }

    getAllUsers(){
        try {
            return User.findAll();
        } catch (err){
            console.log(err)
        }
    }

    getAllActiveUsers(){
        try {
            return User.findAll({where: {
                    [Op.not] : [{state: 3}]
                }});
        } catch (err){
            console.log(err)
        }
    }

    createUser({ login, passwordHash, role, color}) {
        try {
            return User.create({
                login: login,
                passwordHash : passwordHash,
                role: role,
                color: color
            })
        } catch (err){
            console.log(err)
        }
    }

    getUsersCount(){
        return User.count();
    }

    getUserByLogin(login){
        try {
            return User.findOne({
                where: {
                    login : login
                }});
        } catch (err){
            console.log(err)
        }
    }

    updateUserState(id, state) {
        try {
            return User.update({state: state}, {
                where: {
                    [Op.and]: [
                        {id: id},
                        {[Op.not]: {
                            role: 'ADMIN'
                            }}
                    ]
                }
            })
        }catch (err){
            console.log(err);
        }
    }
}

module.exports = new UsersService()
