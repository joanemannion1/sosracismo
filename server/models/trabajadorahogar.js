'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TrabajadoraHogar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  TrabajadoraHogar.init({
    motivo: DataTypes.STRING,
    n_casas: DataTypes.INTEGER,
    regularizada: DataTypes.BOOLEAN,
    fecha_inicio: DataTypes.DATE,
    fecha_final: DataTypes.DATE,
    fecha_despido: DataTypes.DATE,
    forma_empleo: DataTypes.STRING,
    contratador: DataTypes.STRING,
    horario_base: DataTypes.STRING,
    solo_fines_semana: DataTypes.BOOLEAN,
    horas_totales: DataTypes.INTEGER,
    libra_festivos: DataTypes.STRING,
    no_libra_pero_cobra: DataTypes.BOOLEAN,
    salario_festivos: DataTypes.FLOAT,
    salario: DataTypes.FLOAT,
    pagas: DataTypes.FLOAT,
    forma_pago: DataTypes.STRING,
    contrato: DataTypes.BOOLEAN,
    nomina: DataTypes.BOOLEAN,
    seguridad_social: DataTypes.BOOLEAN,
    vacaciones: DataTypes.STRING,
    tipo_trabajo: DataTypes.STRING,
    mayores: DataTypes.INTEGER,
    genero_mayores: DataTypes.STRING,
    enfermos: DataTypes.INTEGER,
    genero_enfermos: DataTypes.STRING,
    viven_solos: DataTypes.BOOLEAN
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'TrabajadoraHogar',
  });
  return TrabajadoraHogar;
};