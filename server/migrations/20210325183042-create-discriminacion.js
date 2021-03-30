'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Discriminacions', {
      Situacion_documental: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      situacion_residencial: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      estudios: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      rasgos_fenotipicos: {
        type: Sequelize.TEXT,
        allowNull:true,
      },
      tipo: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      conflicto: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      denegacion_privada: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      denegacion_publica: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      racismo: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      agente_discriminador: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      fecha: {
        type: Sequelize.DATE,
        allowNull:true,
      },
      relato_hechos: {
        type: Sequelize.TEXT,
        allowNull:true,
      },
      municipio: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      identificacion: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      testigos: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      otros: {
        type: Sequelize.TEXT,
        allowNull:true,
      },
      estrategia: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      asumir: {
        type: Sequelize.STRING,
        allowNull:true,
      },
      derivar: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('Discriminacions');
  }
};