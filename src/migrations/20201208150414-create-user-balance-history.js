'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User_Balance_Histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userBalanceId: {
        type: Sequelize.INTEGER
      },
      balanceBefore: {
        type: Sequelize.INTEGER
      },
      balanceAfter: {
        type: Sequelize.INTEGER
      },
      activity: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.ENUM
      },
      ip: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      userAgent: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('User_Balance_Histories');
  }
};