const express = require('express');
const router = express.Router();
const {usersController: {createUser}} = require('../controllers');

router.route('/').post(createUser);

module.exports = router