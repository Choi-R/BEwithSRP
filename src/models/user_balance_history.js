'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Balance_History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User_Balance_History.belongsTo(models.User_Balance, {
        foreignKey: 'userBalanceId'
      })
    }
  };
  User_Balance_History.init({
    userBalanceId: DataTypes.INTEGER,
    balanceBefore: DataTypes.INTEGER,
    balanceAfter: DataTypes.INTEGER,
    activity: DataTypes.STRING,
    type: DataTypes.ENUM('debit', 'credit'),
    ip: DataTypes.STRING,
    location: DataTypes.STRING,
    userAgent: DataTypes.STRING,
    author: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User_Balance_History',
  });
  return User_Balance_History;
};