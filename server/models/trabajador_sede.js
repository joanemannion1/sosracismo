'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trabajador_sede extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Trabajador_sede.init({
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'Trabajador_sede',
  });
  Trabajador_sede.removeAttribute('id');
  return Trabajador_sede;
};