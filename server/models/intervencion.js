'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Intervencion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Intervencion.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.TEXT
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'Intervencion',
  });
  return Intervencion;
};