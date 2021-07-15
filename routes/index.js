const express = require('express');
const router = express.Router();
const usersRoutes = require('./userRouters');


router.use('/sign-in', usersRoutes)


module.exports = router;