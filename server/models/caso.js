'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Caso extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Caso.init({
    finalizado: DataTypes.BOOLEAN,
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'Caso',
  });
  return Caso;
};