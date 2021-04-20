'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProyectoExtranjeria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ProyectoExtranjeria.init({
    proyecto: DataTypes.STRING
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'ProyectoExtranjeria',
  });
  return ProyectoExtranjeria;
};