const {Op} = require("sequelize");
const {User, Message} = require(`../models`);


class MessagesService {

    async createMessage(id){
        const user = await User.findByPk(id);
        const message = await Message.create({text: 'its new message22442'})
        await message.setUser(user);
    }

    async getMessage(limit){
        return await Message.findAll({limit: limit})
    }

}

module.exports = new MessagesService()

