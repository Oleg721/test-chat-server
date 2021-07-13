const { Sequelize, Model, DataTypes } = require("sequelize");
require('dotenv').config();



const sequelizeConnect = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME,process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logger: console.log

});


module.exports = sequelizeConnect