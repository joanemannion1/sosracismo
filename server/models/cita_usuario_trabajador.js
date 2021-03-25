'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cita_Usuario_Trabajador extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Cita_Usuario_Trabajador.init({
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'Cita_Usuario_Trabajador',
  });
  return Cita_Usuario_Trabajador;
};