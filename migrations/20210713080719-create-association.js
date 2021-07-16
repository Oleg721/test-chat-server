'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'Messages', // name of source model
        'UserId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'Messages',
        'UserId'
    )
  }
};