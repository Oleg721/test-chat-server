require('dotenv').config();
const {verify} = require(`jsonwebtoken`);

module.exports.verifyToken = async (authToken)=>{
    try {
        return  !!verify(authToken, process.env.SECRET)
    }catch (e) {
        console.log(`verifyToken >> ` + e.name)
    }
    return false
}