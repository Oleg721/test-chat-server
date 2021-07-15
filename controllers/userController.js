const {userService: {getUsersCount} ,
        authService: {registration}} = require('../services')


class UsersController {

    getUsers(req, res) {
        return res
            .status(200)
            .json({mess: `its work in userController`})
    }

    async createUser(req, res) {

        const {login, password} = req.body;
        const role = await getUsersCount() ? `USER` : `ADMIN`;
        const authToken = await registration({
                                        login : login,
                                        password: password,
                                        role: role});
        return res
            .status(200)
            .json({authToken : authToken});
    }

}

module.exports = new UsersController();
