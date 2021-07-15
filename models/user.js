'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      this.hasMany(models.Message)
    }
  };
  User.init({
    login : {
      type : DataTypes.STRING,
      allowNull : false,
      unique : true,
      validate: {
        min: 3,
        is: /\w/
      }
    },
    passwordHash: {
      type : DataTypes.STRING,
      allowNull : false,
    },
    state: {
      type : DataTypes.ENUM(`ACTIVE`, `MUTED`, `BANNED`),
      defaultValue : `ACTIVE`
    },
    role:{
      type: DataTypes.ENUM(`ADMIN`, `USER`),
      defaultValue: `USER`
    },
    color: {
      type : DataTypes.ENUM(`RED`, `ORANGE`, `YELLOW`, `GREEN`, `BLUE`, 'INDIGO', `VIOLET`),
      set() {
        const array = [`RED`, `ORANGE`, `YELLOW`, `GREEN`, `BLUE`, 'INDIGO', `VIOLET`];
         const color = array[Math.floor(Math.random() * array.length)];
        this.setDataValue('color', color);
      }
    }
  }, {
    sequelize,
    updatedAt: false,
    modelName: 'User',
  });
  return User;
};