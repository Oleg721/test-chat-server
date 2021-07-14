'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      login : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true,
        validate: {
          min: 3,
          is: /\w/
        }
      },
      passwordHash: {
        type : Sequelize.STRING,
        allowNull : false,
      },
      state: {
        type : Sequelize.ENUM(`ACTIVE`, `MUTED`, `BANED`),
        defaultValue : `ACTIVE`
      },
      role:{
        type: Sequelize.ENUM(`ADMIN`, `USER`),
        defaultValue: `USER`
      },
      color: {
        type : Sequelize.ENUM(`RED`, `ORANGE`, `YELLOW`),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
      // ,
      // updatedAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE
      // }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};