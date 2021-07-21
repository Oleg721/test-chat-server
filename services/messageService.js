const {Op} = require("sequelize");
const {User, Message} = require(`../models`);


class MessagesService {

    async createMessage(messageText , AuthorId){
        try {
            const user = await User.findByPk(AuthorId);
            const message = await Message.create({text: messageText})
            return await message.setUser(user);
        } catch (err){
            console.log(err)
        }
    }

    async getMessages(limit){
        try {
            return Message.findAll({
                limit: limit,
                include: User
            })
        }catch (err){
            console.log(err)
        }
    }

}

module.exports = new MessagesService();

