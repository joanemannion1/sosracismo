'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Usuario', {
      n_documentacion: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      tipo_documentacion: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nombre: {
        type: Sequelize.STRING
      },
      apellido1: {
        type: Sequelize.STRING
      },
      apellido2: {
        type: Sequelize.STRING
      },
      genero: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      telefono: {
        type:Sequelize.INTEGER
      },
      direccion: {
        type: Sequelize.STRING
      },
      localidad: {
        type: Sequelize.STRING
      },
      cp: {
        type: Sequelize.INTEGER
      },
      provincia: {
        type: Sequelize.STRING
      },
      pais_residencia: {
        type: Sequelize.STRING
      },
      pais_origen: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Usuarios');
  }
};