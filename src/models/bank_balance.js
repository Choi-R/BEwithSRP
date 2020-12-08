'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bank_Balance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Bank_Balance.init({
    balance: DataTypes.INTEGER,
    balance_achieve: DataTypes.INTEGER,
    code: DataTypes.STRING,
    enable: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Bank_Balance',
  });
  return Bank_Balance;
};