'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Interna extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Interna.init({
    permiso_salida: DataTypes.TEXT,
    descanso_semanal: DataTypes.TEXT
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'Interna',
  });
  return Interna;
};