const express = require('express');
const router = express.Router();
const {usersController: {createUser}} = require('../controllers');
const {authService: {login}} = require(`../services`)


router.route('/').post(createUser);


module.exports = router