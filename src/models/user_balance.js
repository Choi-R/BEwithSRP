'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Balance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User_Balance.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      User_Balance.hasMany(models.User_Balance_History, {
        foreignKey: 'userBalanceId'
      })
    }
  };
  User_Balance.init({
    userId: DataTypes.INTEGER,
    balance: DataTypes.INTEGER,
    balanceAchieve: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User_Balance',
  });
  return User_Balance;
};