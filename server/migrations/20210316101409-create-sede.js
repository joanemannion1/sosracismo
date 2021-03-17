'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sede', {
      sedeId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      localidad: {
        type: Sequelize.STRING,
        allowNull: true
      }
      // createdAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE
      // },
      // updatedAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE
      // }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Sede');
  }
};