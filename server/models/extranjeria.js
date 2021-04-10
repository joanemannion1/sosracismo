'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Extranjeria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Extranjeria.init({
    proyectos: DataTypes.STRING
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'Extranjeria',
  });
  return Extranjeria;
};