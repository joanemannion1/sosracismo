'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sede extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sede.init({
    sedeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true 
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    localidad: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'Sede'
  });
  return Sede;
};