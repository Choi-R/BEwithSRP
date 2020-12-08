'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bank_Balance_History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Bank_Balance_History.init({
    bankBalanceId: DataTypes.INTEGER,
    balanceBefore: DataTypes.INTEGER,
    balanceAfter: DataTypes.INTEGER,
    activity: DataTypes.STRING,
    type: DataTypes.STRING, // NANTI INI ENUM
    ip: DataTypes.STRING,
    location: DataTypes.STRING,
    userAgent: DataTypes.STRING,
    author: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Bank_Balance_History',
  });
  return Bank_Balance_History;
};