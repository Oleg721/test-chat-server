const express = require('express');
const router = express.Router();
const {usersController: {createUser}} = require('../controllers');
const {isUserValid} = require('../validation')
const {authService: {login}} = require(`../services`)


router.route('/').post((req, res, next) => {
        console.log(`VALID_USER_DATA`)////////////////////
        if(!isUserValid(req.body)){
            return res
                .status(400)
                .json({ message: 'not valid user' })
        }
        next()
})

router.route('/').post(async (req, res, next) => {
        console.log(`check_auth_token`)////////////////////

        const authToken = await login(req.body);
        if(authToken){
            return res
                .status(200)
                .json({authToken : authToken})
        }
        next()
})

router.route('/').post(createUser);


router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});


module.exports = router