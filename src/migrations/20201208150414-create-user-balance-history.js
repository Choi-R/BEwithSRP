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
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('User_Balance_Histories');
  }
};