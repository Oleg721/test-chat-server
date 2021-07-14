'use strict';

const {hashSync} = require(`bcrypt`);

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const password = `qwerty12345`
    const passwordHash = await hashSync(password,7);

    await queryInterface.bulkInsert('Users', [{
      login: 'JohnDoe',
      passwordHash: passwordHash,
      state: `ACTIVE`,
      role: `ADMIN`,
      color: `RED`,
      createdAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Users', null, {});

  }
};