const {userService: {getUsersCount, getUserByLogin} ,
        authService: {registration, login : loginUser }} = require('../services')
const {isUserValid} = require('../validation');
const {sign} = require(`jsonwebtoken`);


class UsersController {

    async createUser(req, res) {

        if(!isUserValid(req.body)){
            return res
                .status(400)
                .json({ message: 'not valid user' })
        }

        //////уточнить как лучше избежать ошибок
        const user = await getUserByLogin(req.body.login) ? await loginUser(req.body) : await registration(req.body);

        if(!user){
            return res
                .status(400)
                .json({ message: 'not valid user' })
        }
        //////
        return res
            .status(200)
            .json({authToken : sign({id: user.id, login: user.login}, process.env.SECRET)});

    }
}

module.exports = new UsersController();
