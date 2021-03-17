'use strict';
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Trabajador extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Trabajador.init({
    nombre:{
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    contraseña: {
      type: DataTypes.STRING,
      allowNull: false
    },
    admin: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'Trabajador'
  });

  return Trabajador;
  
};