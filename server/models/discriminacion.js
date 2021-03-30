'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Discriminacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Discriminacion.init({
    Situacion_documental:
    {
      type: DataTypes.STRING,
      allowNull: true,
    },
    situacion_residencial:
    {
      type: DataTypes.STRING,
      allowNull: true,
    },
    estudios:
    {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rasgos_fenotipicos:
    {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tipo:
    {
      type: DataTypes.STRING,
      allowNull: true,
    },
    conflicto:
    {
      type: DataTypes.STRING,
      allowNull: true,
    },
    denegacion_privada:
    {
      type: DataTypes.STRING,
      allowNull: true,
    },
    denegacion_publica:
    {
      type: DataTypes.STRING,
      allowNull: true,
    },
    racismo:
    {
      type: DataTypes.STRING,
      allowNull: true,
    },
    agente_discriminador:
    {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fecha:
    {
      type: DataTypes.DATE,
      allowNull: true,
    },
    relato_hechos:
    {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    municipio:
    {
      type: DataTypes.STRING,
      allowNull: true,
    },
    identificacion:
    {
      type: DataTypes.STRING,
      allowNull: true,
    },
    testigos:
    {
      type: DataTypes.STRING,
      allowNull: true,
    },
    otros:
    {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    estrategia:
    {
      type: DataTypes.STRING,
      allowNull: true,
    },
    asumir:
    {
      type: DataTypes.STRING,
      allowNull: true,
    },
    derivar:
    {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  },{
      freezeTableName: true,
      sequelize,
      modelName: 'Discriminacion',
    });
return Discriminacion;
};