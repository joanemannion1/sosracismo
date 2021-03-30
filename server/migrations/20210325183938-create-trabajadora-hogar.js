'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TrabajadoraHogars', {
      motivo: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      n_casas: {
        type: Sequelize.INTEGER,
        allowNull:true,
      },
      regularizada: {
        type: Sequelize.BOOLEAN,
        allowNull:true,
      },
      fecha_inicio: {
        type: Sequelize.DATE,
        allowNull:true,
      },
      fecha_final: {
        type: Sequelize.DATE,
        allowNull:true,
      },
      fecha_despido: {
        type: Sequelize.DATE,
        allowNull:true,
      },
      forma_empleo: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      contratador: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      horario_base: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      solo_fines_semana: {
        type: Sequelize.BOOLEAN,
        allowNull:true,
      },
      horas_totales: {
        type: Sequelize.INTEGER,
        allowNull:true,
      },
      libra_festivos: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      no_libra_pero_cobra: {
        type: Sequelize.BOOLEAN,
        allowNull:true,
      },
      salario_festivos: {
        type: Sequelize.FLOAT,
        allowNull:true,
      },
      salario: {
        type: Sequelize.FLOAT,
        allowNull:true,
      },
      pagas: {
        type: Sequelize.FLOAT,
        allowNull:true,
      },
      forma_pago: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      contrato: {
        type: Sequelize.BOOLEAN,
        allowNull:true,
      },
      nomina: {
        type: Sequelize.BOOLEAN,
        allowNull:true,
      },
      seguridad_social: {
        type: Sequelize.BOOLEAN,
        allowNull:true,
      },
      vacaciones: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      tipo_trabajo: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      mayores: {
        type: Sequelize.INTEGER,
        allowNull:true,
      },
      genero_mayores: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      enfermos: {
        type: Sequelize.INTEGER,
        allowNull:true,
      },
      genero_enfermos: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      viven_solos: {
        type: Sequelize.BOOLEAN,
        allowNull:true,
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TrabajadoraHogars');
  }
};