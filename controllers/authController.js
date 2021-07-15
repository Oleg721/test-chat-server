const {authService} = require('../services')


class AuthController {

    async login(req, res) {
        return res
            .status(200)
            .json({mess: `its work in userController`})
    }


}

module.exports = new AuthController();

