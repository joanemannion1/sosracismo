const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const database = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.databaseConf = database;
// function to drop existing tables and re-sync database
// db.dropRestApiTable = () => {
//   db.databaseConf.sync({ force: true }).then(() => {
//     console.log("restTutorial table just dropped and db re-synced.");
//   });
// };
db.trabajadores = require("./trabajador")(database, Sequelize);
db.sedes = require("./sede")(database, Sequelize);
db.usuarios = require("./usuario")(database, Sequelize);
db.citas = require("./cita")(database, Sequelize);
db.usuario_cita_trabajador = require("./cita_usuario_trabajador")(database, Sequelize);

db.trabajadores.belongsTo(db.sedes, {foreignKey: 'sedeId', as: 'id_sede'})
db.usuarios.belongsTo(db.sedes, {foreignKey: 'sedeId', as: 'id_sede'})
db.usuarios.belongsTo(db.trabajadores, {foreignKey: 'trabajadorId', as: 'id_trabajador'})

db.usuario_cita_trabajador.belongsTo(db.citas, {foreignKey: 'id', as: 'citaId'})
db.usuario_cita_trabajador.belongsTo(db.trabajadores, {foreignKey: 'trabajadorId'})
db.usuario_cita_trabajador.belongsTo(db.usuarios, {foreignKey: 'n_documentacion', as: 'usuarioID'})
db.ROLES = ["trabajador", "admin"];

module.exports = db;

