'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bank_Balance_Histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bankBalanceId: {
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
        type: Sequelize.ENUM('debit', 'credit'),
      },
      ip: {
        type: Sequelize.STRING,
        defaultValue: "<YOUR IP>"
      },
      location: {
        type: Sequelize.STRING,
        defaultValue: "<YOUR LOCATION>"
      },
      userAgent: {
        type: Sequelize.STRING,
        defaultValue: "<YOUR USER AGENT>"
      },
      author: {
        type: Sequelize.STRING,
        defaultValue: "<YOUR AUTHOR>"
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
    await queryInterface.dropTable('Bank_Balance_Histories');
  }
};