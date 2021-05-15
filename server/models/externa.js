'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Externa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Externa.init({
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'Externa',
  });
  Externa.removeAttribute('id');
  return Externa;
};