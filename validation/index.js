const Ajv = require("ajv");
const userJsonSchema = require('../jsonShemas')



module.exports.isPasswordValid = (password)=>{
    if(!password || password.length < 8) return false;
    return true
}


module.exports.isUserValid = (user)=>{
    const ajv = new Ajv()
    const validate = ajv.compile(userJsonSchema)
    const valid = validate(user)
    if (!valid) {
        console.log(validate.errors);
        return false
    }

    return true
}