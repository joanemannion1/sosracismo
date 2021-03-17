'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Usuario.init({
    n_documentacion: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    tipo_documentacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nombre:  {
      type: DataTypes.STRING
    },
    apellido1: {
      type: DataTypes.STRING
    },
    apellido2: {
      type: DataTypes.STRING
    },
    genero: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    telefono: {
      type: DataTypes.INTEGER
    },
    direccion: {
      type: DataTypes.STRING
    },
    localidad: {
      type: DataTypes.STRING
    },
    cp: {
      type: DataTypes.INTEGER
    },
    provincia: {
      type: DataTypes.STRING
    },
    pais_residencia: {
      type: DataTypes.STRING
    },
    nacionalidad: {
      type: DataTypes.STRING
    },
    pais_origen: {
      type: DataTypes.STRING
    }
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};