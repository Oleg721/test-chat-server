'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {

    static associate(models) {
      this.belongsTo(models.User)
    }
  };
  Message.init({
    text: {
     type: DataTypes.STRING,
      validate: {
        max: 200
      }
    }
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};