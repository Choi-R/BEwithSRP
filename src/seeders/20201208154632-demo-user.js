'use strict';
const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      id: 0,
      username: 'test',
      email: 'test@mail.com',
      password: bcrypt.hashSync('password', 10),
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW')
    }, {
      id: -1,
      username: 'test2',
      email: 'test2@mail.com',
      password: bcrypt.hashSync('password', 10),
      createdAt: Sequelize.fn('NOW'),
      updatedAt: Sequelize.fn('NOW')
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
