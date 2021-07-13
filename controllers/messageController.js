const {Message} = require(`models/tmp`);




async function addMessage({ login, passwordHash, color}){
        return {};
}




 async function  getMessages(){
        return await Message.findAll();
    }


    module.exports  = {addMessage, getMessages}
